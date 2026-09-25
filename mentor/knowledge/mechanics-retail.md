topic: Retail mechanics and systems (Midnight, patch 12.x)
applies-to: Retail only (World of Warcraft: Midnight). Does not apply to Classic Era/Anniversary/Hardcore, Season of Discovery, or Mists of Pandaria Classic — those run older, frozen rulesets. Called out inline where Classic differs on a shared concept (e.g. GCD, DR).
fetched: 2026-09-25
sources: 24 (listed at the end)

## 0. Version snapshot — READ THIS FIRST (VOLATILE, fetched 2026-09-25)

- Expansion: **World of Warcraft: Midnight**, the 11th expansion, 2nd chapter of the Worldsoul Saga (after The War Within, before The Last Titan). Released March 2, 2026 (early access Feb 27). [1][5]
- **Current live patch as of 2026-09-25: 12.1**, running **Midnight Season 2**. Current raid: **The Venomous Abyss** (8 bosses). Patch 12.1.5 is projected for ~October 6, 2026 based on Blizzard's 8-week cadence (adds a story chapter, a 1-boss raid "The Unbinding of Kith'ix," the first Labyrinth dungeon, and Aqir Invasion events) — RETRIEVED but the date itself is a journalist projection, not a Blizzard-confirmed date. [4]
- **Season 3 ("Eclipse," patch 12.2) is NOT live yet.** It was previewed September 14, 2026 (new M+ dungeon pool, a top-5%-of-your-spec reward tier) and is expected "early next year" (~early 2027), i.e. after this file's fetch date. Do not treat Season 3 details as current; they're included below only where explicitly marked upcoming. [7][8][9]
- Level cap: **90** (a full 10-level jump from The War Within's 80, first time an expansion has done this). [Icy Veins level-90-XP news, via search]
- **A coach should re-verify the live season/patch number before trusting anything tagged VOLATILE below** — this file will silently go stale once Season 3 launches.

## 1. Secondary stats and diminishing returns (VOLATILE — tuning numbers, fetched 2026-09-25; the DR *mechanism* is durable)

Four secondary stats: Critical Strike, Haste, Mastery, Versatility. Each stacks from gear at full value up to a per-stat rating threshold, then loses effectiveness in bands. Source: Maxroll's DR resource for patch 12.0.1, cross-checked against Wowhead's general DR explainer. [12]

| Stat | Rating per 1% | DR starts (rating / %) | Band size | Reduction per band |
|---|---|---|---|---|
| Haste | 44 | 1320 rating (30%) | 440 rating | 10% → 20% → 30% → 40% → 50%, then 50% flat to 8800, then 100% (hard cap) |
| Crit | 46 | 1380 rating (30%) | 460 rating | same progression, hard cap at 9200 |
| Mastery | 46 (varies — per-point effect differs by spec) | 1380 rating (30%) | 460 rating | same progression, hard cap at 9200 |
| Versatility | 54 | 1620 rating (30%) | 540 rating | same progression, hard cap at 10800 |

Mechanism (durable, applies across expansions): DR is applied per-band, not retroactively — rating below a threshold keeps its full value; only the rating *inside* a band is discounted. So a stat "past its DR point" is still worth taking, just at reduced efficiency, not zero. Practical coaching read: DR is a soft-cap system, not a hard stat cap — never tell a player to stop stacking a stat entirely because of DR; tell them the *marginal* value dropped and to compare against the next-best stat's uncapped value (usually from a spec's SimC/stat-weights page, which already bakes DR in).

- **Mastery** converts to a unique per-spec effect (e.g., extra block chance, DoT damage, pet damage) — its raw *rating* thresholds follow the same DR curve as Crit, but its value-per-point is spec-specific and must come from that spec's own guide, not this file.
- **Versatility** does double duty: +damage/healing done AND −damage taken, at a 2:1 ratio (2% taken-reduction per point of Versatility that gives 1% damage/healing... — REPORTED ratio, standard since Legion, not re-derived this session). It has no DR effect on the damage-taken side in most expansions' implementations; treat that as INFERRED/carried-over knowledge, not reconfirmed for 12.x this session.

## 2. Tertiary stats (durable mechanism; VOLATILE value judgment)

