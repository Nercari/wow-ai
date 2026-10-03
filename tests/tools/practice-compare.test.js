"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { spawnSync } = require("node:child_process");
const { compare, format } = require("../../tools/practice-compare");
const TOOL = path.resolve(__dirname, "../../tools/practice-compare.js");
const book = (...rows) => ["# Hero", "## Scorecard", "```json", ...rows.map((r) => JSON.stringify(r)), "```", "", "## Drills"].join("\n");
const d = (date, extra) => ({ date, fight: "Target Dummy", kind: "dummy", ...extra });

test("compares the latest two dummy rows and ignores real fights", () => {
  const nb = book(
    d("2026-10-01", { activeTimePct: 50, damage: 1000, durationS: 100 }),
    { date: "2026-10-02", fight: "Hogger", activeTimePct: 99, damage: 9999, durationS: 10 },
    d("2026-10-02", { activeTimePct: 70, damage: 1500, durationS: 100 }),
    d("2026-10-03", { activeTimePct: 80, damage: 2400, durationS: 120 }),
  );
  const r = compare(nb);
  assert.equal(r.ok, true);
  assert.deepEqual(r.activeTimePct, { before: 70, after: 80, change: 10 });
  assert.deepEqual(r.damage, { before: 1500, after: 2400, change: 900 });
  assert.deepEqual(r.dps, { before: 15, after: 20, change: 5 });
  assert.equal(format(r), [
    "practice: 2026-10-02 Target Dummy -> 2026-10-03 Target Dummy",
    "activeTimePct: 70% -> 80% (+10%)",
    "damage: 1500 -> 2400 (+900)",
    "dps: 15 -> 20 (+5)",
  ].join("\n"));
});
test("fewer than two dummy rows, or a missing field, is reported and never guessed", () => {
  assert.deepEqual(compare(book(d("2026-10-01", {}))), { ok: false, reason: "need 2 dummy rows, found 1" });
  assert.deepEqual(compare("no scorecard here"), { ok: false, reason: "need 2 dummy rows, found 0" });
  const r = compare(book(d("2026-10-01", { activeTimePct: 50 }), d("2026-10-02", { activeTimePct: 60, damage: 10, durationS: 5 })));
  assert.equal(r.damage.change, null);
  assert.match(format(r), /damage: not in both rows/);
});
test("CLI prints the comparison and exits 1 when there is nothing to compare", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "practice-"));
  const f = path.join(dir, "n.md");
  fs.writeFileSync(f, book(d("2026-10-01", { damage: 10, durationS: 10 }), d("2026-10-02", { damage: 30, durationS: 10 })));
  const ok = spawnSync(process.execPath, [TOOL, "--notebook", f], { encoding: "utf8" });
  assert.equal(ok.status, 0);
  assert.match(ok.stdout, /dps: 1 -> 3 \(\+2\)/);
  fs.writeFileSync(f, book(d("2026-10-01", {})));
  assert.equal(spawnSync(process.execPath, [TOOL, "--notebook", f], { encoding: "utf8" }).status, 1);
  fs.rmSync(dir, { recursive: true });
});
