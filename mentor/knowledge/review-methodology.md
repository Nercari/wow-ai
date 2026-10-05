topic: After-combat log review methodology — how expert coaches review WoW performance
applies-to: Retail (Midnight, 12.x) primary; notes where Classic Era/Anniversary/Hardcore and MoP Classic differ
fetched: 2026-09-25
sources: 22 (listed at the end)

Purpose: give a mentor agent (a) enough of the WoWCombatLog.txt format to read or reason about log evidence, (b) the grading logic that Warcraft Logs/WoWAnalyzer/Wipefest use so the mentor's own judgments are consistent with tools the player may already see, and (c) the human-coaching structure (prioritize, compare, limit scope) and pedagogy that make after-combat feedback something a player actually acts on.

## 1. The WoWCombatLog.txt format

### 1.1 File, header, line shape
RETRIEVED. The client writes plain-text combat events to `World of Warcraft\_retail_\Logs\WoWCombatLog.txt` (or the Classic-flavor equivalent) when logging is on — toggled with `/combatlog` or `LoggingCombat(true)`. [warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT]
The file opens with a version header, e.g.:
`11/21 12:01:34.071  COMBAT_LOG_VERSION,19,ADVANCED_LOG_ENABLED,1,BUILD_VERSION,9.1.5,PROJECT_ID,1`
`ADVANCED_LOG_ENABLED,1` tells a parser every subsequent line carries the 19-field advanced block described in §1.3; `0` means only base fields are present. [warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT]

Each line: `MM/DD HH:MM:SS.mmm  EVENT,field1,field2,...` — timestamp, two spaces, then comma-separated fields, quoted where a name contains a comma. RETRIEVED (structure), REPORTED (exact timezone-offset behavior — one source says some builds append a timezone offset; not independently confirmed). [wowcoach.gg/docs/combat-log/line-format]

### 1.2 Base fields (every SOURCE→DEST event)
RETRIEVED, cross-confirmed by two independent fetches. Order:
1. `timestamp`
2. `event` (subevent name, e.g. `SPELL_DAMAGE`)
3. `hideCaster` (bool — true if the source unit is meant to be hidden from the player, e.g. some NPC scripting)
4. `sourceGUID`
5. `sourceName`
6. `sourceFlags` (bitmask — see §1.4)
7. `sourceRaidFlags` (raid target-marker bitmask: skull/X/square/etc.)
8. `destGUID`
9. `destName`
10. `destFlags`
11. `destRaidFlags`
[warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT; wowcoach.gg/docs/combat-log/line-format]

Environmental events (falling, drowning, lava) use an all-zero source GUID (`0000000000000000`) since there is no acting unit. REPORTED. [wowcoach.gg/docs/combat-log/line-format]

