"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const { check } = require("../../tools/check-citations");
const TOOL = path.resolve(__dirname, "../../tools/check-citations.js");

const FIXTURE_PATH = path.resolve(
  __dirname,
  "../fixtures/dryrun/Logs/WoWCombatLog-092526_195800.txt"
);
const fixtureLines = fsSync
  .readFileSync(FIXTURE_PATH, "utf8")
  .trim()
  .split(/\r?\n/);

const line10 = fixtureLines[9];
const line10Cut = line10.indexOf('"Defias Pillager"') + '"Defias Pillager"'.length;
const line10Short = line10.slice(0, line10Cut) + "…";
const line23 = fixtureLines[22];
const line28 = fixtureLines[27];
const line34 = fixtureLines[33];

const sliceContent = [
  "# slice player=Brakka-Testrealm start=2026-09-25T20:00:10 end=2026-09-25T20:00:43 files=1 lines=10",
  line10,
  line23,
  line28,
  line34,
].join("\n");

const goodReview = [
  "Fight: Defias Pillager (20:00:10–20:00:43), wipe",
  "1. Late Shield Bash interrupt — 20:00:11.900",
  `   Log: \`${line10Short}\``,
  "   Why: Shield Bash came late in the cast.",
  "   Next time: Interrupt immediately when cast bar starts.",
  "2. Unmitigated Fireball — 20:00:22.900",
  `   Log: \`${line23}\``,
  "   Why: Took 71 fire damage which drained your health pool.",
  "   Next time: Use Shield Block or line-of-sight the caster.",
  "Since last review: new",
  "Drill: practice interrupt reaction time",
].join("\n");

test("a good review in the Reply format with 2 mistakes quoting exact lines (one shortened with …) passes", () => {
  const res = check({ review: goodReview, slice: sliceContent });
  assert.equal(res.ok, true);
  assert.equal(res.citations, 2);
  assert.deepEqual(res.problems, []);
});

test("a line with a changed number (e.g. damage 71 -> 17) fails with invented or altered", () => {
  const alteredLine23 = line23.replace(",71,", ",17,");
  const badReview = goodReview.replace(line23, alteredLine23);
  const res = check({ review: badReview, slice: sliceContent });
  assert.equal(res.ok, false);
  assert.ok(
    res.problems.some((p) => p.startsWith("invented or altered log line:")),
    "should report invented or altered log line"
  );
});

test("a timestamp-only quote (no event name) fails", () => {
  const badReview = goodReview.replace(line23, "9/25/2026 20:00:22.900");
  const res = check({ review: badReview, slice: sliceContent });
  assert.equal(res.ok, false);
  assert.ok(
    res.problems.some(
      (p) => p.startsWith("invented or altered log line: 9/25/2026 20:00:22.900")
    ),
    "timestamp only should be flagged as invented or altered"
  );
});

test("4 numbered mistakes fails; a mistake without a quote fails", () => {
  const fourMistakesReview = [
    "Fight: Defias Pillager (20:00:10–20:00:43), wipe",
    "1. Mistake one — 20:00:11.900",
    `   Log: \`${line10Short}\``,
    "2. Mistake two — 20:00:22.900",
    `   Log: \`${line23}\``,
    "3. Mistake three — 20:00:30.400",
    `   Log: \`${line28}\``,
    "4. Mistake four — 20:00:34.200",
    `   Log: \`${line34}\``,
    "Since last review: new",
  ].join("\n");
  const resFour = check({ review: fourMistakesReview, slice: sliceContent });
  assert.equal(resFour.ok, false);
  assert.ok(
    resFour.problems.includes("more than 3 mistakes"),
    "should flag more than 3 mistakes"
  );

  const missingQuoteReview = [
    "Fight: Defias Pillager (20:00:10–20:00:43), wipe",
    "1. Mistake one — 20:00:11.900",
    `   Log: \`${line10Short}\``,
    "2. Mistake two — 20:00:22.900",
    "   Why: Missed interrupt without evidence.",
    "Since last review: new",
  ].join("\n");
  const resMissing = check({ review: missingQuoteReview, slice: sliceContent });
  assert.equal(resMissing.ok, false);
  assert.ok(
    resMissing.problems.includes("mistake 2 has no verified log line"),
    "should flag mistake without verified log line"
  );
});

