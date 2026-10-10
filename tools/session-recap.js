#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const { rowsOf } = require("./practice-compare");

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);
const today = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
};
// Everything is counted from the notebook's scorecard rows of one date; nothing is estimated.
function recap(notebook, date) {
  const rows = rowsOf(notebook).filter((r) => r.date === date);
  if (!rows.length) return { ok: false, reason: `no scorecard rows dated ${date}` };
  const dummy = rows.filter((r) => r.kind === "dummy").length;
  const deaths = rows.map((r) => num(r.deaths)).filter((x) => x !== null);
  const secs = rows.map((r) => num(r.durationS)).filter((x) => x !== null);
  const tops = {};
  for (const r of rows) if (typeof r.top === "string" && r.top.trim()) tops[r.top.trim()] = (tops[r.top.trim()] || 0) + 1;
  const [top, topCount] = Object.entries(tops).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))[0] || [null, 0];
  return {
    ok: true,
    date,
    fights: rows.length,
    dummy,
    deaths: deaths.length ? deaths.reduce((a, b) => a + b, 0) : null,
    deathsRows: deaths.length,
    seconds: secs.length ? secs.reduce((a, b) => a + b, 0) : null,
    secondsRows: secs.length,
    top,
    topCount,
  };
}
function format(r) {
  if (!r.ok) return `recap: ${r.reason}`;
  const mins = r.seconds === null ? null : Math.round(r.seconds / 60);
  return [
    `recap: ${r.date}`,
    `fights: ${r.fights} reviewed (${r.dummy} on a target dummy)`,
    r.deaths === null ? "deaths: not in the rows" : `deaths: ${r.deaths}${r.deathsRows < r.fights ? ` (${r.deathsRows} of ${r.fights} rows say)` : ""}`,
    mins === null ? "time: not in the rows" : `time: ${mins} min in fights (${r.secondsRows} of ${r.fights} rows say)`,
    r.top ? `repeat: "${r.top}"${r.topCount > 1 ? ` (${r.topCount} times)` : " (once)"}` : "repeat: none noted",
  ].join("\n");
}
if (require.main === module) {
  const arg = (name) => {
    const i = process.argv.indexOf(name);
    return i >= 0 ? process.argv[i + 1] : undefined;
  };
  if (!arg("--notebook")) {
    console.error("usage: node tools/session-recap.js --notebook <characters/Realm-Name.md> [--date YYYY-MM-DD] [--json]");
    process.exit(2);
  }
  let text;
  try {
    text = fs.readFileSync(arg("--notebook"), "utf8");
  } catch (e) {
    console.error(`cannot read notebook: ${e.message}`);
    process.exit(2);
  }
  const r = recap(text, arg("--date") || today());
  console.log(process.argv.includes("--json") ? JSON.stringify(r) : format(r));
  process.exitCode = r.ok ? 0 : 1;
}
module.exports = { recap, format };
