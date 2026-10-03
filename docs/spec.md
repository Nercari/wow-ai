# wow-ai maintenance spec

Goal: keep wow-ai working on the current Forever client and agent CLIs, safe, and getting better, one small verified PR at a time. The feature spec it was built from (F01–F25, S1–S5, AC1–AC34) is spec v2 in Atlas (`atlas-vault/01_Inbox/spec-wow-forever-ai-mentor-v2-2026-09-25.md`); `docs/forever-coverage-2026-09-25.md` maps each AC to its test, dry run or live check.

Baseline (2026-10-03, `forever` at cbebd5a): `npm test` 187/187 pass, codec round-trip PASS, safety CI green. Live column of the coverage doc: empty.

## Standing goals (checked every maintenance pass)

1. **Green.** `node tools/safety-ci.js` and `npm test` pass on Windows and Linux CI for `forever` and every PR. A red `forever` is fixed before anything else.
2. **Safe and Blizzard-compliant.** 100% compliant with Blizzard's ToS, EULA and UI add-on policy (permanent rule, Pedro, 2026-10-03; see `AGENTS.md` and `docs/COMPLIANCE.md`): anything that could breach them is rejected. No feature plays for the player, reads memory, injects code, generates input or helps during combat. Safety CI rules only get stricter.
3. **Current agent CLIs.** Claude Code, Codex, Grok Build, agy and Hermes stream formats still parse. When a CLI release changes its stream, add the new sample to `tests/agents_test.js` and fix the parser.
4. **Current game and policy.** `tools/policy-watch.js` alerts on a Blizzard policy change; read the diff and say whether the tool is affected. A new Forever client build gets its TOC and API checks.
5. **Upstream.** Compare with `chelinho139/wow-ai` main; bring in useful upstream fixes by PR, keeping `forever` behaviour.
6. **Measured improvement.** Each improvement PR names one number (a test count, a gate passed, a failure fixed) before and after.

## Backlog (numbered; next free: 27)

1. **Live gates (WOW-02).** Pedro runs `probe/PROBE.md` on the installed Forever client; agents turn the results into the gate table and switch features to their fallback where a gate fails. Needs Pedro in game.
2. **Live column.** Fill the Live column of the coverage doc from Pedro's in-game checks, one short checklist per batch.
3. **F25 screenshot transport (WOW-17, AC30).** Build only if its WOW-02 gate passes; otherwise keep the text/`look` fallback.
4. **Facts cache wording.** A cached fact says "checked today" instead of its fetch date (dry run 2, AC20). Fix in `mentor/AGENTS.md` and re-run the dry run.
5. **Hotkeys.** Menu-only bindings ship today; an auto-bind variant needs a safety-CI exemption. Pedro's decision, then implement or drop.
6. **Publish (WOW-12).** Public fork and the upstream adapters PR were approved by Pedro on 2026-09-25 (GitHub only, no forum post). Publishing is external: prepare, then Pedro confirms before anything goes public.
7. **Replies during combat** (done, PR #4). Video review 2026-10-03: two replies showed mid-fight (5:55, 6:45). Replies now wait for the fight to end.
8. **Mentor workspace by default** (done, PR #13). The bridge started in Documents, so the agent ran as a general coding assistant and read unrelated files (0:00, 2:25, 2:55, 6:45). Start in the mentor workspace by default and warn in the window when the folder is a broad one like Documents. Metric: unrelated files read, 3+ in the video, target 0.
9. **Permission text in game chat** (done, PR #11). A permission request prints the raw command in chat, seven lines of PowerShell (2:55, 5:55, 6:20). Show one short line instead. Metric: chat lines per request 7 → 1.
10. **"Blocked from an action only available to the Blizzard UI" popup** (8:00), right after pasting the agent's `/run` settings line. Cause not confirmed. Needs Pedro in game: paste the first `/run` line again out of combat and report whether the popup returns. Related to item 1.
11. **No untested `/run` scripts from the mentor** (done, PR #15). The mentor handed out untested scripts, including key rebinding (4:55, 8:15). It should point to the game menus (Options > Keybindings) instead. Fix in the mentor prompt. Related to item 5.
12. **Status line while waiting** (done, PR #17). Two different timers ("running 25s" and "running 17s", 0:45) and "0 actions" while six are listed (2:25). Show one timer and the right count.
13. **Reply popup covers the quest tracker** and stays up for minutes (2:55 to 4:50, 6:45 to 7:40); it also opens with a blank gap at the top. Close it by itself or keep it clear of the tracker. PR #18 stops it opening for ordinary replies (it was the translation popup); for real translations it still stays until closed.
14. **Same reply shown three times** (done, PR #18): window, chat and popup, even with the window open (0:00). Show it once when the window is open.
15. **Copy box is see-through** (done, PR #20; live look pending), so the selected text sits on top of the reply (7:45). Give it a solid background.
16. **Footer looks crossed out and the title runs into the frame border** (done, PR #22; live look pending) (all video). Fix the layout.
17. **Window opens on top of the game chat** (done, PR #22; live look pending) by default (0:00, 5:10). Pick a default position clear of the chat.
18. **Copy button per command line** (done, PR #26; live look pending). A small [copy] link next to each command opens the copy box with only that line (7:45).
19. **Settings as a menu checklist** (done, PR #15). The mentor gives settings as menu paths the player ticks ("Options > Controls > Auto Loot: on") instead of scripts. Avoids the popups at 7:55 and 8:00. Builds on item 11.
20. **Starter questions for a new character** (done, PR #30; live look pending). A first-run card with four questions fitted to class and level (0:00).
21. **Level-up nudge** (done, PR #29; live check pending). After the fight in which the player levels up, offer "what changes at this level?" (6:20). Out of combat only; extends the level re-run from WOW-11.
22. **Death recap** (from Details! and Blizzard's death recap; see `docs/similar-addons-2026-10-03.md`). Recap lines at the top of `.death.txt` (done, PR #6).
23. **Health before each hit.** Add the player's health before each hit and the overkill of the killing blow to the death recap, read from the advanced log block. Needs a real Forever log with advanced logging (item 1) to confirm the field layout.
24. **Death file shows only incoming lines** (done, PR #9). `.death.txt` also lists hits the player dealt (the destination test matches the player as source). Small fix with a real-format test fixture.
25. **Warlock rubric** (done, PR #10) (from WoWAnalyzer's per-spec checklists). `mentor/rubrics/warlock.md` with uptime, cooldown and idle-time checks the mentor can prove from a log slice, every rule cited. Other classes later.
26. **Dummy practice compare** (done, PR #12) (from Localog). `cmd=practice`: review two target-dummy sessions and compare active time and damage from their scorecard rows.

Add new items at the end with the next number; mark done items `(done, PR #n)` instead of deleting them.