test("a not enough data review with no quotes passes", () => {
  const review1 = [
    "Fight: Defias Pillager (20:00:10–20:00:43), wipe",
    "Not enough data to analyze combat events.",
  ].join("\n");
  const res1 = check({ review: review1, slice: sliceContent });
  assert.equal(res1.ok, true);
  assert.equal(res1.citations, 0);
  assert.deepEqual(res1.problems, []);

  const review2 = "Combat logging was off. Type /combatlog before the next fight.";
  const res2 = check({ review: review2, slice: sliceContent });
  assert.equal(res2.ok, true);
  assert.equal(res2.citations, 0);
  assert.deepEqual(res2.problems, []);
});

test("bare log lines (no backticks, optional Log: label) are citations too", () => {
  const bare = goodReview.replace(`\`${line10Short}\``, line10Short).replace(`Log: \`${line23}\``, line23);
  const res = check({ review: bare, slice: sliceContent });
  assert.equal(res.ok, true);
  assert.equal(res.citations, 2);
  const altered = check({ review: bare.replace(",71,", ",17,"), slice: sliceContent });
  assert.equal(altered.ok, false);
  assert.ok(altered.problems.some((p) => p.startsWith("invented or altered log line:")));
});

test("notebook: a valid scorecard row passes; {date:yesterday} fails; activeTimePct: 140 fails", () => {
  const nbValid = [
    "## Scorecard",
    "```json",
    '{"date":"2026-09-25","fight":"Defias Pillager","role":"dps","deaths":1,"mistakes":2,"activeTimePct":91}',
    "```",
  ].join("\n");
  const resValid = check({
    review: goodReview,
    slice: sliceContent,
    notebook: nbValid,
  });
  assert.equal(resValid.ok, true);
  assert.deepEqual(resValid.problems, []);

  const nbYesterday = [
    "## Scorecard",
    "```json",
    '{"date":"yesterday","fight":"Defias Pillager"}',
    "```",
  ].join("\n");
  const resYesterday = check({
    review: goodReview,
    slice: sliceContent,
    notebook: nbYesterday,
  });
  assert.equal(resYesterday.ok, false);
  assert.ok(
    resYesterday.problems.some(
      (p) => p.startsWith("scorecard line 1:") && p.includes("date")
    ),
    "yesterday date should be rejected"
  );

  const nbActive140 = [
    "## Scorecard",
    "```json",
    '{"date":"2026-09-25","fight":"Defias Pillager","activeTimePct":140}',
    "```",
  ].join("\n");
  const resActive = check({
    review: goodReview,
    slice: sliceContent,
    notebook: nbActive140,
  });
  assert.equal(resActive.ok, false);
  assert.ok(
    resActive.problems.some(
      (p) => p.startsWith("scorecard line 1:") && p.includes("activeTimePct")
    ),
    "activeTimePct > 100 should be rejected"
  );
});

test("CLI: spawn the tool with temp files; exit code 0 on the good review, 1 on the bad one", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "citations-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));

  const slicePath = path.join(dir, "slice.txt");
  const goodPath = path.join(dir, "good.md");
  const badPath = path.join(dir, "bad.md");

  const alteredLine23 = line23.replace(",71,", ",17,");
  const badReview = goodReview.replace(line23, alteredLine23);

  await fs.writeFile(slicePath, sliceContent, "utf8");
  await fs.writeFile(goodPath, goodReview, "utf8");
  await fs.writeFile(badPath, badReview, "utf8");

  const rGood = spawnSync(
    process.execPath,
    [TOOL, "--review", goodPath, "--slice", slicePath],
    { encoding: "utf8" }
  );
  assert.equal(rGood.status, 0, rGood.stderr);
  assert.match(rGood.stdout, /ok: 2 citations verified/);

  const rBad = spawnSync(
    process.execPath,
    [TOOL, "--review", badPath, "--slice", slicePath],
    { encoding: "utf8" }
  );
  assert.equal(rBad.status, 1);
  assert.match(rBad.stderr + rBad.stdout, /invented or altered log line:/);
});
