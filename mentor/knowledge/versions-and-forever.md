topic: WoW version landscape and World of Warcraft: Forever
applies-to: All flavors live as of 2026-09-25 — Retail (Midnight, patch 12.1), Classic Era, Hardcore, Burning Crusade Classic Anniversary, Season of Discovery, Mists of Pandaria Classic, World of Warcraft: Forever (beta)
fetched: 2026-09-25
sources: 33 (listed at the end)

# Part 1 — World of Warcraft: Forever

## What it is

**RETRIEVED.** World of Warcraft: Forever is a first-party Blizzard product: a new, permanent, indefinitely-running game built on the original (2004) Azeroth setting, that adds new zones/quests/dungeons/raids/races/systems on top of the vanilla foundation instead of recreating patch 1.12 unchanged (which is what Classic Era does) or progressing through the historical expansion timeline (which is what the Classic progression realms and Retail do). Blizzard's own framing: it "expands the original Azeroth rather than progressing through the same expansion timeline as the main game," and exists "alongside" both Retail and Classic, not as a replacement for either. [1][3][4]

Internally it carries the dev codename **Camelot**; the community/press shorthand for the product category is **"Classic+"** — the WoW Forever branding is Blizzard's official name for what players had been calling Classic+ for years. [4]

**Continuity:** Forever is set indefinitely in the first year of the original game's timeline (Warcraft Wiki gives "25 ADP"), after the events of *Warcraft III: Reforged — Forsaken Kingdom* but before Molten Core opens. Warcraft Wiki states it explicitly "does not exist in the same continuity as retail World of Warcraft." [4]

## Who runs it

**RETRIEVED.** Blizzard Entertainment, first-party — both developer and publisher. This is not a private server or fan project; it is announced and hosted on news.blizzard.com and worldofwarcraft.blizzard.com, sold through Battle.net, and patched through the official client updater. [1][2][3]

## Launch / beta dates

