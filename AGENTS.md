# wow-ai (WoW: Forever mentor)

Pedro's fork of `chelinho139/wow-ai` (MIT): chat with local coding agents from inside World of Warcraft: Forever, plus an after-combat mentor. Goals and backlog: `docs/spec.md`. How it works: `docs/ARCHITECTURE.md`, `docs/FOREVER.md`. Conventions and the test table: `CONTRIBUTING.md`.

`mentor/AGENTS.md` and `docs/AGENTS.md` are product files (the in-game coach's prompt and the agent-CLI guide), not instructions for working on this repo.

## Working here

- Default branch is `forever`. Every change is a PR into it, one change per PR, verified by an agent that did not write it before merge.
- `npm ci`, then `node tools/safety-ci.js` and `npm test` must pass (CI runs both on Windows and Linux). Add or extend a test for every behaviour change; update `CHANGELOG.md` and `docs/` when users would notice.
- The bridge stays dependency-free; the addon uses only APIs in the Forever client.
- Large work (several PRs or a new feature) starts as a numbered item in `docs/spec.md`.

## Never

- Add anything that plays for the player, reads game memory, injects code or generates input, or gives live combat help. Never weaken `tools/safety-ci.js`, `tools/safety-allow.json` or `tools/lua-allow.json` to get green.
- Commit personal data: character notebooks, combat logs, screenshots, `bridge/config.json`, the live `wow-mentor/` workspace.
- Publish (public fork, upstream PR, forum post) or message anyone outside GitHub without Pedro's OK.
- Claim an in-game result without a live check. Only Pedro can run the game; give him a short checklist.

## Nercari HQ

Managed by Nercari HQ; follow `hq/managed-projects.md` in `Nercari/nercari-control`. Report ready, blocked or finished work with an `@claude` comment on nercari-control PR #97, and put anything waiting on Pedro on issue #114. Reply in the language Pedro writes in.
