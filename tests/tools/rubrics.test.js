"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const MENTOR = path.resolve(__dirname, "../../mentor");
const read = (p) => fs.readFileSync(path.join(MENTOR, p), "utf8");
const rows = (text) => text.split("\n").filter((l) => /^\| [A-Z]\d+ \|/.test(l));

test("warlock rubric: every row quotes evidence and cites an existing knowledge section", () => {
  const text = read("rubrics/warlock.md");
  const table = rows(text);
  assert.deepEqual(table.map((r) => r.split("|")[1].trim()), ["W1", "W2", "W3", "W4"]);
  for (const r of table) {
    const cells = r.split("|").slice(1, -1).map((c) => c.trim());
    assert.equal(cells.length, 5, r);
    assert.match(cells[4], /`(?:classes-classic\.md|_generic\.md)`|`classes-classic\.md`/, r);
  }
  const classes = read("knowledge/classes-classic.md");
  assert.match(classes, /^## Warlock$/m);
  assert.match(text, /may differ in Forever/);
});
test("class rubrics are listed rows of the generic header shape and reference only existing files", () => {
  for (const f of fs.readdirSync(path.join(MENTOR, "rubrics"))) {
    const text = read(`rubrics/${f}`);
    assert.ok(rows(text).length > 0, f);
    for (const m of text.matchAll(/`((?:classes-classic|mechanics-classic|_generic)\.md)`/g)) {
      const dir = m[1] === "_generic.md" ? "rubrics" : "knowledge";
      assert.ok(fs.existsSync(path.join(MENTOR, dir, m[1])), m[1]);
    }
  }
});
