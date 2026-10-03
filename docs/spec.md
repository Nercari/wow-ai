# wow-ai maintenance spec

Goal: keep wow-ai working on the current Forever client and agent CLIs, safe, and getting better, one small verified PR at a time. The feature spec it was built from (F01–F25, S1–S5, AC1–AC34) is spec v2 in Atlas (`atlas-vault/01_Inbox/spec-wow-forever-ai-mentor-v2-2026-09-25.md`); `docs/forever-coverage-2026-09-25.md` maps each AC to its test, dry run or live check.

Baseline (2026-10-03, `forever` at cbebd5a): `npm test` 187/187 pass, codec round-trip PASS, safety CI green. Live column of the coverage doc: empty.

## Standing goals (checked every maintenance pass)

1. **Green.** `node tools/safety-ci.js` and `npm test` pass on Windows and Linux CI for `forever` and every PR. A red `forever` is fixed before anything else.
2. **Safe.** No feature plays for the player, reads memory, injects code, generates input or helps during combat. Safety CI rules only get stricter.
3. **Current agent CLIs.** Claude Code, Codex, Grok Build, agy and Hermes stream formats still parse. When a CLI release changes its stream, add the new sample to `tests/agents_test.js` and fix the parser.
4. **Current game and policy.** `tools/policy-watch.js` alerts on a Blizzard policy change; read the diff and say whether the tool is affected. A new Forever client build gets its TOC and API checks.
5. **Upstream.** Compare with `chelinho139/wow-ai` main; bring in useful upstream fixes by PR, keeping `forever` behaviour.
6. **Measured improvement.** Each improvement PR names one number (a test count, a gate passed, a failure fixed) before and after.

## Backlog (numbered; next free: 12)

1. **Live gates (WOW-02).** Pedro runs `probe/PROBE.md` on the installed Forever client; agents turn the results into the gate table and switch features to their fallback where a gate fails. Needs Pedro in game.
2. **Live column.** Fill the Live column of the coverage doc from Pedro's in-game checks, one short checklist per batch.
3. **F25 screenshot transport (WOW-17, AC30).** Build only if its WOW-02 gate passes; otherwise keep the text/`look` fallback.
4. **Facts cache wording.** A cached fact says "checked today" instead of its fetch date (dry run 2, AC20). Fix in `mentor/AGENTS.md` and re-run the dry run.
5. **Hotkeys.** Menu-only bindings ship today; an auto-bind variant needs a safety-CI exemption. Pedro's decision, then implement or drop.
6. **Publish (WOW-12).** Public fork and the upstream adapters PR were approved by Pedro on 2026-09-25 (GitHub only, no forum post). Publishing is external: prepare, then Pedro confirms before anything goes public.
7. **Death recap** (from Details! and Blizzard's death recap; see `docs/similar-addons-2026-10-03.md`). Recap lines at the top of `.death.txt` (done, this PR).
8. **Health before each hit.** Add the player's health before each hit and the overkill of the killing blow to the death recap, read from the advanced log block. Needs a real Forever log with advanced logging (item 1) to confirm the field layout.
9. **Death file shows only incoming lines.** `.death.txt` also lists hits the player dealt (the destination test matches the player as source). Small fix with a real-format test fixture.
10. **Warlock rubric** (from WoWAnalyzer's per-spec checklists). `mentor/rubrics/warlock.md` with uptime, cooldown and idle-time checks the mentor can prove from a log slice, every rule cited. Other classes later.
11. **Dummy practice compare** (from Localog). `cmd=practice`: review two target-dummy sessions and compare active time and damage from their scorecard rows.

Add new items at the end with the next number; mark done items `(done, PR #n)` instead of deleting them.
