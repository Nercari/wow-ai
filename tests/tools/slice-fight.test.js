"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const TOOL = path.resolve(__dirname, "../../tools/slice-fight.js");
const ts = (n) => `1/2/2026 03:04:${String(n).padStart(2, "0")}.000`;
function logLine(n, event, src = "Other-Realm", dst = "Other-Realm") {
  return `${ts(n)}  ${event},Creature-0-1,${JSON.stringify(src)},0x511,Player-1,${JSON.stringify(dst)},0x511`;
}
async function fixture(t, lines) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "slice-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  await fs.writeFile(
    path.join(dir, "WoWCombatLog-010226_030400.txt"),
    ["COMBAT_LOG_VERSION,12,0", ...lines].join("\n") + "\n",
  );
  return dir;
}
test("filters player events and structural events within padding, and writes death slice", async (t) => {
  const rows = [
    logLine(0, "SPELL_DAMAGE", "Mob", "Hero-Realm"),
    logLine(1, "SPELL_HEAL", "Healer", "Hero-Realm"),
    logLine(2, "SPELL_DAMAGE"),
    logLine(3, "UNIT_DIED", "Mob", "Hero-Realm"),
    logLine(4, "ZONE_CHANGE"),
    logLine(10, "SPELL_DAMAGE", "Mob", "Hero-Realm"),
  ];
  const dir = await fixture(t, rows),
    out = path.join(dir, "out.txt");
  const r = spawnSync(
    process.execPath,
    [
      TOOL,
      "--logs",
      dir,
      "--start",
      "2026-01-02T03:04:01",
      "--end",
      "2026-01-02T03:04:03",
      "--player",
      "Hero-Realm",
      "--out",
      out,
      "--pad",
      "1",
      "--death",
      "2026-01-02T03:04:03",
    ],
    { encoding: "utf8" },
  );
  assert.equal(r.status, 0, r.stderr);
  const text = await fs.readFile(out, "utf8");
  assert.match(text, /SPELL_DAMAGE,Creature/);
  assert.match(text, /UNIT_DIED/);
  assert.match(text, /ZONE_CHANGE/);
  assert.doesNotMatch(text, /SPELL_DAMAGE,Creature-0-1,"Other-Realm"/);
  const death = await fs.readFile(out + ".death.txt", "utf8");
  assert.match(death, /SPELL_DAMAGE/);
  assert.match(death, /SPELL_HEAL/);
});
test("keeps the timestamped version header from the file start and reads logs without a year", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "slice-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const year = new Date().getFullYear();
  const header = "1/2 02:50:00.000  COMBAT_LOG_VERSION,22,ADVANCED_LOG_ENABLED,0,BUILD_VERSION,1.60.1,PROJECT_ID,2";
  const hit = `1/2 03:04:01.1234  SPELL_DAMAGE,Creature-0-1,"Mob",0xa48,Player-1,"Hero-Realm",0x511`;
  await fs.writeFile(path.join(dir, "WoWCombatLog-010226_025000.txt"), [header, hit].join("\n") + "\n");
  const out = path.join(dir, "out.txt");
  const r = spawnSync(process.execPath, [TOOL, "--logs", dir, "--start", `${year}-01-02T03:04:00`, "--end", `${year}-01-02T03:04:02`,
    "--player", "Hero-Realm", "--out", out], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  const lines = (await fs.readFile(out, "utf8")).trim().split("\n");
  assert.deepEqual(lines.slice(1), [header, hit]);
});
test("no overlapping logs returns documented code", async (t) => {
  const d = await fixture(t, [logLine(0, "SPELL_DAMAGE")]);
  const out = path.join(d, "out");
  const r = spawnSync(
    process.execPath,
    [
      TOOL,
      "--logs",
      d,
      "--start",
      "2026-01-02T05:00:00",
      "--end",
      "2026-01-02T05:01:00",
      "--player",
      "Hero-Realm",
      "--out",
      out,
    ],
    { encoding: "utf8" },
  );
  assert.equal(r.status, 3);
  assert.match(
    r.stderr,
    /Combat logging was off: type \/combatlog before the fight/,
  );
});
test("caps output by dropping oldest ordinary lines and records truncation", async (t) => {
  const rows = Array.from({ length: 22000 }, (_, i) =>
    logLine(1, `SPELL_DAMAGE_${i}`, "Hero-Realm", "Boss"),
  );
  const d = await fixture(t, rows),
    out = path.join(d, "cap.txt");
  const r = spawnSync(
    process.execPath,
    [
      TOOL,
      "--logs",
      d,
      "--start",
      "2026-01-02T03:04:00",
      "--end",
      "2026-01-02T03:04:02",
      "--player",
      "Hero-Realm",
      "--out",
      out,
    ],
    { encoding: "utf8" },
  );
  assert.equal(r.status, 0);
  const b = await fs.stat(out);
  assert.ok(b.size <= 2 * 1024 * 1024);
  assert.match(await fs.readFile(out, "utf8"), /# truncated \d+ lines/);
});
test("indexes a generated 200k-line log and returns matching slice", async (t) => {
  const rows = Array.from({ length: 200000 }, (_, i) =>
    logLine(
      30,
      "SPELL_DAMAGE",
      i === 150000 ? "Hero-Realm" : "Other-Realm",
      "Boss",
    ),
  );
  const d = await fixture(t, rows),
    out = path.join(d, "many.txt");
  const r = spawnSync(
    process.execPath,
    [
      TOOL,
      "--logs",
      d,
      "--start",
      "2026-01-02T03:04:30",
      "--end",
      "2026-01-02T03:04:31",
      "--player",
      "Hero-Realm",
      "--out",
      out,
    ],
    { encoding: "utf8" },
  );
  assert.equal(r.status, 0);
  assert.match(await fs.readFile(out, "utf8"), /Hero-Realm/);
});
test(
  "100 MB slicing stays under five seconds outside CI_FAST",
  { skip: process.env.CI_FAST === "1" },
  async (t) => {
    const d = await fs.mkdtemp(path.join(os.tmpdir(), "slice100-"));
    t.after(() => fs.rm(d, { recursive: true, force: true }));
    const p = path.join(d, "WoWCombatLog-010226_030400.txt"),
      line = `${logLine(1, "SPELL_DAMAGE", "Hero-Realm", "Boss")}\n`;
    const h = await fs.open(p, "w");
    const block = line.repeat(
      Math.floor((1024 * 1024) / Buffer.byteLength(line)),
    );
    for (let i = 0; i < 100; i++) await h.write(block);
    await h.close();
    const out = path.join(d, "out");
    const before = Date.now();
    const r = spawnSync(
      process.execPath,
      [
        TOOL,
        "--logs",
        d,
        "--start",
        "2026-01-02T03:04:00",
        "--end",
        "2026-01-02T03:04:02",
        "--player",
        "Hero-Realm",
        "--out",
        out,
      ],
      { encoding: "utf8" },
    );
    const elapsed = Date.now() - before;
    assert.equal(r.status, 0, r.stderr);
    assert.ok(elapsed < 5000, `${elapsed}ms`);
  },
);
test("death file starts with a recap of who hit the player, from the dry-run log", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "slice-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const out = path.join(dir, "out.log");
  const r = spawnSync(
    process.execPath,
    [
      TOOL,
      "--logs",
      path.resolve(__dirname, "../fixtures/dryrun/Logs"),
      "--start",
      "2026-09-25T20:00:20",
      "--end",
      "2026-09-25T20:00:43",
      "--player",
      "Brakka-Testrealm",
      "--out",
      out,
      "--death",
      "2026-09-25T20:00:42.600",
    ],
    { encoding: "utf8" },
  );
  assert.equal(r.status, 0, r.stderr);
  const lines = (await fs.readFile(out + ".death.txt", "utf8")).split("\n");
  assert.equal(lines[1], "# recap hits=5,damage=320,heals=0,first-hit=12.2s-before");
  assert.equal(lines[2], '# killing-blow at=20:00:42.500,source="Defias Pillager",spell="Fireball",amount=80');
  assert.equal(lines[3], '# taken source="Defias Pillager",spell="Fireball",hits=4,damage=308,share=96%');
  assert.equal(lines[4], '# taken source="Defias Pillager",spell="Melee",hits=1,damage=12,share=4%');
  assert.match(lines[5], /^9\/25\/2026 /);
});
test("recap reads amounts after the advanced block, environment and heals, and flags unreadable amounts", () => {
  const { recap } = require(TOOL);
  const base = (event, src, dst) => `${event},Creature-0-1,"${src}",0xa48,0x0,Player-1,"${dst}",0x511,0x0`;
  const adv = Array.from({ length: 19 }, (_, i) => String(i + 1000)).join(",");
  const lines = [
    `1/2/2026 03:04:01.000  ${base("SPELL_DAMAGE", "Mob", "Hero-Realm")},133,"Fireball",0x4,${adv},40,0,4,0,0,0,nil,nil,nil`,
    `1/2/2026 03:04:02.000  ${base("SPELL_HEAL", "Priest", "Hero-Realm")},2050,"Lesser Heal",0x2,${adv},25,0,0,nil`,
    `1/2/2026 03:04:03.000  ${base("SWING_DAMAGE", "Hero-Realm", "Mob")},${adv},99,0,1,0,0,0,nil,nil,nil`,
    `1/2/2026 03:04:04.000  ENVIRONMENTAL_DAMAGE,0000000000000000,nil,0x80000000,0x80000000,Player-1,"Hero-Realm",0x511,0x0,${adv},Falling,60,0,1,0,0,0,nil,nil,nil`,
    `1/2/2026 03:04:05.000  ${base("SWING_DAMAGE", "Mob", "Hero-Realm")},${adv},oops`,
  ];
  const out = recap(lines, "Hero-Realm", true, Date.UTC(2026, 0, 2, 3, 4, 6) + new Date(2026, 0, 2).getTimezoneOffset() * 60000);
  assert.equal(out[0], "# recap hits=3,damage=100,heals=25,first-hit=5.0s-before");
  assert.equal(out[1], '# killing-blow at=03:04:05.000,source="Mob",spell="Melee",amount=?');
  assert.deepEqual(out.slice(2), [
    '# taken source="Environment",spell="Falling",hits=1,damage=60,share=60%',
    '# taken source="Mob",spell="Fireball",hits=1,damage=40,share=40%',
    '# taken source="Mob",spell="Melee",hits=1,damage=0,share=0%,unread=1',
  ]);
  const typeFirst = `1/2/2026 03:04:04.000  ENVIRONMENTAL_DAMAGE,0000000000000000,nil,0x80000000,0x80000000,Player-1,"Hero-Realm",0x511,0x0,Lava,${adv},70,0,4,0,0,0,nil,nil,nil`;
  assert.equal(recap([typeFirst], "Hero-Realm", true, NaN)[1], '# killing-blow at=03:04:04.000,source="Environment",spell="Lava",amount=70');
  assert.deepEqual(recap([], "Hero-Realm", false, NaN), ["# recap no damage to the player in the window"]);
});
