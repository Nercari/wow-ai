"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { spawnSync } = require("node:child_process");
const { recap, format } = require("../../tools/session-recap");
const TOOL = path.resolve(__dirname, "../../tools/session-recap.js");
const book = (...rows) => ["# Hero", "## Scorecard", "```json", ...rows.map((r) => JSON.stringify(r)), "```", "", "## Drills"].join("\n");

test("counts only the rows of the date and prints five lines", () => {
  const nb = book(
    { date: "2026-10-02", fight: "Old", deaths: 5, top: "x" },
    { date: "2026-10-03", fight: "Hogger", deaths: 1, mistakes: 2, top: "late interrupt", durationS: 90 },
    { date: "2026-10-03", fight: "Wolf", deaths: 0, top: "late interrupt", durationS: 150 },
    { date: "2026-10-03", fight: "Target Dummy", kind: "dummy", top: "idle gaps" },
  );
  const r = recap(nb, "2026-10-03");
  assert.equal(r.fights, 3);
  assert.equal(r.dummy, 1);
  assert.equal(r.deaths, 1);
  assert.equal(r.seconds, 240);
  assert.equal(format(r), [
    "recap: 2026-10-03",
    "fights: 3 reviewed (1 on a target dummy)",
    "deaths: 1 (2 of 3 rows say)",
    "time: 4 min in fights (2 of 3 rows say)",
    'repeat: "late interrupt" (2 times)',
  ].join("\n"));
});

test("a field no row has reads 'not in the rows' and no rows exits 1", () => {
  const nb = book({ date: "2026-10-03", fight: "Hogger" });
  const lines = format(recap(nb, "2026-10-03")).split("\n");
  assert.equal(lines[2], "deaths: not in the rows");
  assert.equal(lines[3], "time: not in the rows");
  assert.equal(lines[4], "repeat: none noted");
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "recap-")), "n.md");
  fs.writeFileSync(file, nb);
  const out = spawnSync(process.execPath, [TOOL, "--notebook", file, "--date", "2026-01-01"], { encoding: "utf8" });
  assert.equal(out.status, 1);
  assert.match(out.stdout, /no scorecard rows dated 2026-01-01/);
});