**RETRIEVED** (Blizzard's own pre-purchase article, fetched directly):
- Announced at BlizzCon 2026, September 12, 2026. [3]
- Beta: **September 17, 2026 – October 21, 2026 (PST)**. [2]
- Full launch: **November 4, 2026, 3:00 p.m. PST**. [2] (Windows Central's press summary and a Blizzard article both list "3:00 p.m. PDT" instead of PST for the same timestamp — treat the exact minute as settled but the PST/PDT label as a minor sourcing inconsistency; November 4 is after the U.S. shifts back to standard time, so **PST is correct**.) [1][2]
- Beta access is **gated behind paid upgrade editions**, not included with a base subscription: the Skyborne Epic Pack and the Warcraft Forever Collection both include beta access; the cheaper Skyborne Heroic Pack does not. Invite-a-Friend launch codes are separate and only cover the Nov 4–11 launch window, not the beta. [2]
- As of today (2026-09-25) the beta has been live for 8 days; the addon-dev sources below (build 1.60.1.69893–1.60.1.69913) are from beta week 1.

## Ruleset

**RETRIEVED** (Warcraft Wiki, fetched directly): [4]
- **Permanent level cap: 60.** Progression is meant to stay at 60 indefinitely — new content is lateral (new zones, dungeons, raids, systems), not cap-raising.
- **Server structure:** one "mega-realm" per ruleset per region — **Normal, PvP, RP, and Hardcore.**
- Character identity: first and last names are enabled (new for a Classic-style client).
- Graphics: reworked lighting, global illumination, volumetric fog, god rays, improved water and shadows, and an **SD/HD model toggle** — this runs on a modern rendering pipeline even though the ruleset/content design is vanilla-era.

## How it differs from Classic Era

Sourced from Blizzard's own article, Wikipedia, and Warcraft Wiki — the three disagree on exact counts in places, both are recorded below with the disagreement flagged.

| Area | Classic Era | WoW: Forever |
|---|---|---|
| Level cap | 60, frozen at patch 1.15.x content | 60, permanent by design, new lateral content instead of new caps |
| New race | none | **Skyborne** — Wikipedia calls them "Skyborne Elves"; Blizzard's own article and Warcraft Wiki just say "Skyborne," described as a new neutral race available to both factions. Treat "Skyborne" as the confirmed name and the "Elves" qualifier as REPORTED/unconfirmed by the primary source. [1][3][4] |
| New race-class combos | none (locked to 1.12 combos) | Wikipedia names two explicitly: **Forsaken Paladins, Dwarf Shamans**. Warcraft Wiki says **six new combinations total** (marked with a "Forever" icon in-game) — the two lists aren't reconciled by any source fetched this session. [3][4] |
| New zones | none | Warcraft Wiki names **four**: Mount Hyjal, Riverglades, Shen'dralas, Zephras Isle. Wikipedia's summary says "three new zones" without naming them. Treat Warcraft Wiki's named list as more reliable (it's more specific) but note the count conflict. [3][4] |
| Zone rework | none | Existing zones expanded/altered — e.g., Dalaran relocated into the Alterac Mountains. [4] |
| New quests | none | 1,000+ new quests. [3][4] |
| New dungeons | none | 9 new dungeons, spanning roughly levels 13–60. [4] |
| New raids | none | 2 new raids (10-player and 20-player sizes — Classic-style fixed raid sizes, not Retail's flexible raid). [4] |
| New battleground | none | Darkspear Islands. [4] |
| Talents | Unchanged 1.12 talent trees | Same Classic-style tree shape (same row count), same 1-point milestone talents at 11/21/31, **plus a new 16-point milestone**. Some talents are untouched from 1.12; others rebalanced. Several talent-locked class buffs are now **baseline**, no longer requiring a talent point: Divine Spirit, Blessing of Kings, Improved Mark of the Wild are named examples. [Wowhead search summary — REPORTED, not independently fetched] |
| Class abilities | Unchanged | New baseline abilities per spec, e.g. Paladins gain **Holy Strike** at level 6 (instant Holy-damage weapon strike, 12s cooldown). Design philosophy per Blizzard: "give each specialization new tools while preserving meaningful gaps in the class toolkit." [REPORTED — Wowhead search summary of the Deep Dive Panel Recap, not independently fetched] |
| Progression/account systems | Character-bound only | New **Legacy system**: an account-wide progression currency. Up to 16 points spendable per character at launch; points earnable from leveling (3), tradeskills (6), PvP (12), Adventure (2), and Dungeons/Raids (6) — up to 29 earnable per character without rolling an alt. [REPORTED — Wowhead search summary of "Get to Know the Legacy System," not independently fetched] |
| Camping system | none | New — details not retrieved this session. |
| Collections | none | Account-wide transmog/mount/companion collections (a Retail-style QoL feature grafted onto the vanilla ruleset). [4] |
| Housing | none | Cosmetic player housing/decor. [1] |

**Net read for a coach:** Forever is mechanically closer to Classic Era than to Retail (fixed-size raids, no LFR/flexible scaling implied, talent trees not the modern talent-tree-2.0 system), but its **client, UI, and addon API are modern** (see Technical details below) and it carries several Retail-derived QoL systems (Collections, Legacy meta-progression, housing). A player moving between Classic Era and Forever will recognize the world and rotation shape; a player moving between Retail and Forever will recognize the UI chrome and some systems but not the talent or raid-size model.

## Official announcement & patch notes

**RETRIEVED/REPORTED mix:**
- Primary announcement: "Carve a New Path with World of Warcraft: Forever," news.blizzard.com, article 24302093. [1] (fetched directly)
- Pre-purchase/editions/dates: news.blizzard.com article 24301508. [2] (fetched directly)
- "World of Warcraft: Forever Deep Dive Panel Recap," news.blizzard.com article 24303313 — talent/class/legacy detail. [REPORTED, found via search, not independently fetched this session]
- "Get to Know the World of Warcraft: Forever Legacy System," news.blizzard.com article 24307383. [REPORTED, same caveat]
- Beta patch/dev notes are posted on the official forums on a roughly weekly cadence during beta (per a Wowhead news search result referencing "beta development notes for this week" covering a cooldown manager, class changes, and respec costs) — a coach should check the official EU/US forum "WoW: Forever Beta Discussion" subforum for the latest, since this is a live beta and tuning is changing weekly. [REPORTED]

## Talent calculators and wikis

**RETRIEVED (existence confirmed via direct fetch of wowhead.com/forever, and via search):**
- **Wowhead Forever hub:** wowhead.com/forever — news and guides index for Forever specifically. Content is thin as of this session (still building out; beta is one week old). [5]
- **Wowhead Forever Talent Calculator:** wowhead.com/forever/talent-calc, with per-class subpages (e.g., wowhead.com/forever/talent-calc/hunter). [confirmed present in search results, not independently loaded]
- **Warcraft Wiki (warcraft.wiki.gg) has a dedicated World_of_Warcraft:_Forever page** — the most detailed single-page summary found this session. [4]
- **classicwowforever.com** — a fan-run guide site specifically for Forever, with addon-API-compatibility guidance (used above for the interface-16001/build-number detail). Treat as a guide site, not primary. [6]
- A cluster of "boosting/guide farm" sites (timesaver.gg, wowsod.pro, lfcarry.com, frostyboost.com, pewpewshop.pro, wowguide.net) are already publishing "Forever vs Classic vs Retail" comparison posts. These read as SEO/affiliate content farms, not established guide authorities (unlike Icy Veins/Wowhead/Maxroll) — use only to cross-check, never as a sole source. Flagged low-trust per the brief's source-order rule.

## Community hubs

**Mixed confidence.** The official Blizzard forums (both EU and US) have a live "WoW: Forever Beta Discussion" / "World of Warcraft: Forever General Discussion" subforum — confirmed by direct thread URLs surfaced in search (a SavedVariables bug report thread, an install-troubleshooting thread, and a "Beta download simplified" thread). [REPORTED, thread existence via search, not fetched] A search for a dedicated subreddit or Discord did not turn up a clearly-official one; the top hit ("Warcraft Forever" Discord at discord.me/warcraftforever) reads as a general community server that also covers private-server projects (Turtle WoW, Ascension) and is **not confirmed to be Blizzard-official or Forever-specific**. Treat community-hub identification as an **open question** — see below.

## Technical details relevant to a coaching/addon-reading agent

**RETRIEVED/REPORTED:**
- **TOC interface number: 16001.** Confirmed independently by three separate addon-developer GitHub PRs (DeModal #50, RPGLootFeed #617, wow-instant-messenger #292/#291) that all target "WoW Forever, Interface 16001," and by classicwowforever.com's own addon-compatibility guide. [6][8][9][10]
- **Client build:** 1.60.1.x (e.g., 1.60.1.69893 as of a Sept 21 dev report; 1.60.1.69913 per an EU bug-report thread). This is the version string addons should gate on in addition to the interface number. [6][11]
- **Client folder / executable:** `...\World of Warcraft\_classic_beta_\WowB.exe` — confirmed via Blizzard's own forum threads on installing the beta (surfaced via search, not independently fetched). This matches Blizzard's established naming convention (`_retail_`, `_classic_era_`, `_classic_`, `_ptr_`, `_beta_`-suffixed folders for public test/beta clients) — the task's premise that Forever ships with a `_classic_beta_` client folder is **confirmed**. [16]
- **Client architecture:** Forever reports interface 16001 (a Classic-progression-style number) but **runs on the modern client and modern addon API surface**, not the legacy Classic Era API. It "rides the wow_classic progression line but shares Mainline's UI architecture" per classicwowforever.com. Practically: an addon written for Classic Era will not just work by relabeling its TOC — Forever needs its own build. Concretely-documented API changes from Classic Era: profession calls moved to a namespaced trade-skill interface, tooltip callback registration changed, and some chat/unit-identity values are now restricted in certain contexts (echoes of Retail's "secret values" tainted-execution-path security model — see the Midnight API-changes section below; Forever appears to have inherited some of the same modern-client restrictions). [6]
- **No combat-log-specific restriction was found documented for Forever** in this session's searches — the addon-compatibility guide fetched did not mention combat-log API changes for Forever specifically. This is an **open question**: does Forever inherit Midnight's boss/M+ combat-log addon lockout (see Part 2), or does it run the older, unrestricted Classic-style combat log API? Not confirmed either way this session.

## What this means for a coaching agent

- If the player's addon reports **interface 16001** or their client path contains **`_classic_beta_`**, they are playing **WoW: Forever beta**, not Classic Era, not Retail, and not any Classic progression realm. Do not apply Classic Era leveling/BiS/talent assumptions unmodified — Forever's talent trees, baseline buffs, and new abilities diverge from 1.12.
- This is pre-launch beta software (one week old as of 2026-09-25, live through Oct 21). Tuning, talents, and even bugs (e.g., the SavedVariables-reset bug reported on the EU forums) are changing weekly. Any specific number or talent value should be treated as **VOLATILE** and re-checked, not memorized.
- Full launch is Nov 4, 2026 — six weeks from today. A knowledge pack finalized before then should expect meaningful changes between beta and launch.

---

# Part 2 — Every WoW flavor live on 2026-09-25

## Summary table

| Flavor | Level cap | Current content | Client interface | Status |
|---|---|---|---|---|
| Retail (Midnight) | 80 | Patch 12.1, Season 2 (since Aug 18, 2026); 12.1.5 expected ~Oct 6; 12.2 "Eclipse" announced at BlizzCon | modern (`_retail_`) | Live, actively patched |
| Classic Era | 60 | Frozen vanilla content, patch 1.15.x (1.15.9, July 2026) | `_classic_era_` | Live, permanent, light patches |
| Hardcore (permanent) | 60 | Same 1.15.x content as Era, permadeath ruleset, BGs disabled | `_classic_era_` (Hardcore realms) | Live, permanent, does not progress into TBC |
| Burning Crusade Classic Anniversary | 70 | Phase 3 of BC Anniversary (Black Temple / Mount Hyjal live since Summer 2026; Zul'Aman due Autumn 2026) | `_classic_` (progression) | Live, progressing |
| Season of Discovery | 60 | Phase 8 "Scarlet Enclave" (final phase, since Apr 2025) — maintenance mode, no new phases planned | `_classic_era_` (SoD realms) | Live, not shutting down, but content-frozen |
| Mists of Pandaria Classic | 90 | Phase 5 "Siege of Orgrimmar" + Timeless Isle (final MoP phase, since June 2, 2026) | `_classic_` (progression) | Live; what comes next (WoD Classic vs. wind-down) is **unannounced** as of this session |
| World of Warcraft: Forever | 60 (permanent) | Beta (Sept 17 – Oct 21, 2026); launches Nov 4, 2026 | 16001, `_classic_beta_` | Beta live now |

Notes on realm-group identity: Cataclysm Classic is **not** separately selectable anymore — those realms were converted in place into Mists of Pandaria Classic realms when the MoP pre-patch shipped (~July 2025); there is one continuous "Classic progression" realm group that has already passed through Cata. [REPORTED] Similarly, the Anniversary realm group (launched Nov 21, 2024) is a **second, separate** progression line from the original 2019 Classic-progression realms — Anniversary is the one currently in Burning Crusade; the older 2019-era realm group is the one currently in Mists of Pandaria. A coach should ask **which realm/realm-group** the player is on, not just "which expansion," because two different realm lineages are mid-Classic-progression simultaneously.

## Retail — World of Warcraft: Midnight

**RETRIEVED/REPORTED.** Midnight is the 11th expansion, 2nd chapter of the "Worldsoul Saga" (after The War Within, before The Last Titan), released March 2, 2026. [search summary]
- **Current patch: 12.1** (released ~Aug 11, 2026), with **Season 2** starting a week later (Aug 18, 2026). New raid: **Venomous Abyss** (8 bosses, final boss Ula'tek). New zone: Coiled Isle. New M+ dungeon: Altar of Fangs (added to the Season 2 rotation).
- **12.1.5** expected ~Oct 6, 2026 (story chapter "The Promise of Tomorrow," Aqir Invasion world events in Eversong Woods/Zul'aman) — this is after this file's fetch date, treat as forward-looking/VOLATILE.
- **12.2 "Eclipse"** was revealed at BlizzCon 2026 (Sept 12): new dungeon, zone, raid, lair, delves, a new legendary caster blade, and — notably — **paladin becomes available to Forsaken, night elves, and trolls**, plus housing updates. Not live yet as of 2026-09-25.
- **Hero talents:** still an active, core system in Midnight — unlocked at level 71, one point per level, each spec choosing between two hero trees. **Not removed**, contrary to any assumption a coach might carry from older training data. [search summary — REPORTED]
- **Delves:** persisted from The War Within into Midnight. Companion **Brann Bronzebeard** can now tank or heal (not just DPS-support), tiers run roughly 4–11, Season 2 added three new delves on the Coiled Isle (Ring of Glory, Gnarldor Isle, Venomfall Deeps). [REPORTED]
- **PvP:** Training Grounds and a 40v40 battleground "Slayer's Rise" are Midnight's marquee PvP additions, both still active in Season 2. [REPORTED]
- **A known bug**, unresolved as of an April 2026 report: advanced-combat-log healing numbers under-report for some healer specs (Mistweaver, Holy Paladin named) vs. the in-game UI; DPS/tank logging is unaffected. A coach cross-referencing a healer's WCL/log-derived HPS against in-game meters should know the log may read low for reasons unrelated to player performance. [REPORTED, Blizzard had not acknowledged as of that report]

### Addon / combat-log restrictions in Midnight (relevant to a mentor reading logs, not playing live)

This is the single most consequential technical change for a coaching agent to understand, and the brief specifically flagged it. **RETRIEVED** (Warcraft Wiki's own Patch 12.0.0/API changes page, fetched directly) plus REPORTED corroboration:

1. **What changed:** Starting in patch 12.0 (Midnight's launch patch), addons can no longer register for the raw `COMBAT_LOG_EVENT` / `COMBAT_LOG_EVENT_UNFILTERED` events during certain content — doing so throws an error. Blizzard's stated goal was to stop addons from doing real-time decision-making off combat data (i.e., stop "smart" reactive addons from playing the game for the player). [7]
2. **What replaced it:** A new `C_CombatLog` namespace (`ApplyFilterSettings`, `GetEntryRetentionTime`, `IsCombatLogRestricted`, `SetMessageLimit`) and new, more limited events (`COMBAT_LOG_MESSAGE`, `COMBAT_LOG_EVENT_INTERNAL_UNFILTERED`, `COMBAT_LOG_ENTRIES_CLEARED`, `COMBAT_LOG_REFILTER_ENTRIES`). Legacy `CombatLogGetCurrentEventInfo()` / `CombatLogAdvanceEntry()` still work. [7]
3. **Blizzard walked the restriction back partway** after launch: player/addon-dev backlash led to a scoping change — the restriction now **only applies during an active boss encounter or an active Mythic+ run**; open-world combat addons are unaffected. Private addon-to-addon communication channels are also blocked inside instances, and addons can no longer sync data with each other in real time during dungeons/raids. [REPORTED — Icy Veins fetch was blocked (HTTP 403), so this is via the search engine's summary of that article plus corroborating forum-thread titles, not an independently verified primary read]
4. **What is completely unaffected, and this is the important part for a "read the log after the pull" mentor:** the **on-disk `WoWCombatLog.txt` file is written by the game client itself, not by any addon**, so none of the above touches it. `/combatlog` (the slash command that toggles logging) and **Advanced Combat Logging** both work exactly as before. Every third-party parser that ingests `WoWCombatLog.txt` — **Warcraft Logs** included — continues to function unchanged, because they never depended on the restricted in-game addon events in the first place. [7][REPORTED]

**Practical takeaway for the mentor agent:** the design brief's model (coach reads the log after the pull, never intervenes live) is **unaffected by any of Midnight's addon restrictions**, because those restrictions target live, in-combat addon decision-making — exactly the thing this agent is designed never to do. `WoWCombatLog.txt` remains the correct, fully-supported data source regardless of version (Retail, Classic Era, or Forever).

**The event names a log-reading coach still relies on are unchanged by any of this.** The restriction is about live addon *registration* for raw combat-log events during encounters — it does not rename, remove, or alter the event types written to the file. A mentor slicing `WoWCombatLog.txt` should still expect the same vocabulary across every flavor in this document (Retail, Classic Era, Anniversary, SoD, MoP Classic, and — pending confirmation, see Open Questions — Forever):
- `SPELL_CAST_SUCCESS` — proves an ability was actually cast (use it to disprove "I used my interrupt," or to establish an ability was off cooldown and available for an omission finding).
- `SPELL_AURA_APPLIED` / `SPELL_AURA_REMOVED` (and `_DOSE`/`_REFRESH` variants) — buff/debuff uptime; the basis for "you let a defensive/HoT/interrupt-debuff lapse for N seconds."
- `SPELL_INTERRUPT` — proves a cast was successfully interrupted, and by what; absence of one across a boss's known cast windows is the evidence for a missed-interrupt finding.
- `UNIT_DIED` — the death event itself; combine with the preceding `SPELL_DAMAGE`/`SWING_DAMAGE` lines for a death autopsy (this matches the mentor's own `--death` slicer window, see `AGENTS.md`).
- `SPELL_DAMAGE` / `SWING_DAMAGE` / `SPELL_PERIODIC_DAMAGE` — the damage-taken timeline; spikes here are what a "stood in the bad thing" finding is built from (position fields, when present under Advanced Combat Logging, corroborate it).
- `SPELL_HEAL` / `SPELL_PERIODIC_HEAL` — healer throughput; cross-check against the Midnight healing-underreport bug noted above before blaming a player for low HPS.
- `COMBATANT_INFO` (Advanced Combat Logging only) — per-player gear/talent snapshot at encounter start; this is what advanced logging adds beyond the base log, and it's what a talent/build review should be sourced from rather than the player's self-report.
Every log opens with a `COMBAT_LOG_VERSION` line; the mentor's own slicer instructions already say to note it and skip unrecognized event types rather than guess (`AGENTS.md`, review step 3) — treat a version-number jump as the signal that a new flavor/patch changed the log schema, and re-verify assumptions rather than assuming continuity.

### Quick version-identification checks

A coach that receives a context block or a log slice but isn't told which flavor it's from can usually tell from cheap signals, cross-referencing Part 2's table:
- **TOC interface number 16001**, or a client path containing `_classic_beta_` → **WoW: Forever** (beta as of this writing). Do not apply Classic Era talent/BiS assumptions unmodified.
- **Level cap reported by the character context is 60** but the zone/quest content includes Forever-only zones (Riverglades, Shen'dralas, Zephras Isle) or the **Skyborne** race → **WoW: Forever**, not Classic Era.
- **Level cap 60, vanilla zones only, no rune abilities** → **Classic Era** or **Hardcore** (check realm name against Doomhowl/Soulseeker, or ask — Hardcore has BGs disabled, which is a cheap behavioral tell).
- **Level cap 60, rune-granted abilities present** (character has spells that don't exist in vanilla, e.g. class abilities gained from a rune slot) → **Season of Discovery**.
- **Level cap 70, Outland content** → **Burning Crusade Classic Anniversary**.
- **Level cap 90, Pandaria/Timeless Isle content** → **Mists of Pandaria Classic** (the 2019-era realm group; note this is the same lineage that already passed through Cataclysm).
- **Level cap 80, hero talent trees present, Coiled Isle/Midnight zones** → **Retail (Midnight)**.

## Classic Era

**REPORTED**, cross-checked across two independent sources (Warcraft Wiki and a search-engine summary of community guide sites):
- Permanent level-60 realms running frozen patch-1.12-era vanilla content, currently on client patch **1.15.9** (July 2026), which added Edit Mode and new nameplate/raid-frame UI options.
- No progression, no new phases — this is the "museum piece" vanilla experience, distinct from both Anniversary (which progresses) and Season of Discovery (which had a phased content plan).

## Hardcore

**REPORTED:** Hardcore is a **separate, permanent ruleset**, not tied to Anniversary. One life, delete-on-death; Battlegrounds and Battlemasters are disabled entirely (no BG-farming your way to XP or gear on a permadeath character). Runs the same 1.15.x patch line as Classic Era (got 1.15.9 too). Named dedicated realms: **Doomhowl (NA)**, **Soulseeker (EU)**. Does **not** progress into TBC. A related but distinct detail: the Hardcore *Anniversary* realms (the permadeath option that existed on the Anniversary realm launch) did **not** progress into Burning Crusade with the rest of Anniversary — those Hardcore-Anniversary characters/realms folded into the permanent Era-side Hardcore realms instead, while non-Hardcore Anniversary characters moved on to BC content. A coach should ask specifically whether a "Hardcore" player is on Doomhowl/Soulseeker (permanent) since that's now the only live Hardcore option.

## Burning Crusade Classic Anniversary

**REPORTED:** The Anniversary realm group (launched Nov 21, 2024 for WoW's 20th anniversary) progressed out of vanilla and into **Burning Crusade Classic** on Jan 13, 2026, with the TBC-specific content phase-in starting Feb 5, 2026 (all Outland zones/quests) and raids opening Feb 19, 2026.
- **Phase 1:** Karazhan, Gruul's Lair, Magtheridon's Lair; Arena Season 1 live from expansion launch.
- **Phase 2 (Spring 2026):** Serpentshrine Cavern, Tempest Keep (each gated behind its own attunement chain).
- **Phase 3 (Summer 2026 — current as of this session):** Black Temple, Battle for Mount Hyjal; earlier raid attunement requirements relaxed for catch-up.
- **Phase 4 (Autumn 2026, upcoming):** Zul'Aman, a 10-player catch-up raid.
- Level cap: 70.

## Season of Discovery (SoD)

**REPORTED**, cross-checked across Warcraft Wiki and multiple guide-site summaries, consistent across all:
- **Still running as of 2026-09-25.** In **maintenance mode**: Phase 8 "Scarlet Enclave" (launched April 8, 2025) is confirmed as the **final** content phase — Blizzard's WoW Classic developer Josh Greenfield confirmed on June 29, 2026 there are no plans for fresh SoD servers, and no new-phase announcement has followed. Realms remain online and fully playable with no announced shutdown date.
- Level cap: 60 (SoD never raised the cap beyond vanilla's 60, despite its own leveling/rune/talent overhaul).
- **Key systems a coach must know:** SoD's defining mechanic is the **rune system** — class-defining abilities socketed via discoverable runes (not present in any other Classic flavor), plus reworked class leveling content and **new world buffs** distinct from vanilla's (e.g., "Might of Stormwind," added Phase 4, as the Alliance-side equivalent to the Horde's "Warchief's Blessing"). The Phase 8 "Scarlet Enclave" raid is unique to SoD (level 60, 20–40 player flexible-size, 8 bosses, grants a "Resilience of the Dawn" buff to all raid participants).
- Because Blizzard explicitly announced WoW: Forever alongside SoD's news cycle and both are being compared heavily in guide content, be careful not to conflate them: **SoD is not shutting down and nothing ties its servers to the Forever launch** — they are two separate, simultaneously-live products.

## Mists of Pandaria Classic

**REPORTED**, Warcraft Tavern + Blizzard Watch cross-checked:
- **Phase 5, "Siege of Orgrimmar,"** launched worldwide June 2, 2026 (raid opened June 4). This phase also added the Timeless Isle zone (5 world bosses), the Emperor Shaohao faction, the conclusion of the class legendary questline, Celestial-dungeon buffs, and Proving Grounds PvP Season 14.
- Warcraft Tavern's own coverage frames Phase 5 as sending MoP Classic "off into the sunset," implying it is the **final** planned MoP phase, though no source found this session has Blizzard stating that in so many words.
- **What's next is an open question.** As of this session, Blizzard has not announced whether these realms progress into Warlords of Draenor Classic or wind down; BlizzCon 2026 (Sept 12) — which already happened this month and was where WoW: Forever was announced — was speculated as the likely venue for a WoD Classic reveal, but the searches performed this session did not surface a confirmation either way. **Flag this explicitly to the mentor agent as unresolved** rather than assuming WoD Classic is coming.
- Level cap: 90.
- Realm identity note (repeated from the summary): this is the **original 2019 Classic-progression realm group**, which already absorbed the former Cataclysm Classic realms when they converted in place (~July 2025) — there are no standalone Cataclysm Classic realms left to distinguish.

## Other things checked and ruled out / not found

- **No evidence of an active seasonal side-mode** (e.g., a Plunderstorm-style limited event) beyond the flavors above was found this session — not specifically searched exhaustively, flagged as an open question rather than a confirmed "none."
- **Cataclysm Classic** as a standalone selectable flavor: confirmed **not** live — folded into MoP Classic (see above).

---

# Part 3 — Per-version authoritative sources

| Flavor | Primary/official | Wiki/database | Guide sites (current) | Calculators/tools | Stats/logs |
|---|---|---|---|---|---|
| Retail (Midnight) | news.blizzard.com, in-game PTR notes | warcraft.wiki.gg, Wowhead (wowhead.com main site + /ptr) | Icy Veins, Maxroll.gg (maxroll.gg/wow), Method (method.gg), Warcraft Tavern | Wowhead talent calc, Maxroll build guides | Warcraft Logs, raider.io (M+), Archon.gg, check-pvp.fr (PvP gear/talents) |
| Classic Era | news.blizzard.com (patch notes) | warcraft.wiki.gg, Wowhead (wowhead.com/classic) | Icy Veins (icy-veins.com/wow-classic), Warcraft Tavern | Wowhead classic talent calc | Warcraft Logs (Classic section), Murlok.io |
| Hardcore | Blizzard forums (permadeath ruleset notes) | warcraft.wiki.gg | Icy Veins, community Hardcore-specific guide sites (lower-trust: verify against wiki) | same as Classic Era | Warcraft Logs, HC-specific death trackers (not verified this session) |
| BC Classic Anniversary | news.blizzard.com | warcraft.wiki.gg (Classic 20th Anniversary Edition page), Wowhead | Warcraft Tavern (dedicated TBC-Anniversary roadmap coverage), Icy Veins, Blizzard Watch (news/roadmap analysis, not a guide site but reliable for dates) | Wowhead TBC-classic talent calc | Warcraft Logs |
| Season of Discovery | news.blizzard.com, official SoD patch-note posts (see bluetracker.gg mirror) | warcraft.wiki.gg (dedicated SoD page + per-phase raid pages) | Warcraft Tavern, Icy Veins | SoD-specific rune/talent planners (Wowhead hosts one under the SoD section) | Warcraft Logs (SoD section) |
| Mists of Pandaria Classic | news.blizzard.com | warcraft.wiki.gg (dedicated MoP Classic page) | **Wowhead (wowhead.com/mop-classic)**, **Method (method.gg/mop-classic)**, Warcraft Tavern (warcrafttavern.com/mop), Icy Veins (icy-veins.com/mists-of-pandaria-classic) | Wowhead MoP talent calc, wowtbc.gg raid-comp planner | Warcraft Logs, ironforge.pro (population tracking) |
| WoW: Forever | news.blizzard.com (official, primary for this pre-launch product), official EU/US beta forums | **warcraft.wiki.gg** (most complete single-page summary found), Wowhead (wowhead.com/forever, still thin as beta is 1 week old) | classicwowforever.com (Forever-specific, addon/API focus); treat timesaver.gg/wowsod.pro/lfcarry.com/frostyboost.com/pewpewshop.pro/wowguide.net as low-trust SEO/boosting content, cross-check only | Wowhead Forever talent calculator (wowhead.com/forever/talent-calc) | Not yet established — too new; Warcraft Logs' Classic-parsing infrastructure would plausibly extend to Forever's log format but this was not confirmed this session |

General notes:
- **Wowhead** is effectively the only site with dedicated, separately-maintained sub-sites per flavor (`/classic`, `/mop-classic`, `/ptr`, `/forever`, `/classic-ptr`) — when in doubt about which page is "for" which version, check the URL prefix.
- **Warcraft Wiki (warcraft.wiki.gg)**, not Wowpedia, is the actively-maintained community wiki as of this session — it's what every wiki link resolved to across every search this session. If older material references "Wowpedia," treat warcraft.wiki.gg as its successor.
- **Blizzard Watch** is not a guide site (no BiS lists, no talent calculators) but was consistently the clearest source for phase/patch **dates and roadmaps** across every Classic flavor this session — useful for a coach that needs "what phase are we in" rather than "what build should I run."
- **Warcraft Logs** is version-agnostic: it parses `WoWCombatLog.txt`, which every flavor writes in the same underlying way (per Part 2's addon-restriction section), so it is the correct stats/log tool regardless of which flavor the player is on.

---

## Sources

1. https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever — Blizzard's primary WoW: Forever announcement. Fetched directly.
2. https://news.blizzard.com/en-us/article/24301508/pre-purchase-world-of-warcraft-forever-upgrades-and-begin-your-next-journey-in-azeroth — Blizzard's edition/pricing/beta-and-launch-date article. Fetched directly.
3. https://en.wikipedia.org/wiki/World_of_Warcraft:_Forever — overview, dates, differences-from-Classic summary. Fetched directly.
4. https://warcraft.wiki.gg/wiki/World_of_Warcraft:_Forever — most detailed single-page summary (codename Camelot, ruleset, zones, systems). Fetched directly.
5. https://www.wowhead.com/forever — Forever news/guide hub. Fetched directly; content still thin (beta is 1 week old).
6. https://classicwowforever.com/guides/wow-forever-addons-api-compatibility/ — Forever-specific addon/API guide; source for interface 16001, build 1.60.1.69893, API differences from Classic Era. Fetched directly.
7. https://warcraft.wiki.gg/wiki/Patch_12.0.0/API_changes — Midnight's combat-log/addon API change list (COMBAT_LOG_EVENT restrictions, C_CombatLog namespace). Fetched directly.
8. https://github.com/nezroy/DeModal/pull/50 — addon PR confirming "WoW Forever Classic Beta (Camelot, Interface 16001)." Via search, not independently opened.
9. https://github.com/McTalian-WoW-Addons/RPGLootFeed/pull/617 — addon PR confirming interface 16001. Via search.
10. https://github.com/Legacy-of-Sylvanaar/wow-instant-messenger/pull/292 — addon PR confirming interface 16001 support. Via search.
11. https://eu.forums.blizzard.com/en/wow/t/forever-beta-160169913-savedvariables-fail-to-load-on-client-startupreload/629888 — confirms build 1.60.1.69913, confirms official EU beta-discussion subforum exists, and a live SavedVariables bug. Via search.
12. https://www.wowhead.com/forever/talent-calc — Forever talent calculator, existence confirmed via search listing.
13. https://news.blizzard.com/en-us/article/24303313/world-of-warcraft-forever-deep-dive-panel-recap — talent/class-design detail (Holy Strike, milestone talents, baseline buffs). Via search summary, not independently fetched.
14. https://news.blizzard.com/en-us/article/24307383/get-to-know-the-world-of-warcraft-forever-legacy-system — Legacy system point breakdown. Via search summary, not independently fetched.
15. Blizzard US forums, "How to Install the Beta" thread — source for the `_classic_beta_\WowB.exe` client path. Via search synthesis.
16. https://blizzardwatch.com/2026/09/09/wow-patch-12-1-5-release-date/ — Midnight 12.1.5 expected date. Via search.
17. https://www.warcrafttavern.com/news/wow-midnight-patch-12-2-eclipse-revealed-at-blizzcon-2026/ — Patch 12.2 Eclipse reveal. Via search.
18. https://en.wikipedia.org/wiki/World_of_Warcraft:_Midnight — Midnight expansion release date and saga context. Via search.
19. Icy Veins, "Combat Addon Restrictions Eased in Midnight" (icy-veins.com/wow/news/combat-addon-restrictions-eased-in-midnight) — restriction walk-back, scoped to boss/M+ only. Direct fetch returned HTTP 403; used via search-engine summary only — lower confidence, flagged in text.
20. WowCoach.gg, "How to Enable Combat Logging in WoW Midnight" — /combatlog usage. Via search.
21. https://www.warcraftlogs.com/ + search summary — confirms WCL is unaffected by the addon API restrictions since it reads the on-disk file. Via search.
22. EU Blizzard forums, "Healing data mismatch: In-game UI/Addons vs. Advanced Combat Log in Midnight" — healer logging-underreport bug. Via search.
23. https://massivelyop.com/2026/08/28/casually-classic-what-clues-did-season-of-discovery-hold-for-wow-classic-plus/ — SoD/Classic+ context. Via search.
24. https://warcraft.wiki.gg/wiki/World_of_Warcraft_Classic:_Season_of_Discovery — SoD overview, phase 8, level cap. Via search summary.
25. https://blizzardwatch.com/2026/01/29/wow-classic-mists-pandaria-phases/ — MoP Classic phase roadmap/dates. Via search.
26. https://blizzardwatch.com/2026/05/13/mists-pandaria-phase-5-siege-orgrimmar-timeless-isle/ — Phase 5 content and date. Via search.
27. https://warcraft.wiki.gg/wiki/World_of_Warcraft:_Mists_of_Pandaria_Classic — MoP Classic general reference. Via search.
28. Icy Veins, "Mists of Pandaria and Burning Crusade Classic 2026 Roadmaps" (icy-veins.com/mists-of-pandaria-classic/news/...) — confirms Cataclysm Classic realms converted into MoP Classic realms ~July 2025. Via search.
29. https://blizzardwatch.com/2026/01/29/burning-crusade-classic-anniversary-phase-release-dates/ — TBC Anniversary phase dates. Via search.
30. https://warcraft.wiki.gg/wiki/World_of_Warcraft:_Classic_20th_Anniversary_Edition — Anniversary realm structure and Hardcore-Anniversary carve-out. Via search.
31. Blizzard Watch, "How to choose which version of WoW Classic is best for you" (blizzardwatch.com/2025/12/10) and "Our best guess at the upcoming expansion timelines for each WoW Classic mode" (2026/04/21) — cross-check for realm-group identity and MoP "what's next" uncertainty. Via search.
32. Icy Veins, "Brann Bronzebeard (delve companion) guide" + Warcraft Wiki's Brann_Bronzebeard_(delves) page — delve system persisting into Midnight, tank/heal roles, tier range. Via search.
33. pewpewshop.pro, "Hardcore in WoW: Forever — What Has Been Announced" and related boosting-guide-site posts (timesaver.gg cluster, wowvendor.com, skycoach.gg) — used only for cross-checking Hardcore/SoD/PvP-season claims already corroborated elsewhere; flagged throughout as low-trust guide-farm content per the brief's source-order rule, never used as a sole source.

## Open questions

1. **Does WoW: Forever inherit Midnight's boss/M+ combat-log addon restrictions**, or does it run on the older, unrestricted Classic-style combat log API? Not found in any source this session. Matters for whether Forever-specific combat addons (DBM-style, threat meters) will behave like Classic Era's or like Retail's during progression content.
2. **Exact reconciliation of the "new race-class combos" count** for Forever: Wikipedia names 2 (Forsaken Paladin, Dwarf Shaman), Warcraft Wiki says 6 total. Not reconciled.
3. **Exact reconciliation of "new zones" count** for Forever: Wikipedia says 3, Warcraft Wiki names 4 (Mount Hyjal, Riverglades, Shen'dralas, Zephras Isle). Not reconciled.
4. **Whether "Skyborne" is officially "Skyborne Elves"** or just "Skyborne" — Blizzard's own article and Warcraft Wiki use the shorter form; only Wikipedia's summary appended "Elves."
5. **No confirmed official Forever-specific community hub** (subreddit/Discord) was found — the one Discord surfaced reads as a general multi-server community, not Forever-specific or Blizzard-affiliated.
6. **What comes after Mists of Pandaria Classic** (the 2019-era realm group, currently on Phase 5/Siege of Orgrimmar) is unannounced as of 2026-09-25 — WoD Classic is speculated in guide content but not confirmed by Blizzard in any source retrieved this session.
7. **The Icy Veins "restrictions eased" article** (source 19) could not be fetched directly (HTTP 403) — its detail (scoping to boss/M+ only) rests on the search engine's summary, not a primary read. Worth re-fetching later (via cache, alternate URL, or an official Blizzard blue post directly) to upgrade this from REPORTED to RETRIEVED.
8. **Whether any seasonal side-mode (Plunderstorm-style) is currently active** was not exhaustively checked.