Avoidance, Leech, and Speed roll on gear (mostly crafted/catalyst items, Delve/world content, some seasonal sources) in addition to the normal primary/secondary stat budget — they don't take a stat "slot," so they're close to free value. Same DR shape as secondaries: reduction starts at 10% at a threshold and ramps to 15%, 20%, capping around 49% (site's general tertiary-DR description; exact rating thresholds for 12.x not independently re-derived this session — REPORTED). [12]

- **Avoidance**: flat chance to fully avoid an attack. General guide consensus ranks it the strongest tertiary because it reduces damage taken from many different sources rather than one. REPORTED, guide-site consensus (icy-veins/method-style stat pages), not Blizzard-stated.
- **Leech**: passive self-heal as a % of damage/healing done on every cast — scales with a player's own output, so it gets better as the player's power grows. Valuable in M+ where raid-wide damage patterns punish everyone.
- **Speed**: movement speed increase; quality-of-life for mechanic-dodging and traversal, weakest of the three in raw throughput terms.
- Coaching takeaway: tertiary stats are a tiebreaker between items of similar primary/secondary value, never a reason to pick a worse base item.

## 3. GCD and haste scaling (durable formula; floor value confirmed for modern retail)

- Base GCD: **1.5 seconds** for most abilities.
- Formula: `GCD = max(0.75s, 1.5s / (1 + haste%))` — RETRIEVED via search synthesis of Wowhead/community GCD-mechanics threads, standard modern-retail formula (differs from older expansions like TBC where the floor was 1.0s). [Haste/GCD search]
- **100% Haste rating is needed to hit the 0.75s floor** — in practice almost no build reaches 100% raid-buffed haste from rating alone; players get close to the floor via Bloodlust/Heroism/Time Warp stacking with haste trinkets/cooldowns during burst windows, not as a sustained state.
- Haste also scales (durable, cross-expansion): auto-attack speed, DoT/HoT tick rate (without adding extra ticks unless a specific talent grants "haste adds ticks"), some ability cooldowns (channeled abilities, a subset of cooldown-reducing-by-haste abilities), and resource generation rate for some specs (e.g., combo points, runic power ticks).
- Coach check: a rotation with visible **gaps between GCDs** in the combat log (large SPELL_CAST_SUCCESS-to-SPELL_CAST_SUCCESS deltas beyond the expected GCD/cast time) is either a haste-starvation issue (stat allocation) or a play-pattern issue (player not queuing the next ability) — cross-check against the player's haste rating/DR band before blaming the rotation.

## 4. Talent trees + Hero Talents (durable system mechanics; point totals below are 12.x-current, VOLATILE if a future patch rebalances point counts)

Three-layer talent system, unchanged in structure since Dragonflight but expanded in Midnight:

1. **Class tree** — shared across all specs of a class (e.g., all Warriors share one class tree). 20 points at level 80, expanded to **23 points by level 90** in Midnight (+3 new points, levels 81-90). [official Blizzard "Level Up Your Talents in Midnight" article]
2. **Specialization tree** — spec-specific core rotation/build choices. Gains **4 new points** across levels 81-90, spent on new **Apex Talents**: a keystone node unlocking power/new mechanics, two-point nodes enhancing key abilities, and a capstone — themed around "the core fantasy of the specialization" per Blizzard's own framing (paraphrased, not quoted verbatim). [Blizzard, "Level Up Your Talents in Midnight"]
3. **Hero Talent tree** — a third, smaller tree layered on top of class+spec, introduced in The War Within and carried into Midnight. Unlocks at **level 71**, earns 1 point/level through level 80 (10 points, tree fully filled by 80), then gains **3 more points across levels 81-90** to accommodate the higher cap. Most specs choose between **2 Hero Talent trees** (Druid is the outlier with 4 available across its specs — REPORTED, not independently re-verified per-class this session). Each tree ends in a capstone ability that meaningfully changes rotation/priority (example cited: Death Knight Deathbringer's "Exterminate," making the next Marrowrend/Obliterate free after a Reaper's Mark explosion). [13][official Blizzard article]

**Import/export**: talent loadouts (class + spec + hero talents together, since they're saved as one build) use Blizzard's built-in **Talent Build String** — a base64-encoded string embedding spec ID, a tree checksum, and the selected node choices. In the talent UI: open the Loadout dropdown → Export (or right-click a saved loadout to copy its string without switching to it first) → share the string → recipient uses Import and pastes it. This has been the mechanism since Dragonflight (10.0) and is unchanged in Midnight; third-party sites (Wowhead talent calculator, Icy Veins/Maxroll build pages) generate and accept the same string format. [Hero talents/import search synthesis]

Coach checks:
- If a player's parse/log shows a capstone-defining ability essentially never used (e.g., zero or near-zero casts of a capstone-empowered spell across a pull), check their talent export string against the guide's recommended build before assuming a play-pattern mistake — it may be a build choice mismatch.
- Raid vs. M+ often warrants different Hero Talent/loadout swaps (single-target capstone vs. AoE-leaning tree); a player running one build for both is a common, log-visible inefficiency (compare capstone-adjacent ability usage against fight type).

## 5. Mythic+ — Midnight Season 2 (current, patch 12.1) — VOLATILE, all dungeon/affix specifics below are season-scoped

### Dungeon pool (8 dungeons)
Five Midnight-native dungeons: **Altar of Fangs** (new in 12.1, tight mob packing, 3 boss encounters), **Murder Row**, **Den of Nalorakk**, **The Blinding Vale**, **Voidscar Arena**. Three legacy dungeons on rotation: **King's Rest** (BfA), **Temple of Sethraliss** (BfA), **Ruby Life Pools** (Dragonflight). Season began week of August 18, 2026. [15]

**Season 3 preview (NOT live — upcoming, expected ~early 2027):** dungeon pool shifts to Uldaman: Legacy of Tyr, The Stonecore, Iron Docks, Sanguine Depths, The Underrot, Magisters' Terrace, Maisara Caverns, plus a new dungeon "Thraegar's Stand." Several returning dungeons get reworks (Uldaman shortened, Stonecore rebuilt, Iron Docks bosses under review). Do not coach against this pool until it's confirmed live. [7][9]

### Affix system, by keystone level (current season)
| Level | Affix | Effect |
|---|---|---|
| +2 to +4 | **Lindormi's Guidance** | Highlights/weakens enemies along a suggested route; also suppresses the death-penalty timer loss at these low levels (training-wheels affix). Drops off at +5. |
| +5+ | **Xal'atath's Bargain** (rotates weekly: Ascendant / Devour / Pulsar / Voidbound) | A player-facing *buff* affix rather than a dungeon-difficulty affix — framed as help, not hindrance, at this tier. |
| +7+ | **Tyrannical OR Fortified** (alternates weekly — whichever isn't active at +7 applies at +10 instead) | Tyrannical: boss-focused (bosses hit harder/have more HP). Fortified: trash-focused (more/tougher trash, less on bosses). |
| +10+ | **Both Tyrannical AND Fortified simultaneously**, permanently from here up | Full difficulty stacking. |
| +12+ | **Xal'atath's Guile** | Replaces the Bargain buff-affix slot; amplifies the death penalty to −15s per death (see below). |
[14, cross-checked against 10]

### Keystone timer, upgrades, downgrades, death penalty
- **Death penalty**: from **+4 and above**, each party-member death costs **−5 seconds** off the timer (not off attempts — WoW retail M+ has no attempt-limit mechanic; it's a running clock). At **+12+ (Xal'atath's Guile)**, this increases to **−15 seconds per death**. Below +4 (i.e., the Lindormi's Guidance range, +2/+3), the death penalty is suppressed entirely — a change from earlier seasons that used to dock time even at very low keys. [affix search synthesis, cross-checked with warcraft.wiki.gg]
- **Timed-run upgrades**: finishing under time upgrades the key: **<20% of the time buffer remaining → +1**, **20–40% remaining → +2**, **>40% remaining → +3**.
- **Untimed run**: keystone **downgrades by exactly one level** (never more, regardless of how far over time) and rerolls to a new random dungeon.
- **Depletion is forgiving in Midnight**: an untimed key does *not* drop the player below their **Resilient Keystone floor** — once a group has timed all 8 season dungeons at a given level (e.g., all at 12+), their keystone will never generate below that level again, and the floor ratchets up as they clear all 8 at higher levels. This is a meaningful season-over-season change from older "your key can free-fall" seasons — coach should not assume old M+ folklore about spiral-of-death depletion applies. [23]
- **Abandoning an in-progress run** (reset) downgrades the key by one level without changing the dungeon (lets a group retry the same dungeon at a lower level instead of rerolling).

### Seasonal rating rewards (current season numbers, VOLATILE)
1500 rating → Keystone Conqueror + "Venomous" title. 2000 → Keystone Master + Breath of Blight mount. 2500 → Keystone Hero. 3000 → Keystone Legend + Breath of Ruin mount. Top 0.1% of the ladder at season end → "Venomous Hero" title. A separate high-end "Keystone Myth" achievement exists; its exact rating cutoff was not yet announced as of this fetch. REPORTED, not Blizzard-primary-sourced this session — treat cutoffs as approximate and re-verify near season end. [rating-rewards search]

### What a coach checks in a Mythic+ log
- **Interrupts**: `SPELL_INTERRUPT` events vs. the dungeon's known interruptible-cast list (from Encounter Journal/dungeon journal, not this file) — missed interrupts on a designated "interrupt-or-wipe" cast are the single highest-value M+ coaching item. Check who had the interrupt available (off cooldown) and didn't use it vs. who didn't have an interrupt at all.
- **Stops (uptime)**: gaps in `SPELL_CAST_SUCCESS` for DPS specs longer than expected GCD/cast time, correlated against boss-ability windows — distinguish "stopped to avoid a mechanic" (correct) from "stood in melee range doing nothing" (real DPS loss) from "moved when they didn't need to" (also loss).
- **Defensives**: for tanks, are `SPELL_CAST_SUCCESS` active-mitigation casts (Shield Block, Ironfur, etc.) landing *before* the next big hit, not reactively after taking one? For all roles, are personal defensives (`SPELL_CAST_SUCCESS` on things like Ice Block, Divine Shield, Feint) used before a known one-shot mechanic (cross-reference `SPELL_AURA_APPLIED`/`SPELL_DAMAGE` spikes) rather than after a death?
- **Route/pathing**: not directly log-visible via combat events — best inferred from `SPELL_DAMAGE`/`UNIT_DIED` timestamps against known pack positions, or by asking the player; treat as secondary to interrupts/stops/defensives which are directly evidenced.
- **Deaths**: `UNIT_DIED` timestamped against the preceding 3–5 seconds of `SPELL_AURA_APPLIED`/`SPELL_DAMAGE` on that unit almost always shows the killing mechanic; cross-reference whether a defensive or healer cooldown was available and unused.

## 6. Raid — The Venomous Abyss (Midnight Season 2, current) — VOLATILE, this raid is season-scoped

- 8 bosses: Nek'zali → Entombed Sentinels / The Lost Explorers → Vashnik, Sszorak, The Twin Fangs → The Coiled Altar → Ula'tek (progression order, paraphrased from guide copy). [16][17]
- **Four standard difficulties**: LFR (Raid Finder), Normal, Heroic, Mythic — each its own lockout, each its own loot table scaling. Season 2 opened all 8 bosses on Normal/Heroic/Mythic day one (week of Aug 18, 2026); LFR staggered wing-by-wing over 4 weeks (Wing 1 week 1, Story Mode + Wing 2 week 2, Wing 3 week 3, Wing 4 week 4).
- **Mythic difficulty rules** (durable mechanic, cross-expansion): single shared weekly lockout per character — once a raid group is saved to a Mythic instance, that character cannot join a different Mythic copy of the same raid until reset; the instance ID and roster are effectively locked for the week. Fixed 20-player roster on Mythic (unlike the flexible 10-30 on Normal/Heroic).
- **Loot scaling within the raid**: back-half bosses reward meaningfully higher item level than front-half bosses on the same difficulty (cited example: Mythic drops jump from ilvl 318 on early bosses to ilvl 344 on the final two, Coiled Altar and Ula'tek) — a durable raid-design pattern (early bosses = lower ilvl floor, late bosses = ceiling loot), not unique to this tier.
- Difficulty rule of thumb for coaching: Normal/Heroic are tuned around 10-30 flexible raiders with looser mechanic tolerances; Mythic is the only difficulty with meaningfully unforgiving mechanic execution requirements (one-shot or near-one-shot punishes) and a fixed 20-player roster, which is why "Mythic raid log" review differs qualitatively from Heroic — much more of the coaching value is in *mechanic timing* rather than *uptime/damage profile*.

## 7. Delves (Midnight Season 2, current) — VOLATILE, tier ilvl numbers are season-scoped

Delves are solo/small-group (1-5 player) instanced content with a scaling tier (1-11+) and a companion NPC (Brann-style helper) that can be leveled/geared. Reward structure by tier, current season:
- Tier 3: Adventurer-track gear (ilvl ~272, Adventurer 3/6)
- Tier 4: still Adventurer track
- Tier 5: begins Veteran-track gear
- Tier 7: begins Champion-track gear
- **Tier 8** is described as the effective "standard" reward ceiling most players should target: Bountiful Coffer gives ilvl 295 Champion 2/6; a map chest or the weekly World Activities Vault slot from Delves can reach ilvl 305 Hero 1/6.
- **Tiers 9-11**: do not raise the standard Vault reward further (capped at the Tier 8 equivalent) — going higher is about challenge, achievements, and **crest** income instead of a bigger single loot ceiling.
- **Bountiful Delves progression**: after completing Rank 9 of the "Delver's Journey" track, Tier 11 Bountiful Coffers gain a chance at Hero-track gear or **Untainted Mana-Crystals**, a currency spent with an NPC ("Zah'ran") on powerful gear; Tiers 8-10 Bountiful Coffers can also drop smaller amounts of that currency. [details in section 8's crest framing]
[per search synthesis, icy-veins/wowhead/conquestcapped Delve guides]

Coaching note: Delves are the primary solo-gearing and alt-gearing path in Midnight — a coach advising a player who can't find an M+/raid group should route them here rather than treating Delves as a minor side activity.

## 8. Gearing: crests, upgrade tracks, the Great Vault (Midnight Season 2, current) — VOLATILE, currency names/ilvls are season-scoped; the *system shape* (tracks + crests + 3-row vault) has been stable since Dragonflight Season 3 and is durable

- **Upgrade tracks**: every piece of end-game gear sits on one of four named tracks — **Veteran, Champion, Hero, Myth** (low to high) — each with **6 upgrade ranks** (e.g., "Champion 2/6"). A piece's *track* determines its ilvl ceiling; its *rank* is how far along that track it's been upgraded.
- **Crests** ("Mistcrests" this season): the upgrade currency, in **5 track-locked tiers** — Adventurer, Veteran, Champion, Hero, Myth crests — each tier of crest can only upgrade gear on its matching track (an Adventurer crest can't touch a Hero-track item). **Every upgrade rank costs 20 crests**, so taking one item from 1/6 to 6/6 costs **100 crests** of that item's track-tier.
- **Great Vault**: still the familiar 3-row weekly reward structure (raid row / M+ row / world-content row, i.e. Delves + open-world activities), each row offering better rewards the more/harder content cleared that week. Season 2 change: the **raid row now pays out a full track tier above** the difficulty actually cleared, and rewards can come pre-upgraded — e.g., a Heroic-raid Vault slot can hand out 1/6 Mythic-track (ilvl 317) gear, and a Mythic-raid Vault slot can hand out a fully-upgraded 6/6 Mythic-track (ilvl 324) item outright, saving the 80 crests that last upgrade would normally cost. Only two of the three Vault rows can produce Myth-track gear at all (the exact excluded row wasn't independently confirmed this session — flag as open question).
[25][26]

Coaching implication: gearing advice in Midnight is really crest-budget advice — "what's your fastest track-appropriate crest income this week" matters as much as "what content should you run," since a correctly-tracked item with full crests invested outperforms a higher-ilvl item stuck at a low upgrade rank.

## 9. The Midnight addon/API overhaul and what it means for reading a combat log file — this is durable *system design*, not season tuning, though specific API surface details may still shift patch to patch (mark sub-claims accordingly)

### What changed, per Blizzard's own announcement
Blizzard shipped a **"Secret Values"** system: certain live combat data (health values, active debuffs, cooldown states, upcoming enemy actions) is now marked "secret" and withheld from the addon API during instanced PvE combat, even though it's still rendered visually on screen. Blizzard's own framing (paraphrased, not quoted beyond the short line below): addons can still restyle the box (resize, recolor, reposition UI elements) but can no longer see or compute on what's inside it — *"they can't ... look inside the box."* [11]

Stated rationale (Blizzard's own words, official blog): **"Addons should no longer offer a competitive advantage in WoW combat."** The target is specifically addons that make real-time decisions for the player (rotation helpers reading live combat state and telling the player what to press next), not addons in general. [11]

### What addons can no longer do (in raid/M+ instanced combat specifically — durable claim, scope caveat below)
- Read whether a specific unit has a specific debuff active, in real time, for computational use.
- Read an ability's live cooldown state to drive logic.
- Subscribe to full real-time combat-event data the way they used to — the `COMBAT_LOG_EVENT_UNFILTERED` event was removed from the live addon-accessible surface for this purpose (technical framing sourced from a third-party addon-dev GitHub issue discussing the migration, not a Blizzard doc directly — treat as REPORTED/technical-community-sourced, not primary). [21]
- **Scope**: restrictions apply specifically to instanced end-game combat — raids and Mythic+. Open-world combat and (per one source) leveling dungeons are reported as unaffected. This scope boundary is REPORTED from secondary guide sites, not independently confirmed against a Blizzard primary source this session — flag as open question if precision matters.

### What still works / what Blizzard built in as a replacement
- **Cooldown Manager**: a built-in, Edit-Mode-configurable UI element (four parts: Essential Cooldowns, Utility Cooldowns, Tracked Bars, Tracked Buffs) intended as the native replacement for WeakAuras-style cooldown/buff tracking. Supports sound alerts and text-to-speech callouts. Opt-in, with onboarding tutorials.
- **Built-in Damage Meter**: server-side-validated, native — addons like Details! still load and function but "only show what Blizzard chooses to expose," meaning some advanced third-party breakdowns may disappear even though the addon runs.
- **Boss Warnings / encounter timeline system**: native pre-fight and in-fight warnings. Boss-mod addons (BigWigs, DBM) survive but now pull their timers from **Blizzard's native encounter-timeline API** rather than computing timers themselves from raw combat-log parsing — an architecture change, not a feature loss, per the sources reviewed.
- **Assisted Highlight / one-button rotation aids**: Blizzard-provided accessibility/onboarding tools, separate from and not a replacement for the removed third-party rotation-helper addons.
- **Healer raid-frame improvements**: native UI upgrades reducing reliance on third-party raid-frame addons for healers specifically.

### The combat log file on disk — the key point for this knowledge pack
**The `/combatlog` toggle and the resulting `WoWCombatLog.txt` file are unaffected by any of the above.** The Secret Values restriction governs only what the *live addon API* can read *during* combat for real-time computation; the log file is written directly by the game client itself (not by any addon), continues to record the full detailed event stream (SPELL_CAST_SUCCESS, SPELL_AURA_APPLIED/REMOVED, SPELL_DAMAGE, SPELL_HEAL, UNIT_DIED, SPELL_INTERRUPT, etc.) exactly as before, and remains fully readable **after** combat ends. Warcraft Logs uploads and any other tool that parses the saved file (rather than hooking the live addon API) are reported to work exactly as before. This was cross-checked across an independent forum-discussion summary and a technical addon-developer GitHub issue and is consistent both times — RETRIEVED via search synthesis rather than a single primary Blizzard statement, but consistent enough across independent sources to treat as reliable. [20][21]

**Why this matters for this mentor system specifically**: the mentor's whole model — advise between pulls / review the log after combat, never live — is *exactly* the use case Blizzard's restriction was not designed to touch. A coach reading a saved WoWCombatLog.txt (or a Warcraft Logs report built from one) has the same event-level detail as always; the Secret Values change is only a constraint on tools that try to act *during* combat.

## 10. Generic role fundamentals in retail

### Tank: active mitigation
"Active mitigation" = tank cooldowns/abilities that must be manually, repeatedly used to reduce incoming damage — distinct from passive mitigation (armor, base avoidance) which is always on. Examples across specs: Shield Block/Ironfur (Warrior/Druid), Death Strike (DK), Celestial Brew (Monk). [Active Mitigation, Wowpedia; Icy Veins tanking guide]
- Durable coaching principle: a tank who uses mitigation **consistently on the same pull pattern every time** lets healers predict incoming damage and pre-plan their own cooldowns; a tank with inconsistent mitigation timing forces healers into reactive, more mana-expensive healing.
- Log check: for a tank, look at the cadence of active-mitigation `SPELL_CAST_SUCCESS` events relative to boss-ability windows (`SPELL_AURA_APPLIED` for boss buffs/debuffs signaling a big hit incoming) — mitigation cast *before* the hit lands is correct; mitigation cast only *after* a large `SPELL_DAMAGE` event (or not at all) is the coachable mistake.
- Personal defensive cooldowns (distinct from active mitigation — these are bigger, longer-cooldown "oh no" buttons) should show up in the log immediately preceding a known heavy-damage phase, not after a near-death `SPELL_DAMAGE` spike.

### Healer: mana and triage
- Mana is the healer's DPS-equivalent resource-management problem: overhealing/over-casting expensive spells early in a pull burns mana needed for a later spike, mirroring a DPS pulling cooldowns before they're needed.
- Triage principle (durable, not version-specific): stabilize the *group* (raid-wide damage, tank in imminent danger of dying) before topping off individuals sitting above a safe health threshold — a healer who tunnels on topping off one player while others sit at 50%+ is a common, log-visible mistake (compare `SPELL_HEAL` targets against `SPELL_AURA_APPLIED`/`SPELL_DAMAGE`-implied health state across the raid at the same timestamp).
- Cooldown usage should align with known heavy-damage windows (raid-wide mechanics, tank-buster chains) the same way a DPS aligns offensive cooldowns with Bloodlust — a healer cooldown (`SPELL_CAST_SUCCESS` on a major healing CD) popped on a quiet phase and unavailable for the actual spike is a direct, checkable coaching point.

### DPS: uptime and cooldown alignment with lust
- **Uptime**: percentage of the fight spent actively contributing damage (casting/attacking) vs. idle, moving unnecessarily, or interrupted by mechanics. The single most log-visible DPS fundamental — measured via gaps in `SPELL_CAST_SUCCESS`/melee-swing events beyond expected GCD/cast time.
- **Cooldown alignment with Bloodlust/Heroism/Time Warp** (the various class names for the same raid-wide haste buff, durable naming since Wrath of the Lich King, still current in Midnight): offensive cooldowns (anything that meaningfully boosts damage for a limited window) should be saved and popped to overlap with the group's lust window whenever the group's lust timing is known in advance (typically pull-start or a pre-called phase) — a DPS who lusts-and-forgets (uses their own cooldowns off-cycle from the raid's lust) is leaving a large, log-provable amount of damage on the table. Check: does the player's major cooldown `SPELL_CAST_SUCCESS` timestamp fall within the Bloodlust/Heroism `SPELL_AURA_APPLIED` window (typically the first ~40 seconds after lust, given its duration)?
- Movement discipline: unnecessary repositioning (moving when the mechanic didn't require it, or moving further than required) shows as `SPELL_CAST_SUCCESS` gaps correlated with no corresponding boss-mechanic `SPELL_AURA_APPLIED`/`SPELL_PERIODIC_DAMAGE` event forcing that movement — this distinguishes "had to move" (not the player's fault) from "chose to move" (coachable).

## 11. Common mistakes by role — quick reference (log evidence → fix)

Consolidates section 10 into a lookup table. All event names refer to what's present in `WoWCombatLog.txt` / a Warcraft Logs report built from it (see section 9 — this data is unaffected by the addon API restrictions).

| Role | Mistake | Log evidence | Coaching fix |
|---|---|---|---|
| Tank | Reactive mitigation (mitigates after a big hit, not before) | Active-mitigation `SPELL_CAST_SUCCESS` lands *after* a large `SPELL_DAMAGE` event rather than before the boss's telegraphed-hit `SPELL_AURA_APPLIED` | Teach on-cooldown mitigation usage independent of current health — treat it like a rotational ability, not an emergency button |
| Tank | Personal defensive saved too long / never used | No defensive `SPELL_CAST_SUCCESS` preceding a `UNIT_DIED` or near-death low-health window | Pre-plan defensive timing against known tank-buster casts before the pull, not reactively |
| Tank | Inconsistent pull pattern | Active-mitigation cadence varies pull-to-pull for the same boss ability | Standardize mitigation timing so healer cooldown planning is possible |
| Healer | Mana overspend early, empty during the real spike | High early-pull `SPELL_HEAL`/`SPELL_PERIODIC_HEAL` volume, then a gap or downgrade to cheaper spells right as raid-wide `SPELL_DAMAGE` spikes | Ration expensive heals; match healing spend to the damage profile, not to whoever's missing health first |
| Healer | Tunneling one target while raid sits low | `SPELL_HEAL` repeatedly on one unit while other units show sustained `SPELL_DAMAGE` with no corresponding heals | Triage: raid-wide/tank-critical stabilization before single-target top-off |
| Healer | Cooldown popped on a quiet phase | Major healing-CD `SPELL_CAST_SUCCESS` timestamp doesn't align with any nearby raid-damage spike | Map cooldowns to known heavy-damage phases in advance (from the dungeon/raid's mechanic list) |
| DPS | Low uptime | Gaps in `SPELL_CAST_SUCCESS`/melee-swing timestamps beyond expected GCD/cast time, with no corresponding forced-movement `SPELL_AURA_APPLIED` | Distinguish avoidable idle time from mechanic-forced movement; drill priority list to reduce decision latency |
| DPS | Cooldowns off-cycle from Bloodlust/Heroism/Time Warp | Major offensive-CD `SPELL_CAST_SUCCESS` falls outside the Bloodlust-family `SPELL_AURA_APPLIED` window | Hold burst cooldowns for the pre-called lust window; only pool if lust timing is genuinely unknown |
| DPS | Missed interrupt on a scripted "must-interrupt" cast | No `SPELL_INTERRUPT` against a known interruptible boss `SPELL_CAST_START`, despite the assigned interrupter being off cooldown | Confirm interrupt assignments and cooldown availability before the pull; rotate assignments if one player is consistently late |
| DPS | Unnecessary movement | `SPELL_CAST_SUCCESS` gap correlates with player repositioning but no boss mechanic `SPELL_AURA_APPLIED`/`SPELL_PERIODIC_DAMAGE` required it | Reinforce positioning discipline — stand at max safe range/melee uptime by default, only move when a mechanic requires it |
| Any | Wrong loadout for content (leftover raid build in M+ or vice versa) | Capstone-defining ability from the "wrong" Hero Talent tree barely appears in the log, or an AoE-oriented build shows in a heavily single-target fight | Check the player's talent export string against the guide's per-content recommended build (section 4) |

## Sources
1. https://warcraft.wiki.gg/wiki/Patch_12.0.0 — Midnight systems patch, dates.
2. https://www.icy-veins.com/wow/midnight-expansion-guide — expansion overview/release date.
3. https://warcraft.wiki.gg/wiki/Patch_12.0.1 — Midnight content patch.
4. https://blizzardwatch.com/2026/09/09/wow-patch-12-1-5-release-date/ — current patch (12.1) confirmation, 12.1.5 projection, Venomous Abyss as current raid.
5. https://warcraft.wiki.gg/wiki/World_of_Warcraft:_Midnight — expansion overview.
6. https://en.wikipedia.org/wiki/World_of_Warcraft:_Midnight — expansion overview/release date cross-check.
7. https://blizzardwatch.com/2026/09/14/midnight-season-3-brings-new-mythic-dungeon-pool-shakes-high-end-season-rewards/ — Season 3 preview, confirms Season 3 not yet live, patch 12.2 ("Eclipse"), ~early 2027 timing.
8. https://worldofwarcraft.blizzard.com/en-us/news/24307305 — official Blizzard Season 3 dungeon pool preview.
9. https://www.icy-veins.com/wow/news/this-is-the-mythic-dungeon-pool-for-midnight-season-3/ — Season 3 dungeon pool list.
10. https://www.wowhead.com/guide/midnight/mythic-plus-season-overview — confirms current season = Midnight Season 2, patch 12.1.0.
11. https://news.blizzard.com/en-us/article/24246290/combat-philosophy-and-addon-disarmament-in-midnight — official Blizzard article on Secret Values, addon restriction rationale, built-in replacements (Cooldown Manager, Damage Meters, Boss Warnings, Assisted Highlight).
12. https://maxroll.gg/wow/resources/stat-diminishing-returns — secondary/tertiary stat DR thresholds and rating-per-percent values, patch 12.0.1.
13. https://nexttier.pro/guide/midnight-hero-talents-overview — Hero Talent unlock level, tree count, capstone example.
14. https://warcraft.wiki.gg/wiki/Mythic+_affix — current-season affix list and keystone-level breakpoints (Lindormi's Guidance, Xal'atath's Bargain/Guile, Tyrannical/Fortified).
15. (via search) https://timesaver.gg/blog/wow-midnight-season-2-mythic-plus-dungeon-pool and https://accountshark.net/blog/wow-midnight-season-2-mythic-plus-dungeons-rewards — Season 2 8-dungeon pool.
16. https://www.wowhead.com/guide/midnight/raids/the-venomous-abyss-overview-location-rewards-bosses — raid overview.
17. https://koroboost.com/guide/midnight-venomous-abyss-raid-guide (via search synthesis) — boss list, difficulty/loot details.
18. https://www.parsepal.gg/blog/addon-restrictions-midnight — attempted fetch, page did not return usable body content this session; not relied on beyond title.
19. https://www.elyxir.gg/news/world-of-warcraft/wow-retail-and-forever-addon-restrictions-explained-for-midnight — addon-by-addon breakdown (Details!, BigWigs/DBM survival with architecture change).
20. (via search synthesis, multiple sources including Blizzard forum thread "Is Warcraft logs going to die in Midnight?") — confirms WoWCombatLog.txt/Warcraft Logs unaffected by Secret Values.
21. https://github.com/Xerrion/DragonShout/issues/28 — addon-developer technical discussion confirming COMBAT_LOG_EVENT_UNFILTERED removal from live addon API surface (technical/community source, not Blizzard-primary).
22. https://www.wowhead.com/news/combat-addons-disabled-in-end-game-content-in-midnight-378679 — attempted fetch, page did not return usable body content this session; title used only to corroborate raid/M+-specific scope, not independently confirmed.
23. https://conquestcapped.com/guides/wow/mythic-plus-keystones/ (via search) — keystone upgrade/downgrade math, Resilient Keystone floor mechanic.
24. https://blizzardwatch.com/2026/01/16/wow-cooldown-manager-how-to-use/ and https://www.wowhead.com/guide/ui/cooldown-manager-setup (via search) — Cooldown Manager feature breakdown.
25. https://www.method.gg/guides/wow-midnight-season-2-great-vault-reward-item-levels-and-upgrade-track — Great Vault upgrade track/ilvl structure, raid-row bonus-tier rule.
26. https://timesaver.gg/blog/wow-midnight-season-2-mistcrests-farm-guide (via search) — crest tier/cost structure.
27. https://www.icy-veins.com/wow/midnight-delve-rewards-guide and https://conquestcapped.com/guides/wow/midnight-delves-rewards/ (via search) — Delve tier-by-tier reward table, Bountiful Delves/Untainted Mana-Crystals.
28. https://chillingboosts.com/blog/keystone-myth-3400-season-2 and https://conquestcapped.com (via search) — M+ seasonal rating reward thresholds (Conqueror/Master/Hero/Legend, titles, mounts).
29. https://wowpedia.fandom.com/wiki/Active_Mitigation and https://www.icy-veins.com/wow/tanking-guide — active mitigation definition and coaching framing.
30. https://news.blizzard.com/en-us/article/24230699/level-up-your-talents-in-midnight — official Blizzard article on level-90 talent point expansion, Apex Talents, class/spec/hero point distribution.
31. (via search synthesis, Wowhead/community GCD-mechanics discussion) — GCD formula and 0.75s floor confirmation for modern retail.

## Open questions
- Exact rating thresholds for **tertiary stat** (Avoidance/Leech/Speed) DR bands in current patch 12.1 were not independently re-derived this session — only the general "10%/15%/20%, caps ~49%" shape was retrieved; a coach citing exact tertiary breakpoints should re-check Maxroll or a SimC output directly.
- The precise **scope boundary** of the Secret Values addon restriction (raid + M+ confirmed; whether *leveling dungeons* or *world bosses/delves* are also restricted vs. fully open) was reported by secondary sources but not confirmed against a Blizzard primary statement this session.
- Which **two of the three Great Vault rows** can produce Myth-track gear (raid row confirmed; M+ row very likely also eligible at high keys; world/Delve row status unconfirmed) — not independently verified this session.
- **Keystone Myth** achievement's exact Season 2 rating cutoff was reported as "not yet announced" as of a recent guide-site check; likely resolved by now (2026-09-25) — re-check before citing a number to a player chasing it.
- Whether Mastery's rating-per-percent conversion is uniformly 46 across all specs or varies (the DR *rating thresholds* are uniform per Maxroll, but the *value per point* is admittedly spec-specific and wasn't broken out spec-by-spec here — out of scope for a general mechanics file, but flag if a spec-specific knowledge file needs to reconcile numbers against this one).
- Exact wording/scope of Blizzard's official "which addons are and aren't restricted" policy — the two Wowhead pages most directly on-point (ParsePal blog, Wowhead's "Combat Addons Disabled" news post) both failed to return fetchable body content this session; the addon-restriction section above leans on Blizzard's own philosophy post (source 11, high confidence) plus secondary synthesis (lower confidence) for the addon-by-addon specifics — worth a follow-up direct fetch if precision on a specific addon matters to the mentor's advice.
