# wow-ai (WoW: Forever mentor)

Pedro's fork of `chelinho139/wow-ai` (MIT): chat with local coding agents from inside World of Warcraft: Forever, plus an after-combat mentor. Goals and backlog: `docs/spec.md`. How it works: `docs/ARCHITECTURE.md`, `docs/FOREVER.md`. Conventions and the test table: `CONTRIBUTING.md`.

`mentor/AGENTS.md` and `docs/AGENTS.md` are product files (the in-game coach's prompt and the agent-CLI guide), not instructions for working on this repo.

## Blizzard policy (permanent rule, Pedro, 2026-10-03)

wow-ai must comply 100% with Blizzard's Terms of Service, EULA and UI add-on policy at all times. Any feature, change or idea that could breach them is rejected, however useful. When in doubt, don't ship it and ask Pedro on nercari-control #114.

- Check every PR against `docs/COMPLIANCE.md` and say in the PR that you did. It lists the sources, what each clause means for this repo, and the open questions waiting on Pedro.
- The addon only uses the game's own UI API, never replaces Blizzard functions or frame methods (hook them with `hooksecurefunc`), never calls protected or hardware-event actions outside a real keypress or click, and never performs gameplay, economy or targeting actions for the player.
- No advertising, donation requests, paid features or hidden code in the addon (UI add-on policy rules 1, 2, 4, 5).
- Agent replies never hand out code that plays for the player. Settings are given as menu paths, not `/run` scripts.
- `tools/safety-ci.js` enforces what it can (`LUA-TAINT`, `POLICY-SOLICIT`, protected automation, input and memory APIs, obfuscation). Where a new risk can be checked by code, add the check.

## Working here

- Default branch is `forever`. Every change is a PR into it, one change per PR, verified by an agent that did not write it before merge.
- Work without check-ins (Pedro, 2026-10-03). Once CI is green and the independent verifier returns PASS, merge the PR yourself and start the next backlog item; never ask Pedro to merge, approve or type "continue". Stop and ask only for: publishing or messaging outside GitHub, spending money, deleting data without a backup, force-push, or a goal/direction decision. Put those on nercari-control #114 and keep working on anything else.
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
