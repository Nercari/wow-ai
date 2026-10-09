# VERIFY

Merge evidence for wow-ai. Run these from the repo root and paste their real output in the PR body. CI runs the same two commands on Windows and Linux. When behavior changes, update this file in the same PR. A fuller project skill can be generated with `create-verification-skill` and kept current with `maintain-verification-skill`.

## Commands

- `npm ci`
- `node tools/safety-ci.js` (Blizzard-policy and safety checks; must exit 0)
- `npm test` (must end with `# fail 0` and `CODEC ROUND-TRIP PASS`)

In-game behavior cannot be verified by an agent. Only Pedro can run the game; a PR that changes the addon gives him a short checklist and says the in-game part is unverified.

## Output (2026-10-09, `forever` 6f70053 plus branch `claude/project-thread-fie9ei`, Linux)

```
npm ci                    -> exit 0
node tools/safety-ci.js   -> exit 0
npm test                  -> exit 0
# tests 281
# pass 278
# fail 0
# skipped 3
>>> CODEC ROUND-TRIP PASS
```
