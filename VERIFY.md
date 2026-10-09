# VERIFY

Merge evidence for wow-ai. Run these from the repo root and paste their real output in the PR body. CI runs the same two commands on Windows and Linux. When behavior changes, update this file in the same PR. A fuller project skill can be generated with `create-verification-skill` and kept current with `maintain-verification-skill`.

## Commands

- `npm ci`
- `node tools/safety-ci.js` (Blizzard-policy and safety checks; must exit 0)
- `npm test` (must end with `# fail 0` and `CODEC ROUND-TRIP PASS`)

In-game behavior cannot be verified by an agent. Only Pedro can run the game; a PR that changes the addon gives him a short checklist and says the in-game part is unverified.

## Output (2026-10-09, `forever` c2a0113 plus branch `claude/project-thread-3n427i`, Linux)

```
npm ci                    -> exit 0
node tools/safety-ci.js   -> exit 0
npm test                  -> exit 0
# tests 267
# pass 264
# fail 0
# skipped 3
>>> CODEC ROUND-TRIP PASS
```

## Output (2026-10-09, ticket 41, Pedro's PC, Windows)

Docs only. CLI probes (read-only):

```
claude --version          -> 2.1.295 (Claude Code); --effort (low, medium, high, xhigh, max)
codex --version           -> codex-cli 0.159.0; exec has -m and -c key=value
codex exec --json -m gpt-6-sol -c model_reasoning_effort=high -
                          -> flags accepted, 401 token_expired (ChatGPT sign-in), no reply
~/.codex/models_cache.json-> fetched_at 2026-10-02; 11 models, 9 visibility=list
grok                      -> not installed
agy --version             -> 1.3.2; agy models -> 18 "id<TAB>label" lines; --output-format rejected
hermes chat --help        -> --reasoning LEVEL: none, minimal, low, medium, high, xhigh, max, ultra
```

Repo checks:

```
npm ci                    -> exit 0
node tools/safety-ci.js   -> exit 0
npm test                  -> exit 0
# tests 267
# pass 267
# fail 0
# skipped 0
>>> CODEC ROUND-TRIP PASS
```