### 1.3 Advanced combat logging block (19 fields)
RETRIEVED, cross-confirmed. Present on spell/swing events only when `advancedCombatLogging` is on (the "Advanced Combat Logging" checkbox in the game's Network options; tell the player the menu path, never a console command; default on for most UIs, required for Warcraft Logs uploads to show gear/talents/resources). Sits after the prefix fields (spellId/spellName/spellSchool where applicable) and before the suffix fields:

| # | Field | Meaning |
|---|-------|---------|
| 1 | infoGUID | which unit (source or dest, depending on event) this block describes |
| 2 | ownerGUID | pet/guardian owner, or all-zero |
| 3 | currentHP | |
| 4 | maxHP | |
| 5 | attackPower | |
| 6 | spellPower | |
| 7 | armor | |
| 8 | absorb | currently-applied absorb shield amount |
| 9 | powerType | enum: 0=Mana,1=Rage,2=Focus,3=Energy, etc., plus class resources |
| 10 | currentPower | |
| 11 | maxPower | |
| 12 | powerCost | resource cost of the ability being logged |
| 13 | positionX | |
| 14 | positionY | |
| 15 | uiMapID | zone/instance map id |
| 16 | facing | radians, 0–2π |
| 17 | level | NPC level, or **player item level** for player units |

Rule for parsers: always match `infoGUID` against the source/dest GUIDs in the base header — the block describes the source on swing/cast events and the target on most damage/heal events, so don't assume "advanced block = source." [wowcoach.gg/docs/combat-log/advanced-logging; warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT — field lists match]

### 1.4 Unit flags (sourceFlags/destFlags) — the bitmask a mentor needs to classify "who is this"
RETRIEVED, official wiki. `sourceFlags`/`destFlags` are a 32-bit OR of one value from each of four categories plus optional special bits:

**Affiliation** (mask `0xF`): `MINE 0x1`, `PARTY 0x2`, `RAID 0x4`, `OUTSIDER 0x8`
**Reaction** (mask `0xF0`): `FRIENDLY 0x10`, `NEUTRAL 0x20`, `HOSTILE 0x40`
**Control** (mask `0x300`): `PLAYER 0x100`, `NPC 0x200`
**Type** (mask `0xFC00`): `PLAYER 0x400`, `NPC 0x800`, `PET 0x1000`, `GUARDIAN 0x2000`, `OBJECT 0x4000` (traps/totems)
**Special** (mask `0xFFFF0000`): `TARGET 0x10000`, `FOCUS 0x20000`, `MAINTANK 0x40000`, `MAINASSIST 0x80000`, `NONE 0x80000000` (unit no longer exists)

Worked example from the source: a hostile duel opponent (an enemy player, outsider, controlled by a player) decodes to `0x548`. A boss is typically hostile+NPC-controlled+NPC-type+outsider, e.g. `0xa48`. [warcraft.wiki.gg/wiki/UnitFlag]

**Practical read for a mentor:** a unit is "the player being coached" when its GUID has prefix `Player-` (§1.5) *and* its flags include `AFFILIATION_MINE (0x1)` in a log recorded by that player's own client, or — for a log uploaded by someone else — when its `sourceName`/`destName` matches the character name the mentor is reviewing. Raid/party members show `AFFILIATION_PARTY`/`RAID` instead of `MINE`. Pets show `TYPE_PET` with a non-zero `ownerGUID` pointing back to the player. INFERRED from the flag table above, consistent with how Warcraft Logs and WoWAnalyzer attribute pet damage to the owning player.

### 1.5 GUID formats and identifying the player
RETRIEVED. GUIDs are globally unique per-entity strings:
- `Player-<serverID>-<lowGUID>` — a player character (e.g. `Player-1096-06DF65C1`)
- `Pet-...`, `Vehicle-...`, `GameObject-...`, `Creature-...` — companions, vehicles/siege, interactables, NPCs respectively
- For `Creature-` GUIDs, an embedded field is the NPC entry ID, which identifies *which* boss/trash template it is (constant across every pull of that boss). [wowcoach.gg/docs/combat-log/line-format; warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT]

To find "the player" in an arbitrary log: match `sourceName`/`destName` to the known character name (realm-qualified when cross-realm groups are present), or — more robustly — read the `COMBATANT_INFO` line Blizzard emits at `ENCOUNTER_START` for every raid/party member, which lists each player's full GUID alongside gear, talents, and stats for that pull; the GUID from that line then keys every subsequent event for that character. INFERRED from standard combat-log parsing practice (this is how Warcraft Logs itself attributes player rows); not independently fetched from an official field-by-field COMBATANT_INFO spec this session.

### 1.6 Event type catalog
RETRIEVED, cross-confirmed. Events are `PREFIX_SUFFIX` (mostly):

**Prefixes**: `SWING` (melee auto-attack), `RANGE` (ranged auto-attack), `SPELL`, `SPELL_PERIODIC` (DoT/HoT ticks), `SPELL_BUILDING` (destructible-object damage/heal), `ENVIRONMENTAL` (fall/drown/lava/fatigue).
**Suffixes**: `_DAMAGE`, `_HEAL`, `_MISSED` (miss/dodge/parry/block/absorb/immune/resist, cause given in a `missType` field), `_ENERGIZE` (power gain), `_DRAIN`/`_LEECH` (power loss), `_INTERRUPT`, `_DISPEL`, `_DISPEL_FAILED`, `_STOLEN` (spellsteal), `_AURA_APPLIED`, `_AURA_REMOVED`, `_AURA_APPLIED_DOSE` (stack gained), `_AURA_REMOVED_DOSE` (stack lost), `_AURA_REFRESH`, `_AURA_BROKEN`, `_AURA_BROKEN_SPELL` (CC broken by damage), `_CAST_START`, `_CAST_SUCCESS`, `_CAST_FAILED`, `_SUMMON`, `_CREATE`, `_EXTRA_ATTACKS`.
**Standalone**: `UNIT_DIED`, `UNIT_DESTROYED`, `PARTY_KILL`, `SPELL_INSTAKILL`, `ENCOUNTER_START`, `ENCOUNTER_END`, `ZONE_CHANGE`, `MAP_CHANGE`, `WORLD_MARKER_PLACED/REMOVED`, `COMBATANT_INFO`, `ARENA_MATCH_START/END`. [warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT; wowcoach.gg/docs/combat-log]

**Suffix fields a mentor will actually use:**
- `_DAMAGE`: `amount, overkill, school (bitmask: 1 Physical,2 Holy,4 Fire,8 Nature,16 Frost,32 Shadow,64 Arcane; combined schools sum bits), resisted, blocked, absorbed, critical, glancing, crushing[, isOffHand]`. RETRIEVED for field list; school bitmask values REPORTED (matches long-standing public documentation, not re-verified against an official source this session).
- `_HEAL`: `amount, overhealing, absorbed, critical` — this is the field a mentor reads directly for healer overhealing %, not a derived guess.
- `_AURA_APPLIED`/`_AURA_REMOVED`: `auraType (BUFF|DEBUFF), amount` (stack count, omitted on refresh).
- `_MISSED`: `missType, isOffHand, amountMissed` (for partial absorbs/blocks).
- `SPELL_INTERRUPT`: dest's cast (spellId/spellName/spellSchool of the interrupted cast) appended after the interrupting spell's own prefix — this is the exact event a mentor cites as evidence for "you did/did not interrupt X."
- `SPELL_DISPEL`: extra fields identify the dispelled aura (spellId/name/school) and whether it succeeded.
[warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT]

### 1.7 What changed in Midnight (12.x)
RETRIEVED, official wiki + corroborated by an independent addon-developer technical writeup. Two distinct systems must not be conflated:

1. **Live addon API access to combat events, in-instance, is restricted.** As of patch 12.0.0, `COMBAT_LOG_EVENT` and `COMBAT_LOG_EVENT_UNFILTERED` *error when an addon tries to register them* during boss encounters and Mythic+ runs (open-world combat is unaffected). `CombatLogGetCurrentEventInfo()` now returns "secret values" Lua cannot read or act on. Blizzard replaced parts of the surface with a new `C_CombatLog` namespace (`ApplyFilterSettings`, `IsCombatLogRestricted`, etc.) and new events (`COMBAT_LOG_MESSAGE`, `COMBAT_LOG_EVENT_INTERNAL_UNFILTERED`), plus a broader "Secret Values" security mechanism restricting Lua from reading spell/aura/health/power data on "tainted" code paths generally. Stated Blizzard intent: stop addons from *automating decisions* off live combat data (e.g., auto-interrupt/auto-dispel bots, hyper-optimized WeakAuras that react faster than a human). [warcraft.wiki.gg/wiki/Patch_12.0.0/API_changes; github.com/Xerrion/DragonShout issue #28, which cites Ion Hazzikostas describing it as "combat events are in a black box; addons can change the size or shape of the box... but cannot look inside" (attributed Nov 2025, not independently verified against a primary blue post this session)]
   Addon authors are migrating live-reaction addons (interrupt/dispel trackers) from CLEU to `UNIT_SPELLCAST_INTERRUPT`/`UNIT_AURA`/`UNIT_SPELLCAST_SUCCEEDED`, which still fire but carry less raw data. REPORTED (from the same GitHub issue; describes an in-progress migration, not a finished, universally-adopted standard).

2. **File-based logging (`WoWCombatLog.txt`, what Warcraft Logs/WoWAnalyzer/Wipefest/this mentor's log review all actually consume) is a separate, engine-level write-to-disk path, not part of the addon Lua API, and is reported unaffected.** `/combatlog` still works, the file still contains the same event/field structure documented above, and third-party parsers work unchanged. REPORTED — stated explicitly by a fan combat-log-documentation site ("The combat log file that WoW writes to disk is completely unaffected... WarcraftLogs, WowCoach, and any tool that parses WoWCombatLog.txt work exactly as they did before") and consistent with (not contradicted by) the addon-developer GitHub issue, which discusses only the Lua API and explicitly does not mention the text file. Not confirmed against an official Blizzard statement this session — treat as high-confidence but unverified-at-the-primary-source. [wowcoach.gg/blog/how-to-enable-combat-logging-wow; github.com/Xerrion/DragonShout issue #28]

**Practical implication for the mentor:** log-based after-combat review (this document's whole subject) is unaffected by the Midnight addon lockdown. What *is* affected is any advice that assumed the player had access to real-time automated addon warnings (e.g., "your WeakAura should have told you") during progression content — that class of tool is now weaker in raid/M+, so the mentor's between-pull and after-combat coaching becomes relatively more important, not less. INFERRED.

Classic Era/Anniversary/Hardcore/MoP Classic run on older client builds and are not affected by any Midnight (12.x) API change; combat logging there follows the pre-12.0 field set (no `level`-as-itemLevel caveat needs adjustment, but very old Classic builds have a shorter advanced-block field count — not verified this session). REPORTED/INFERRED.

---

## 2. How grading tools score players

### 2.1 Warcraft Logs — parse percentiles
RETRIEVED (mechanism) / REPORTED (direct fetch of the official help page returned HTTP 403; description below is drawn from a search-indexed excerpt of that same page plus corroborating guide sites, not a page Claude read directly this session — treat as REPORTED, re-verify before quoting exact numbers).

Mechanism: a kill's DPS/HPS on a boss is compared against every other log of the same spec, same boss, same difficulty. The percentile answers "what fraction of same-spec pulls on this kill did you beat." Rather than ranking every parse individually, Warcraft Logs caches metric values at fixed percentile breakpoints (100/99/95/90/...) once per rolling 24h window, then assigns a specific parse a percentile by **linear interpolation** between the two nearest cached breakpoints; a brand-new parse is scored against *yesterday's* cached breakpoints until the current day's data is collected. [warcraftlogs.com/help/ranks — REPORTED via search excerpt]

**Stated/derived limitations (important for a mentor not to over-trust a parse number):**
- **Parse ≠ skill.** It measures DPS/HPS output relative to peers of the same spec on the same kill, not mechanical execution. RETRIEVED (paraphrase of explicit guide language).
- **Gear-gated.** A well-geared player in a stomped Normal/Heroic pug outranks a fresh, correctly-played character; "item-level parses" (a Warcraft Logs filter) control for this and are the more honest self-comparison. REPORTED.
- **Kill-time-gated.** Specs with strong burst cooldowns parse higher when the kill happens to land inside their cooldown window; the same rotation quality yields a different percentile depending on how long the fight took. REPORTED.
- **Comp/externals-gated.** Damage/haste buffs from other classes (e.g., Bloodlust windows, external cooldowns) inflate output independent of the parsed player's own play. REPORTED.
- **Rewards tunneling over raid value.** A player who ignores an assigned interrupt/soak/add-kill to maximize boss damage can out-parse a player who did the mechanic correctly; conversely, correct mechanical play can *cost* parse. RETRIEVED (explicit guide language: "many high parses come from players who are not doing mechanics").
- **Death penalty is a blunt instrument.** Warcraft Logs divides total damage by the *full* encounter duration, not the player's active/alive time, so dying early tanks the parse regardless of how well the player played before dying — a strong early performance and a sloppy full-length one can land on a similar low number for different reasons. REPORTED.
- **Healers are extra distorted.** A raid that takes little avoidable damage needs less healing, which lowers every healer's HPS and thus their parse, independent of healer skill — "good raid play makes healer parses look worse." REPORTED.
[wowcoach.gg/blog/what-your-wow-parse-score-means, for the limitations list above]

**Coaching rule this implies (INFERRED):** treat a parse as a rough peer-comparison signal, not a verdict; always pair it with the death/mechanics/cooldown evidence in §1.6/§4, and prefer item-level-normalized or "all stars"/composite metrics over a single raw parse when they're available.

### 2.2 WoWAnalyzer — checklist + prioritized suggestions
REPORTED (search-indexed summaries; direct fetch of wowanalyzer.com returned only a JS-loading shell, so content below is not independently read from the live page this session).

WoWAnalyzer runs a spec-specific rule suite over an uploaded Warcraft Logs report and outputs two linked views:
- **Checklist**: pass/fail-style bullets against spec-appropriate targets — e.g., "keep Ignore Pain uptime above X%," "don't let [cooldown] cap," "use [talent-gated ability] on cooldown" — each showing the player's actual value against the target, flagged (commonly red/amber) when under target. REPORTED.
- **Suggestions**: the same underlying checks, ranked and explained in prose, explicitly **prioritized by impact** — the tool's own framing is that its "top 3 suggestions usually explain 80% of the gap to the top of your spec," i.e., it deliberately does not dump every nitpick on the player at once. RETRIEVED (explicit claim from search-indexed "About" content).
- Underlying modules track buff/debuff uptime, cast order/rotation adherence, cooldown usage (capped/wasted cooldowns, "how many casts of your 2-minute cooldown should this fight length have allowed"), avoidable damage taken, and resource waste (overcapping energy/combo points/etc.). REPORTED.
- Also flags talent/build mismatches for the specific encounter (e.g., a single-target talent on an adds-heavy fight). REPORTED.

**Limitation, INFERRED from how the tool works:** it can only see what the combat log records — it infers "avoidable damage" from known mechanic ability IDs the maintainers have manually tagged per boss, so a new boss or an untagged mechanic won't be caught; and like Warcraft Logs it cannot see positioning/intent beyond what damage/aura events imply, so it complements but doesn't replace a human/VOD review for spatial mistakes.

### 2.3 Wipefest — mechanic-weighted "Player Score"
REPORTED (search-indexed summary of a Wipefest engineering post; not independently fetched this session).

Wipefest's headline feature is per-mechanic, per-player scoring on raid bosses: for each tagged mechanic (e.g., "stood in Fire," "didn't soak," "took an avoidable hit"), a player's score for that mechanic is *"what percentile would the raid's score be if everyone had behaved like this player did."* Each mechanic's contribution is weighted by an algorithmically-estimated importance (recomputed regularly, since a boss's "important" mechanics can shift as strategies evolve). Assigned/limited-opportunity mechanics (soaks, interrupts that can only go to one person) are shown but excluded from the core score, since not every player gets an equal chance to perform them. It separately tracks missed/late interrupts (casts the raid should have stopped and didn't) and excludes tanks from "everyone should avoid this" cleave/frontal categories where the mechanic is intentionally tank-targeted. REPORTED. [medium.com/wipefest engineering post, via search excerpt; archon.gg Wipefest guide articles]

### 2.4 Cross-cutting metrics every tool converges on
INFERRED synthesis of §2.1–2.3 plus corroborating guide sites (itsbetteronthebeach.com, wowcoach.gg beginner's guide):

| Metric | What it is | Log evidence | Caveat |
|---|---|---|---|
| Uptime / "Always Be Casting" | % of fight time not idle between casts | Gaps between `SPELL_CAST_SUCCESS`/`SWING_DAMAGE` on the player as source | "Active time" as computed by tools like World of Logs/Warcraft Logs counts *damage-event* uptime, which includes DoT ticks and pet swings with no player input — a player can show high "active time" while barely pressing buttons if a DoT/pet is carrying it. REPORTED, an explicit caveat raised in a GitHub issue against this exact metric. |
| Cooldown usage | Casts of a cooldown vs. how many the fight length allows | Count `SPELL_CAST_SUCCESS` for a given spellId; `fight_length / cooldown_length` (rounded down) is the ceiling | A cooldown cast at 0:01 remaining doesn't "count" for that pull's value even though it registers — timing matters, not just count. INFERRED. |
| Deaths | Raid/party/self death | `UNIT_DIED` on the player, with the preceding ~5–10s of `_DAMAGE`/`_MISSED` events against them as the cause chain | Always the first thing every source checked (§3) says to look at. RETRIEVED. |
| Avoidable damage | Damage from a mechanic every player of that role should dodge/soak-share | `_DAMAGE` events whose spellId matches a maintainer-tagged "avoidable" ability list, filtered to non-tanks for tank-cleave abilities | Tool coverage depends on the ability being tagged; untagged/new-tier mechanics won't show. INFERRED. |
| Interrupts | Stopped enemy casts | `SPELL_INTERRUPT` (who did it, what it stopped) vs. `SPELL_CAST_SUCCESS` on the boss for casts that should have been stopped but weren't | Assigned-target mechanics mean "no interrupt" isn't always a mistake — check the interrupt assignment/rotation first. INFERRED. |
| Dispels | Removed harmful/helpful effects | `SPELL_DISPEL` (success) vs. `SPELL_DISPEL_FAILED`; timing relative to `SPELL_AURA_APPLIED` on the dispellable effect | Late dispel evidence = time between `_AURA_APPLIED` and the matching `SPELL_DISPEL`. REPORTED as one of the "easiest things to fix." |
| Overhealing | Healing that landed on an already-full target | `overhealing` field directly on every `_HEAL` event | 30–40%+ sustained overhealing is the commonly cited threshold for "wasteful," but overhealing is expected and even necessary on reactive/AoE heals — treat as a trend, not a hard fail. REPORTED. |
| Parse percentile | Peer-relative output rank | Warcraft Logs computation (§2.1) | See all limitations in §2.1 — never coach from this number alone. RETRIEVED. |

### 2.5 What none of the tools do well (INFERRED, synthesized)
- They can't fully judge *positioning intent* — a player standing in the right spot for the wrong reason (luck) looks identical to correct play; only VOD/replay review (§3) catches this.
- They can't judge *call quality* — whether a death was the player's mistake, a bad assignment, or a healer CD misallocation requires the human step of asking "what would have prevented this" (§4), not just reading the death recap.
- They reward the metric they measure — pure damage/healing tools can inadvertently teach "parse-chasing" behavior (ignoring mechanics for damage) if a mentor treats the number as the goal rather than a diagnostic.

---

## 3. How human coaches structure feedback

Sources for this section: a WoW-log-reading guide from a paid coaching site (concordp2c.com), a raid-leadership guide (raider.io "Raiding 101: Performance Management," fetch partially blocked — see below), a class-agnostic log-analysis guide (itsbetteronthebeach.com), and a combat-log-tool's own written review framework (wowcoach.gg beginner's guide). All are REPORTED/RETRIEVED as marked; none is an academic source, so treat as community-consensus practice, not verified pedagogy research (that's §5).

### 3.1 Cadence and format
- Push/progression guilds separate **live raid calls** (in-the-moment, terse, no teaching) from a **dedicated review session** — commonly framed as "20–30 minutes, once or twice a week" done by an officer alone or with one other officer, watching pulls/VODs and preparing what to say, rather than teaching live between every pull. RETRIEVED (paraphrase) with the explicit reasoning that raiders "can't absorb structural feedback between pulls; they need one actionable adjustment and a clear timer" in the moment, and save the deeper analysis for the separate review. [guildorder.com/games/wow/guides/raid-leadership, via search excerpt]
- Community practice (class Discords, guild log-review channels) generally follows the same split: a pinned "how to post your log" format (link + which pull + what you want feedback on) funnels into asynchronous written feedback, distinct from live voice coaching. INFERRED from general knowledge of how these channels operate; a specific published channel guide was not found this session (searched, no canonical public doc surfaced) — flagged as an open question below.

### 3.2 Deaths first, then output, then mechanics, then cooldowns
A consistent, explicit ordering appears across sources:
1. **Deaths.** "Always start here. Always." — check who died, when, and why, before anything else, because a death both ends that player's contribution for the rest of the pull and (in M+) often starts a cascade that fails the run outright. RETRIEVED (direct-quoted framing). If time is extremely short: "What's the minimum I should look at after a raid night? Deaths. Just deaths." RETRIEVED. [wowcoach.gg beginner's guide]
2. **Damage/healing summary**, specifically looking for outlier gaps (a commonly cited threshold is a 30%+ gap between same-spec players) rather than absolute numbers. REPORTED.
3. **Mechanics**: avoidable damage and interrupts/dispels tied to the specific boss/key. REPORTED.
4. **Cooldown usage**: offensive CDs used promptly and aligned to damage windows; defensive CDs not wasted early/late. REPORTED.
For each death specifically, the recommended question is narrow and causal: *"rewind the final several seconds and ask what would have prevented it"* — then sort the cause into **personal** (stood in something, missed a defensive), **external** (a cooldown/heal that should have covered them didn't), or **structural** (the raid plan itself was flawed) — because the fix differs by category (player drill vs. reassignment vs. strategy change). RETRIEVED (direct-quoted framing and category split). [concordp2c.com/reading-wow-raid-logs-guide]

### 3.3 Prioritize the highest-impact mistake
Every source that discusses feedback *delivery* (as opposed to just data-reading) converges on giving the single biggest-impact issue first, not a checklist dump:
- WoWAnalyzer's own design explicitly ranks suggestions by impact and states the top 3 typically account for ~80% of the gap to a top player (§2.2) — the *tool* itself embodies "highest-impact first."
- The coaching-guide framing: deaths outrank damage optimization because a death caps a player's entire remaining contribution to the pull; fix that before touching rotation. RETRIEVED (reasoning, not a direct quote).

### 3.4 Compare against a top log of the same spec/fight, then isolate one weakness
- The recommended comparison target is **a stronger player of the same spec on the same boss/fight**, not an abstract ideal — "this provides a working example rather than abstract ideals." What to diff: ability usage/rotation order, cooldown *timing* (not just count), and positioning/mechanic handling, alongside gear/talent/stat differences so those are ruled out as confounds before blaming execution. RETRIEVED. [concordp2c.com; itsbetteronthebeach.com]
- The improvement loop stated explicitly: **"measure, isolate one weakness, fix it, measure again"** — sustained over multiple pulls/weeks on one metric (the example given: reducing avoidable damage for an entire raid tier) rather than a vague "play better" note. RETRIEVED, direct quote. [concordp2c.com/reading-wow-raid-logs-guide]
- Explicit anti-pattern named: don't compare across specs/roles ("comparing different specs is meaningless") — always same-spec, and prefer Warcraft Logs' same-spec percentile framing over raw numbers for that comparison. RETRIEVED. [wowcoach.gg beginner's guide]

### 3.5 Limit to 1–3 fixes
Converging evidence, not a single canonical rule:
- WoWAnalyzer: top 3 suggestions ≈ 80% of the gap (§2.2), i.e., the tool caps itself at a handful of items by design.
- Raid-call framing: "one actionable adjustment and a clear timer" *between* pulls (i.e., 1 item live); the deeper review session can surface more, but still organized as a small prioritized list, not an exhaustive audit. RETRIEVED (paraphrase).
- Esports-coaching material independently converges on the same number: "players receive 3–5 highlighted clips and one concrete corrective action to practice in the next drill block." REPORTED (this is about a different game/genre but the pattern — narrow the *actionable* item to one even when several clips are shown — matches). [scottnovis Medium post via search excerpt]

**Synthesized rule for the mentor (INFERRED):** after any pull/session, output at most 1 fix to act on *immediately* (next pull/key), and at most 2–3 more as a short prioritized backlog for the review session — never a flat list of every deviation the log shows.

---

## 4. Checklist: mistake → log evidence → fix, by role and by content type

Format: **Mistake — Log evidence (event/field) — Fix.** Compiled by synthesizing §1–3 above; role-split items are INFERRED/REPORTED as noted per §2.4/§3; content-split items (M+, leveling, Hardcore) draw on the M+/Hardcore sources cited inline.

### 4.1 Tank
| Mistake | Log evidence | Fix |
|---|---|---|
| Active mitigation not maintained (e.g., Shield Block/Ignore Pain/Bone Shield uptime low on a heavy-melee boss) | `_AURA_APPLIED`/`_AURA_REMOVED` gaps for the mitigation buff spellId on the player; a commonly cited bar is under ~80% uptime on sustained-melee fights. REPORTED. | Re-time the mitigation ability to fire before the gap, usually meaning it needs to be used more proactively/on cooldown rather than reactively. |
| Reactive instead of proactive cooldown use (big defensive CD popped *after* a spike, not before a known big hit) | Compare `SPELL_CAST_SUCCESS` timestamp for the defensive CD against the `_DAMAGE` spike timestamp for the same window; CD lands after the spike = reactive. INFERRED. | Pre-plan defensive CDs against the boss's known cast timeline (from `SPELL_CAST_START` on the boss for the telegraphed ability) instead of health-bar reacting. |
| Cooldown left in the bank / under-used for fight length | `fight_length / cooldown_length` (rounded down) vs. actual `SPELL_CAST_SUCCESS` count for that spellId; fewer casts than the ceiling. RETRIEVED (method). | Slot the missing use(s) into the planned rotation — usually pull-opener and every subsequent cooldown-length interval. |
| Avoidable damage taken on top of unavoidable tank damage, compounding healer load | `_DAMAGE` events tagged as avoidable-mechanic spellIds landing on the tank in addition to boss-melee `_DAMAGE` | Treat tank avoidable damage the same as a DPS/healer would — it's not "free" just because the tank has more health/mitigation. |
| Threat loss (uncommon at current tuning but still a Classic-flavor issue) | A DPS/pet `_DAMAGE` sourceGUID pulling aggro — inferable from boss `_DAMAGE`/target-switch patterns, though threat itself isn't a direct logged field | Open threat-building rotation earlier / use a threat cooldown at pull. |

### 4.2 Healer
| Mistake | Log evidence | Fix |
|---|---|---|
| A death that was "healable" (raid had the throughput, it wasn't assigned to someone else's CD, and the healer simply didn't react) | `UNIT_DIED` with no corresponding `_HEAL` landing on that player in the preceding ~2–3s despite mana/CDs available | Identify why: mana-starved (see below), out of range/LoS (position data via advanced-log `positionX/Y`), or attention split — drill the specific cause. |
| Overhealing consistently high on reactive/single-target spells | `overhealing` field on `_HEAL` events for that spellId; sustained 30–40%+ is the commonly cited inefficiency threshold | Swap toward more efficient/targeted heals for that damage pattern, or tighten timing so heals land on damaged (not full) targets — but don't chase this metric on AoE/prevention heals where overhealing is structurally expected. |
| Major raid cooldown not used on the fight's known big damage window, or used too early | `SPELL_CAST_SUCCESS` timestamp for the CD vs. the boss's telegraphed damage event timestamp; count of casts vs. `fight_length/cooldown_length` | Move the CD call to align with the mechanic; if under-used, add a planned second/third cast. |
| Missed or late dispel | Time gap between `SPELL_AURA_APPLIED` (the dispellable effect) and the matching `SPELL_DISPEL`, or its complete absence | Assign dispel priority explicitly if multiple healers, and drill faster reaction on that specific debuff. |
| Mana runs out before the fight does | Advanced-log `currentPower`/`maxPower` trend for the healer over the fight timeline | Adjust healing-spell mix earlier (more efficient spells in low-intensity phases) rather than only in the final third when it's already too late. |

### 4.3 DPS
| Mistake | Log evidence | Fix |
|---|---|---|
| Low uptime / gaps in casting | Gaps between `SPELL_CAST_SUCCESS` events on the player beyond what movement/mechanics require | Identify *why* — movement without an instant-cast filler, or a genuine rotational lapse — and drill the specific filler/priority. |
| Cooldown not aligned to burst windows (Bloodlust, boss vulnerability phase) | `SPELL_CAST_SUCCESS` timestamp for the cooldown vs. `SPELL_AURA_APPLIED` for Bloodlust/Heroism or the boss's vulnerable-phase marker | Re-plan cooldown timing to line up with the buff/phase rather than using on pull by habit. |
| Died early, inflating perceived "safety" but tanking real output | `UNIT_DIED` timestamp vs. encounter length | Same death-analysis process as §4.1/4.2 — a DPS death is diagnosed the same way, it isn't exempt because "DPS don't need to survive as long." |
| Avoidable damage taken (splitting healer attention away from raid-wide needs) | Avoidable-mechanic `_DAMAGE` events on the player | Same drill as tank/healer avoidable damage — positioning fix, not a rotation fix. |
| Chasing parse instead of the assignment (skips an interrupt/soak to keep DPS up) | `SPELL_CAST_SUCCESS` on the boss for an assigned interrupt target with no matching `SPELL_INTERRUPT` from the assigned player, while that player's own damage output stayed high | Reassert the assignment explicitly; explain the parse-vs-raid-value tradeoff from §2.1 so the player understands *why* the "worse" parse pull was actually the better pull. |

### 4.4 By content type

**Raid boss (scheduled progression/farm pull)**
- Evidence base: full kill or wipe log, `ENCOUNTER_START`/`ENCOUNTER_END`, per-player `COMBATANT_INFO`.
- Process: §3.2 ordering (deaths → output outliers → mechanics → cooldowns), compared against a same-spec top log on the *same boss, same difficulty* (§3.4).
- Fix scope: 1 immediate fix for next pull, 2–3 backlog items for the twice-weekly review (§3.5).

**Mythic+ key**
- Evidence base: same event types, but deaths are costlier (some seasonal affixes remove time from the timer per death — RETRIEVED as a documented mechanic pattern though the exact seconds-per-death value is season/affix-specific and volatile, don't hardcode a number) and interrupts matter more because trash casts are individually dangerous rather than raid-wide. REPORTED.
- Process addition: identify the **first death in the key**, since it's disproportionately likely to have started a cascade that caused the depletion — review that one first even if later deaths look "worse" in isolation. RETRIEVED. Mark one primary and one backup interrupt per priority-cast mob type before the pull, then check the log for whether the assignment held. REPORTED.
- Fix scope: same 1-fix-next-key rule; M+ has faster iteration (many keys per session) so the "measure again" loop in §3.4 happens same-session rather than same-week.

**Leveling / open world**
- Evidence base is thinner: players rarely enable combat logging while leveling, and no major tool grades open-world play the way raid tools do. INFERRED — this is a gap in the tooling ecosystem, not a gap in this research.
- Where log evidence exists (a player did have logging on, or died and the log survived): apply the same death-analysis question — "what would have prevented this" — but the category split shifts toward **avoidable pulls** (aggro range/patrol timing misjudged) and **resource management** (engaged a fight without cooldowns/consumables available) rather than raid-mechanic categories. INFERRED, consistent with Hardcore death-cause data below.
- Fix scope: since open-world mistakes are rarely repeated on a tight loop like a raid pull, the coaching value is more about pattern-naming ("you're pulling extra mobs because you're not checking patrol paths") than log-metric optimization.

**Hardcore death review (Classic Hardcore, permadeath)**
- Evidence base: the death is terminal for that character, so review is retrospective/educational rather than "fix and repull." Community death-tracking (the Deathlog addon, aggregating over 1,000,000 recorded deaths) gives base-rate context for what actually kills players. REPORTED.
- Documented common causes, in the specific dataset found this session (early-game/first-week skew): **falling damage**, **PvP duels**, environmental hazards in specific dungeons (e.g., trap/mine-type mobs in Gnomeregan, lava in Ragefire Chasm), **zone mob-density** overwhelming a single player (cited example: Westfall), and **aggro mismanagement** — pulling extra mobs or drawing a dangerous named mob's attention without noticing. REPORTED, all figures/examples from a single third-party analysis, not cross-verified against a second dataset this session. [warcrafttavern.com; xp4t.com Deathlog analysis]
- Process: for a Hardcore death review, the "what would have prevented this" question (§3.2) is still the right frame, but the fix is a standing habit/rule for future characters ("check surroundings before engaging," "respect fall-damage terrain," "avoid PvP duels below level X") rather than a next-pull drill, since there is no next pull for that character. INFERRED.

---

## 5. Pedagogy: giving feedback players actually act on

Sources: an academic esports-coaching thesis citing Ericsson's deliberate-practice criteria, and secondary esports-coaching writeups. This is the thinnest-sourced section (one academic-adjacent source, rest are practitioner blog posts) — treat the specific "5 criteria" framing as REPORTED-from-academic-citation rather than independently verified against Ericsson's original text.

### 5.1 Deliberate practice — five criteria for a coaching session
REPORTED (citing "Ericsson (2021)" via an esports-coaching thesis, not independently read from Ericsson's original work this session): a practice/feedback session should have (1) a clear, single intention for the session, (2) a task the performer can complete individually and that's genuinely developmental for them (not busywork), (3) immediate, actionable feedback available during or right after the task, (4) multiple attempts at the same practice task (not one-and-done), and (5) a coach who sequences future tasks to match the performer's actual developmental needs, not a fixed curriculum. [diva-portal.org thesis PDF, via search excerpt]

### 5.2 Specificity, one drill, measurable goal
Converging practitioner guidance (REPORTED, multiple independent blog sources):
- Feedback should point at concrete, timestamped evidence — "3–5 highlighted clips" — paired with **one** concrete corrective action to practice in the next attempt, not a general note. The explicit claim is that this narrow loop "reduces repetition of the same errors" compared to broader feedback. [scottnovis Medium post]
- Teach one skill fully before introducing the next — a coach cycles a player through a skill's teaching steps, and only starts the next skill once that cycle is done, rather than layering multiple new instructions at once. [nextlevelesports.com "4 Stages of Teaching"]
- The coach's role is explicitly framed as diagnostic, not comparative: "help a player know what is most important for them to learn" — not to demonstrate the coach's own higher skill level. [epa.gg, via search excerpt]

### 5.3 Applying this to the mentor's after-combat review
INFERRED synthesis of §3 (game-specific practice) and §5.1–5.2 (general coaching pedagogy) — this is the design guidance, not a sourced claim:
1. **One session, one intention.** Each after-combat review should have a single stated focus (e.g., "today we're only looking at avoidable damage on this boss"), matching deliberate-practice criterion (1) and the "measure, isolate one weakness" loop from §3.4.
2. **Cite the exact evidence.** Point at the specific log event(s) — timestamp, spellId, the `UNIT_DIED`/`_DAMAGE`/`overhealing` field — the way §1's event catalog supports, not a vague "you took too much damage." This mirrors the "3–5 highlighted clips" pattern from esports coaching and gives the player something checkable, which builds trust in the mentor's judgment.
3. **One fix for the next attempt.** Per §3.5's convergent 1-fix rule and deliberate-practice criterion (4), give exactly one thing to change on the *next* pull/key, phrased as an action ("cast your interrupt on the second cast of X, not the first" ) not a goal ("interrupt better").
4. **A measurable goal, checkable in the very next log.** State what success looks like in terms the next log will show (e.g., "zero stacks of [debuff] past 2," "mitigation-buff uptime above 80% instead of 62%") so the *next* review can confirm the fix landed — closing deliberate-practice criterion (3)'s "immediate, actionable feedback" loop at the session-to-session level, not just within one session.
5. **Small backlog, not a full audit.** Hold 2–3 secondary items in reserve for the next session rather than surfacing everything the log shows at once, consistent with §2.2's "top 3 ≈ 80% of the gap" framing and §3.5.
6. **Compare to a concrete peer, not an abstract ideal.** Where a same-spec/same-fight reference log is available (top parse, guildmate, or a benchmark log), use it as the comparison target per §3.4, since "a working example" was explicitly preferred over abstract advice in the coaching-guide sources.

---

## Sources
1. https://warcraft.wiki.gg/wiki/COMBAT_LOG_EVENT — official community wiki (post-Fandom migration); combat log line format, base fields, event catalog, Midnight AddOn-access note. RETRIEVED.
2. https://wowcoach.gg/docs/combat-log/advanced-logging — third-party combat-log field documentation site; advanced 19-field block, infoGUID matching rule. RETRIEVED.
3. https://wowcoach.gg/docs/combat-log/line-format — same site; base header fields, GUID prefixes, player-identification heuristic. RETRIEVED.
4. https://www.warcraftlogs.com/help/ranks/ — official Warcraft Logs help page; percentile/interpolation methodology. Direct fetch returned HTTP 403; content is REPORTED via a search-engine excerpt of the same page, not independently read.
5. https://wowanalyzer.com/about — official WoWAnalyzer "About" page. Direct fetch returned only a JS-loading shell; checklist/suggestions content in this file is REPORTED via search-indexed third-party summaries (thegamercodex.com, wowcoach.gg comparison post), not independently read from the live page.
6. https://warcraft.wiki.gg/wiki/UnitFlag — official community wiki; full unit-flag bitmask table and worked example. RETRIEVED.
7. https://warcraft.wiki.gg/wiki/Patch_12.0.0/API_changes — official community wiki; Midnight combat-log addon API restriction, C_CombatLog/Secret Values. RETRIEVED.
8. https://github.com/Xerrion/DragonShout/issues/28 — addon-developer technical issue discussing CLEU removal, migration path, and Ion Hazzikostas "black box" quote (attribution not independently verified). REPORTED for the quote; RETRIEVED for the technical migration description.
9. https://wowcoach.gg/blog/how-to-enable-combat-logging-wow — third-party guide; explicit claim that file-based WoWCombatLog.txt logging is unaffected by Midnight's addon API changes. REPORTED.
10. https://wowcoach.gg/blog/what-your-wow-parse-score-means — third-party guide; parse color scale and the detailed list of parse-percentage limitations used throughout §2.1. RETRIEVED (quotes taken directly from fetched page).
11. Wipefest engineering post (medium.com/wipefest, "I wrote an algorithm to calculate the most important boss mechanics") — via search excerpt only, not fetched directly. REPORTED. Used for §2.3 Player Score methodology.
12. https://www.concordp2c.com/reading-wow-raid-logs-guide/ — paid-coaching-site guide; death-analysis question framing, "measure, isolate, fix, measure again" loop, same-spec comparison advice. RETRIEVED (quotes taken directly from fetched page).
13. https://raider.io/fr/news/556-raiding-101-performance-management — official Raider.IO article on raid performance management; partially fetched, limited usable content (progression-pattern and escalation-process notes only). RETRIEVED for what was extracted; the article did not cover prioritization/frequency frameworks in depth.
14. https://itsbetteronthebeach.com/wow-raid-logs-explained/ — third-party guide; per-role (DPS/tank/healer) checklist structure and "compare to top performers" process. RETRIEVED.
15. https://wowcoach.gg/blog/how-to-read-wow-combat-logs-beginners-guide — third-party guide; step-by-step review ordering (deaths first), "comparing different specs is meaningless," minimum-viable review advice. RETRIEVED (quotes taken directly from fetched page).
16. Esports-coaching deliberate-practice thesis (diva-portal.org, "Coaching and talent development in esports") — academic thesis citing Ericsson (2021) five criteria; via search excerpt only, not fetched directly. REPORTED.
17. Scott Novis, "Coaching Esports: A Model For Player Improvement" (Medium) — via search excerpt only. REPORTED. Used for "3–5 clips + one corrective action" pattern.
18. nextlevelesports.com, "The 4 Stages Of Teaching Anything As An Esports Coach" — via search excerpt only. REPORTED. Used for "one skill at a time" sequencing.
19. epa.gg, "Esports Coaching" — via search excerpt only. REPORTED. Used for coach-as-diagnostician framing.
20. warcrafttavern.com, "The Top Causes of Death in Hardcore WoW" — via search excerpt only. REPORTED. Used for §4.4 Hardcore death-cause list.
21. xp4t.com, "Deathlog Analysis: Top 10 Common Ways Players Die in WoW Hardcore" — via search excerpt only. REPORTED. Corroborates #20 (Deathlog addon dataset, 1M+ death records).
22. guildorder.com, "WoW Raid Leader Guide: Calls, Reviews, Burnout" — via search excerpt only. REPORTED. Used for §3.1 review cadence ("20–30 minutes, twice a week," live-call vs. review-session split).

Additional search-only corroboration not separately numbered above (used for cross-checking, not as a sole source for any claim): parsepal.gg, wowsod.pro, parsecard.app, wow-healper.com, misti.services, mmo-champion.com forum threads, github.com/WoWAnalyzer/WoWAnalyzer wiki.

## Open questions
- Could not independently fetch warcraftlogs.com/help/ranks (403) or wowanalyzer.com (JS shell) — the percentile-interpolation mechanics (§2.1) and WoWAnalyzer's exact module list (§2.2) should be re-verified against the live pages if precision matters (e.g., before hardcoding exact percentile-color cutoffs into mentor prompts).
- No canonical, citable public document for "how a class Discord log-review channel is structured" was found — §3.1's description of async post-and-feedback channels is inferred from general familiarity with the pattern, not a fetched source. If the mentor needs to mimic a specific community's channel format, that should be sourced directly from that community.
- Wipefest's mechanic-importance weighting algorithm (§2.3) and WoWAnalyzer's per-spec module list are described only via secondary summaries; exact current behavior may have changed since those summaries were written.
- Season/affix-specific M+ numbers (e.g., seconds removed from the timer per death under a given affix) are explicitly NOT hardcoded in §4.4 because they are VOLATILE (tuned per season) — a mentor should re-check the current season's affix text before citing a specific number.
- The Midnight file-logging-unaffected claim (§1.7, item 2) rests on one fan-site statement corroborated only by the *absence* of contradiction in a second technical source, not a positive official Blizzard confirmation — worth a direct check against an official blue post if this becomes a load-bearing assumption (e.g., if the mentor tells a player "don't worry, logging still works exactly the same").
