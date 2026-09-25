topic: PvP (Retail and Classic) — fundamentals, formats, meta, battlegrounds, after-match review
applies-to: Retail (Midnight, patch 12.1, Season 2), Classic Era/Hardcore (Vanilla honor system), Season of Discovery, TBC Classic Anniversary, MoP Classic. WoW: Forever is not live yet (launches 2026-11-04) — no Forever-specific PvP facts here; see `forever-facts/` once it exists.
fetched: 2026-09-25
sources: 21 (listed at the end)

Coach's reading order: §1 (fundamentals) applies to every format. §2–3 are Retail arena/BG specifics and are volatile. §5 is Classic-only and uses different numbers than §1 — do not mix them. §6 is what to check in a combat log after any match, any version.

## 1. Fundamentals (durable, both versions unless noted)

### 1.1 Diminishing returns (DR)

DR makes repeated crowd control (CC) of the same category on the same target progressively weaker, then grants temporary immunity, so a single player can't be chain-controlled forever. Category, not spell, is what matters — two different stuns share the same DR category.

**Retail (Midnight Season 2, patch 12.1) — curve RETRIEVED, reset timer REPORTED:**

> Claude spot check 2026-09-25: Maxroll's DR page (patch 12.0.7, updated 2026-06-17) already states PvP immunity after 2 applications and a **16 s** reset, so the 2-application curve predates Season 2. The **20 s** reset below comes only from 12.1 PTR notes (source 4, REPORTED). Before quoting the reset timer in a review, confirm it against the live 12.1 patch notes.

| Category | Includes | Curve | Reset timer |
|---|---|---|---|
| Stuns | Full incapacitation, no actions | 100% → 50% → immune | 20 s after last application expires |
| Roots | Immobilize, casting still allowed | 100% → 50% → immune | 20 s |
| Incapacitates | Polymorph, Sap, Sleep, Charm-type | 100% → 50% → immune | 20 s |
| Disorients | Fear, Horror, Cyclone-type | 100% → 50% → immune | 20 s |
| Silences | No casting, movement/abilities allowed | 100% → 50% → immune | 20 s |
| Disarms | PvP-only, removes weapon damage | 100% → 50% → immune | 20 s |
| Knockbacks/Displacements | Airborne/pull effects | Short internal cooldown, near-full immunity after first | Variable |

Season 2 (started the week of 2026-08-18) changed two numbers from Season 1: the reset timer went from 16 s to 20 s, and full immunity now hits after the **2nd** application of a category instead of the 3rd (so effectively 100% → 50% → immune, one fewer "diminished but real" application than before). Also new in 12.1: a target under Fear/Disorient can no longer additionally be knocked back. RETRIEVED — Wowhead/community coverage of the 12.1 PTR notes and confirmed by two independent fetches (icy-veins Season 1 guide showed the old 16 s/3-app numbers; the Season 2 search results and a dedicated 12.1-notes search both independently gave 20 s/2-app). PvE stuns are a separate, looser DR track (still reduces toward immune but over 3 applications) — don't apply arena DR numbers to a dungeon/raid pull.

**Coach takeaway:** with only 2 real applications before immunity and a 20 s reset, a CC chain is now short by design — Blizzard's stated goal (12.1 notes) is fewer full-lockout kills, more sustained-pressure kills. A player who tries to "chain CC to zero" a target in Season 2 will find the 3rd attempt does nothing (see `SPELL_MISSED` / `missType=IMMUNE` in §6).

**Classic Era (Vanilla honor system realms) — RETRIEVED, durable:**

| Category | Curve | Reset timer |
|---|---|---|
| Stuns (player-activated) | 100% → 50% → 25% → immune | 15 s after the CC ends |
| Stuns (proc-based, e.g. weapon procs) | Separate category from activated stuns — does not share DR with them | 15 s |
| Fears / other CC | Same 100/50/25/immune curve, own category | 15 s |

Classic's curve keeps a 25%-duration third application before immunity (4 applications total to reach immune), versus Retail's current 2-application immune. The 15 s window is also shorter than Retail's 20 s, meaning DR falls off faster in Classic — you can be re-stunned at "full" sooner if the chain has a gap. Source: Vanilla WoW wiki DR page, corroborated by a Blizzard Classic forum thread on the same mechanic. Not independently re-verified against a live 2026 Classic Era patch note, so treat the exact "activated vs proc separate category" split as REPORTED, not hand-confirmed on a current PTR/live server this session.

### 1.2 CC chains in practice

A chain is only worth casting if each link lands on a target that isn't already diminished into uselessness or about to trinket. Two coaching rules that hold in both versions:
- **Setup CC (long, from stealth/openers) should be full-duration** — spend it on the first, undiminished application, not the third.
- **Chase/panic CC (used after a trinket or DR'd) is expected to be short** — a coach should not mark "short CC duration" as a mistake by itself; check whether it was DR'd (see §6) before concluding it was wasted.

### 1.3 Trinkets and PvP talents

**PvP trinket (Retail):** two variants sharing an item slot — Gladiator's Medallion (manual, player-timed) removes all active loss-of-control effects instantly on use; the Sigil of Adaptation (passive) auto-breaks the next loss-of-control effect lasting ≥5 s, once per 60 s. Most competitive players run the Medallion for the deliberate timing. RETRIEVED (Wowhead spell page + Warcraft Wiki `PvP medallion`). Racial CC-breaks (Every Man for Himself, Will of the Forsaken, etc.) stack as a second break in some comps.

**Classic:** no automatic PvP medallion at max level in the original honor system; PvP trinkets (Insignia of the Alliance/Horde and similar) are on-use items with their own cooldown that break a stun/fear, separate from racials like Will of the Forsaken (Undead, breaks fear/charm/sleep) and Perception/Stoneform. Trinket timing is the single highest-leverage individual skill in Classic arena/duels because there's no second automatic break.

**PvP talents (Retail):** a separate talent row/system active only while PvP-flagged (arena, rated BG, War Mode), unlocked via honor level, distinct from the PvE talent tree — pick rates for specific talents change every patch (see §3, volatile). Confirmed still present and actively balanced in 12.1 (Skill-Capped spec-by-spec "Midnight changes" articles list PvP talent picks per class). RETRIEVED.

### 1.4 Positioning and line-of-sight (pillar play)

Durable fundamentals, unchanged in spirit across expansions and Classic:
- Break line of sight (LoS) on a caster/healer behind a pillar to force them to either stop casting, walk into a bad angle, or waste a instant on you while you reposition.
- Never stand in a straight line with your healer and the enemy team's melee/stealth entry point — a rogue/DH opener wants a clean line to the healer.
- Kite around a pillar so the DR clock on the CC you just ate runs out before you're back in the open.
- In arena, the pillar in the middle of the standard maps (Ruins of Lordaeron, Nagrand, Blade's Edge, etc.) is the single most-used defensive tool in the game — a healer glued to it is much harder to burst.

### 1.5 Kiting and peeling

- **Kiting** = using movement, slows, and roots on the enemy (or your own mobility) to stay out of melee range while still contributing damage/healing. Effective kiting increases the time-to-kill and burns enemy cooldowns/mana for nothing.
- **Peeling** = using your own CC/slows on the enemy attacking your teammate (usually the healer) to buy them time, at the cost of not doing your own offense that moment. A DPS who never peels for their healer under pressure is a common and easily-cited mistake (their CC/slow ability was available — `SPELL_CAST_SUCCESS` earlier — and not used on the enemy attacking the healer in the danger window).

### 1.6 Focus fire and target calling

- Concentrating all damage on one target (usually the enemy healer, or the DPS not being peeled) kills faster than spreading damage, because healing/damage reduction scales better against split pressure.
- A log showing the team's `SPELL_DAMAGE`/`SPELL_PERIODIC_DAMAGE` events split roughly evenly across two enemy targets in a short window, with neither dying, is evidence of no coordinated target calling.
- Switching targets mid-burst (calling a new target after committing CC/cooldowns to the first) usually wastes the setup — check whether a CC chain on target A was abandoned right before damage moved to target B.
- Standard call-out conventions a coach should recognize (INFERRED — common practice, not a rule enforced by the game): a "kill target" (raid-mark it, e.g. skull), a separate "CC target" mark for whoever gets chain-controlled off the fight, and short voice/chat call-outs for "trinket," "X is out" (a defensive/CC-break was just used, so the next CC will land clean), and "go"/"stop." A player who never calls or reacts to a "trinket" call-out is effectively playing blind to the single biggest state change in the round — the target is now DR-immune-only-via-break and re-CC-able differently.

**Retail open-world PvP (War Mode):** an opt-in toggle that flags a player for world PvP outside instanced content, in exchange for bonus rewards; Slayer's Rise (§4) includes a War Mode-exclusive open-world subzone with its own reputation track and currency. Off by default — a player confused about being attacked in the open world almost certainly has War Mode on and can check/toggle it from the PvP UI. REPORTED, not independently re-verified against a current 12.1 UI screen this session.

### 1.7 Cooldown trading, dampening, and go/reset timing

- **Cooldown trading**: using a defensive/CC-break specifically to survive the enemy's committed offensive cooldowns, so the enemy "wastes" a cooldown window on a target that lives — after which your team's own offensive cooldowns face a colder (cooldown-less) enemy team. A coach checks whether a defensive was popped in response to the enemy's `SPELL_CAST_SUCCESS` of a known burst cooldown, or randomly/too early.
- **Dampening (Retail arena/Solo Shuffle):** a stacking debuff reducing all healing and absorption; it starts 5 s into a 2v2 match, or 5 min 5 s into 3v3/other brackets, then adds roughly 1% per 10 s per player, forcing long games to a resolution. RETRIEVED (Warcraft Wiki `Dampening`, cross-checked against two forum threads discussing the exact percentages, which have changed at least once in recent patches — confirm current start/step values from `/pvp` UI or a dedicated Dampening tracker addon before quoting an exact percentage in a specific match, since forum history shows this value gets tuned). Games that go past the dampening threshold should be reviewed for whether the team tried to force a kill or let dampening do the work passively — pure passive play in high dampening is usually the losing strategy since burst becomes unreliable for everyone.
- **Go/reset timing**: "go" = the moment a team commits full offensive cooldowns together on a target; "reset" = disengaging/kiting to let cooldowns come back up rather than trading unfavorably. A common coaching finding is a team going all-in on a target that the enemy can trivially defensive/peel, then having no cooldowns left when the enemy's own "go" comes — check cooldown `SPELL_CAST_SUCCESS` clustering in the log: cooldowns popped together with no kill and no matching enemy death shortly after is a burned "go."

## 2. Retail arena and rated formats — current rules (Midnight Season 2, patch 12.1) — VOLATILE (fetched 2026-09-25, recheck after 14 days or a patch)

| Format | Team size | How rating works | Notes |
|---|---|---|---|
| 2v2 | 2 | Standard rated arena, per-match rating | "Friendlier learning bracket" — lower barrier, not the title bracket |
| 3v3 | 3 | Standard rated arena, per-match rating | The main competitive ladder; top 0.1% earn the season's Gladiator-tier title (Galactic Gladiator this season) |
| Solo Shuffle | Solo queue, lobby of 6 | One queue pop = 6 rounds; lobby is reshuffled each round around 2 healers + 4 DPS; rating moves per round based on your round win/loss record, not per full match | Elite performers earn a season title (Galactic Legend this season) |
| Battleground Blitz | 8v8, solo or eligible duo (duo allowed if one is a healer) | Matchmaker targets 2 healers + 5–6 DPS + 0–1 tank per team; if no tank is placed, CTF maps are pulled from that match's pool; whole-match win/loss sets rating (not per-round like Solo Shuffle) | Minimum item level 330 to queue; gear normalizes to 472 inside the match regardless of higher real ilvl; end-of-season titles (Venomous Marshal/Warlord) |
| Rated Battlegrounds (RBG) | 10v10 premade | Whole-match win/loss | Organized-group format; needs a full premade, not solo-queueable |

Gearing (Season 2, RETRIEVED but treat numbers as volatile): weekly Conquest cap starts at 1,600 in the season's first week and increases by 800 each subsequent week. Current best Conquest gear is ilvl 344 plus the class's PvP tier set; a full Honor-bought set is reachable at ilvl 331 for 10,850 Honor. Rated play (2v2/3v3/Solo Shuffle/Blitz/RBG) uses your real PvP item level; unrated skirmish/BG modes scale gear (Honor gear scales to 276, Conquest to 289 per the Season 1 guide — re-check this pair of numbers for Season 2, they read like older figures still cached from Season 1 in one source and should be confirmed against the in-game PvP tab before quoting to a player).

New Season 2 epic battleground: **Slayer's Rise**, a 40v40 map in the Voidstorm (see §4 for objectives) — this is a new addition to the rotation, not a replacement.

## 3. Current meta — top specs and comps by bracket — VOLATILE (fetched 2026-09-25 from Murlok.io live rankings, recheck after 14 days or a patch)

Murlok ranks individual specs by the rating of top-performing players (updated every 8 hours), not team win-rate; team comps below are pulled from separate guide sites. Do not treat "top spec" as "must-play" — it reflects who is currently winning at the top of the ladder, which is influenced by comp availability as much as raw power.

**2v2 — top DPS specs (Murlok, live ratings):** Windwalker Monk (leading), Assassination Rogue, Beast Mastery Hunter, Arms Warrior, Affliction Warlock.

**3v3 — top DPS specs:** Assassination Rogue (leading both 2v2 and 3v3 per one summary), Fire Mage, Arms Warrior, Retribution Paladin, Feral Druid.
**3v3 — top healer specs:** Restoration Druid (leading), Preservation Evoker, Holy Paladin, Holy Priest, Discipline Priest, Restoration Shaman, Mistweaver Monk (roughly descending order).

**3v3 comps mentioned across guides (REPORTED, not independently re-verified as win-rate leaders):**
- RMP — Subtlety Rogue / Fire Mage / Holy Priest — cited by one source as the most-represented comp above 1800 rating (~6%).
- Rogue (Sub or Assassination) / Frost Mage / Preservation Evoker — high kill-potential burst comp.
- Havoc Demon Hunter / Arms Warrior / Mistweaver Monk — melee-pressure comp, said to benefit from the Season 2 CC nerfs (sustained pressure over chain-CC setups).
- Affliction Warlock / Frost Mage / Restoration Druid (or Preservation Evoker) — DoT/attrition comp; Affliction was buffed into S-tier in 12.1.
- Arms Warrior called out as a top-tier melee cleave pick generally.

**Solo Shuffle — DPS tier projection for Season 2 (one source, explicitly a projection from Season 1 data + 12.1 tuning, not measured Season 2 win rate):** S-tier: Retribution Paladin, Marksmanship Hunter, Frost Mage. A-tier: Arms Warrior, Havoc DH, Feral Druid, "Devourer" Demon Hunter, Assassination Rogue, Affliction Warlock, Windwalker Monk, Enhancement Shaman. Everything else B/C-tier per that source — treat this list as a starting point, not a verified current ladder, and prefer Murlok's live per-spec rating page for a same-day check.
**Solo Shuffle — healer note:** Restoration Druid has reportedly overtaken Holy Priest at the top of Solo Shuffle healing this season (REPORTED, one summary).

**Rated Battlegrounds — top DPS specs (Murlok, live ratings):** Balance Druid (leading by a wide margin), Assassination Rogue, Subtlety Rogue, Arms Warrior, Retribution Paladin. RBG favors sustained AoE/utility over pure burst, which is consistent with Balance Druid's lead here versus its lower presence in 2v2/3v3.

**Conflicting source check (recorded per the brief's rule on disagreement):** one aggregator's search-snippet summary (source 3, timesaver.gg) put Retribution Paladin / Marksmanship Hunter / Frost Mage as Solo Shuffle S-tier DPS; a different aggregator's summary (wowmeta.com, seen only as a search snippet, not fetched) put Assassination Rogue / Feral Druid / Survival Hunter as S-tier DPS and Restoration Druid / Discipline Priest as top healers for the broader arena meta. I trust the Murlok.io live per-spec rating pages (source 2, directly fetched, refreshed hours before this session) over either aggregator's tier-list prose, since Murlok reflects actual top-player ratings rather than an editor's tier assignment — but note Murlok ranks individual specs, not comps, so it can't confirm or deny either aggregator's comp claims.

**How to keep this current without a full re-fetch:** murlok.io/meta/{dps,healer,tank}/{2v2,3v3,solo,rbg} refreshes every 8 hours; check-pvp.fr and Skill-Capped's tier-list articles were not independently fetched this session (search-only) and should be cross-checked before relaying a specific comp recommendation to a player.

## 4. Battleground objectives and strategy (common maps)

General principle for every objective-based BG: the team that wins the *numbers fight* at each objective usually wins the map — don't 1v1 a contested point when rotating 2 more players there flips it for free. Classic-specific maps (Warsong Gulch, Arathi Basin, Alterac Valley) are covered with Classic's honor mechanics in §5; this section covers the wider Retail rotation and Blitz map pool.

| Map | Type | Core objective | Coaching notes |
|---|---|---|---|
| Warsong Gulch | Capture the flag, 2 flags | Return your flag home while carrying theirs to score | Escort the flag carrier (FC); don't let the FC run alone through open ground; a flag auto-returns ~5 s after being dropped with nobody nearby; historically the FC takes escalating bonus damage/slow the longer both flags are out (~10 min mark), so long WSG games punish stalling |
| Arathi Basin | 5-node domination (Blacksmith, Farm, Gold Mine, Lumber Mill, Stables) | Hold nodes to generate resources toward the score cap | A node takes an ~8 s channel to flip, then needs to go uncontested to start generating — never fight *on* a node you're capping if you can pull the fight off the flag first; 3+ nodes held usually wins the resource race |
| Eye of the Storm | Hybrid: 4 towers (domination) + a flag for bonus points | Hold towers for ticking points; flag capture gives a lump sum | Don't over-commit to the flag at the cost of losing 2 towers — towers are the steady income, the flag is a burst |
| Battle for Gilneas | 3-node domination (Lighthouse, Waterworks, Mines) | Same resource-tick logic as Arathi Basin but only 3 nodes | Smaller map, fights are faster and rotations matter more per-second than in AB |
| Deepwind Gorge | 5-node domination + a gold cart per base | Nodes tick resources; the cart is a lump-sum delivery, first to the resource cap wins | Don't ignore the cart — a successful cart delivery can swing a close resource race |
| Silvershard Mines | Escort 3 payload carts along tracks | Your team's presence on a cart speeds it; enemy presence on it can stop or reverse it | Splitting to hold 2 of 3 carts beats grouping on 1; carts that reach the end score automatically |
| Temple of Kotmogu | Orb possession scoring | Carrying an orb scores points per tick for your team; different orbs (color) are worth different amounts; carriers move slower and are marked | Kill the highest-value orb carrier first; don't let one player hoard an orb in a corner uncontested |
| Twin Peaks | Capture the flag, 2 flags (Alterac-style terrain) | Same as WSG | Verticality and multiple flag routes matter more than WSG's simpler layout |
| Deephaul Ravine | 10v10; mine carts (tracked) + a central crystal delivery | Control mine carts and/or deliver the Deephaul Crystal to the enemy's elevated point; first to 1,500 points wins | Escort vehicles run above the map for fast repositioning — use them to answer a cart or crystal push quickly |
| Slayer's Rise (new, Season 2) | 40v40 epic | Central point fight, then push to kill the enemy's domanaar boss at their Spire; capturing the Shenzar Refinery mid-map auto-damages the enemy base; recruiting neutral NPC camps adds numbers to your push | Treat it like a smaller/faster Alterac Valley: early mid-fight sets momentum, then it's an assault on the enemy boss room with reinforcements from captured camps |

Sources for the current map pool and Deephaul/Deepwind mechanics: Warcraft Wiki (`Deephaul_Ravine`, `Deepwind_Gorge`), Blizzard's Deephaul Ravine announcement, and the Blitz map-pool summary in §2. Slayer's Rise objectives are RETRIEVED from Blizzard's own Midnight PvP announcement post plus one third-party guide; not personally played/verified this session (no way to fetch in-game text), so treat exact objective names as REPORTED.

## 5. Classic PvP

### 5.1 Honor system and ranks (Vanilla / Classic Era)

The original Vanilla honor system ranks players 1–14 per faction weekly (Private/Scout up to Grand Marshal on Alliance, High Warlord on Horde), based on a weekly Honor/Rank-Points calculation relative to *other players on your realm* that week — not a fixed threshold. Two important nuances:
- Your effective rank depends on how many other players are also climbing that week (the "NRP" pool), so grinding harder than your own past week isn't enough if the realm's top competition also grinds harder.
- The original system decayed accumulated Honor Rating by 20% per week if you stopped playing; losing rank also (originally) stripped rank-locked titles, though gear earned at a rank (e.g., Grand Marshal gear) was kept permanently once obtained.
- **Current Classic Era note:** patch 1.14.4 (2023) removed rank decay and moved to fixed honor milestones for rank progression, which is a real change from the original 2006 system — a player asking about "the honor grind" on current Classic Era realms is not dealing with weekly decay the way original Vanilla players did. REPORTED — from a search summary citing this patch change, not independently opened on a current Classic Era client this session; confirm against a current Classic Era honor UI or Blizzard's own patch notes before stating decay is definitely off on the specific realm/flavor the player is on (Season of Discovery and Hardcore may differ from vanilla Classic Era).
- Honorable Kills require the enemy to be within 10 levels of you (roughly — exact band should be confirmed per-flavor); farming very low-level or grey-con players yields little to no honor.

### 5.2 BG strategies: Warsong Gulch, Arathi Basin, Alterac Valley

**Warsong Gulch (10v10 CTF):** Send 2–3 to grab and hold mid/enemy flag room, keep enough at home to guard your own flag carrier's return route. A dropped flag returns itself if unattended for a short window, so a solo runner isn't safe just because nobody's chasing. Common mistake: the whole team chases the enemy FC through open ground instead of setting up a return/regroup — a coordinated team wins WSG on defense and FC protection more than on raw kills.

**Arathi Basin (15v15, 5-node domination):** Winning is about node count over time, not kills. Contest a node only long enough to deny the tick, then rotate — don't fight to the death defending 1 node while the enemy quietly caps 2 others. Rogues/Druids (stealth) are historically valued for solo-capping undefended nodes. Watch for a team stacking 4+ players on one already-secured node; that's a rotation failure, those players should be pressuring a contested node instead.

**Alterac Valley (40v40):** The efficient strategy (for honor/time, not just the win) is a "rush": send the bulk of the team straight to assault towers/bunkers and the enemy graveyards, and only then go for the enemy General/Warlord boss, rather than turtling. Each of the boss's supporting Marshals/Warmasters gives it a stacking buff that's removed one stack per enemy tower/bunker destroyed — so towers aren't just points, they directly weaken the final boss fight. Stealth classes are valuable for capping towers uncontested. Bonus honor scales with how many of your own towers/bunkers survive intact at the end, so leaving a guard behind at captured points matters, not just rushing forward.

### 5.3 World PvP (Classic)

Open-world honor comes from Honorable Kills on enemy players in the field, not just BGs — contested zones and racial capitals see recurring fights. Cross-realm grouping for PvP (queueing BGs/arena with players from other realms) was introduced starting with Wrath of the Lich King Classic, not present in original Vanilla/Classic Era — a player asking why they can't group cross-realm on a Vanilla-ruleset Classic Era or Hardcore server is hitting an intentional design limit of that flavor, not a bug.

### 5.4 Classic DR differences from Retail (summary)

Already detailed in §1.1: Classic's DR reset window is 15 s (vs. Retail's current 20 s) and its curve runs a full 4 applications before immunity (100/50/25/immune) versus Retail Season 2's 2-application immune. Practically: chain-CC setups that would fail on the 3rd attempt in current Retail can still land a (heavily reduced) 3rd hit in Classic. TBC Classic Anniversary specifically also introduced arena (2v2/3v3/5v5 in TBC, 5v5 later removed in the original timeline) with its own rated ladder and Arena Points economy, separate from the honor/BG track — treat Classic arena as a different reward economy from Classic BGs, not the same currency.

## 6. After-match review: what a coach checks in a combat log

This mirrors the PvE rubric style in `rubrics/_generic.md` (evidence-or-silence, quote the line, rank by impact, ≤3 findings). PvP-specific checks below use the same combat log event vocabulary the slicer already extracts: `SPELL_CAST_SUCCESS`, `SPELL_AURA_APPLIED`/`SPELL_AURA_APPLIED_DOSE`/`SPELL_AURA_REMOVED`/`SPELL_AURA_REFRESH`, `SPELL_MISSED` (with `missType`), `SPELL_INTERRUPT`, `SPELL_DISPEL`, `SPELL_DAMAGE`/`SPELL_PERIODIC_DAMAGE`, and `UNIT_DIED`.

| # | Mistake | Evidence in the log | Why it matters |
|---|---|---|---|
| P1 | Trinket (or CC-break racial) used into a CC that was already short/DR'd, not the dangerous one | `SPELL_CAST_SUCCESS` of the Medallion/Sigil/racial immediately after a `SPELL_AURA_APPLIED` whose gap to `SPELL_AURA_REMOVED` is clearly shorter than the ability's known base duration (i.e., it was already 50%/immune-tier from DR) — check what CC landed *next*, undefended, because the break was already spent | The break is the single biggest defensive cooldown against being chain-controlled into a kill; burning it on a harmless, already-diminished CC leaves the player naked for the real one |
| P2 | Overlapping/incorrectly-read DR — coach (or player) claims "that stun should have been shorter" without checking the category | Compare the time between `SPELL_AURA_APPLIED` and `SPELL_AURA_REMOVED` for the CC in question against its known base duration from a cited source, and check the timestamp of the *previous* same-category CC on that target — DR only applies if the previous one ended within the reset window (20 s Retail S2 / 15 s Classic) | A duration that looks "wrong" is often correct DR math on a different category than assumed (e.g., a root doesn't diminish a stun) — don't flag a mistake you can't show from two dated applications in the same category |
| P3 | CC landed on an already-immune target (wasted global) | `SPELL_MISSED` with `missType=IMMUNE` on a CC cast, following two prior same-category applications inside the reset window | A wasted CC global in a short arena round is a real tempo loss — this is directly provable from the log, no inference needed |
| P4 | Defensive/CC-break used too late — after the fatal damage, not before it | Large `SPELL_DAMAGE`/`SPELL_PERIODIC_DAMAGE` spike in the seconds immediately before `UNIT_DIED` for the player, with no `SPELL_CAST_SUCCESS` of a defensive/trinket/healthstone in that window, and the ability confirmed available (an earlier cast shows it wasn't on cooldown) | Same omission-rule requirement as PvE: cite the window and the earlier cast proving availability, per `AGENTS.md` |
| P5 | No peel for the healer/teammate under burst | Enemy `SPELL_CAST_SUCCESS`/`SPELL_DAMAGE` chain targeting the healer while the player's own slow/CC ability was available (prior cast shows it off cooldown) and never cast on the attacker in that window | Missing peels is one of the most common and most provable non-healer mistakes in team PvP |
| P6 | Interrupt used on the wrong cast, or missed the important one | `SPELL_INTERRUPT` timestamp vs. the enemy healer's `SPELL_CAST_START`→`SPELL_CAST_SUCCESS` sequence — an interrupt spent on a low-value cast while a big heal or CC cast goes through uninterrupted nearby | Wasted kicks give the enemy a free cooldown-length window where they can't be stopped again |
| P7 | Target switching that abandoned a CC/damage setup | CC (`SPELL_AURA_APPLIED`) or focused `SPELL_DAMAGE` on target A stops, and the team's next actions target B, with no death or CC-break event explaining the switch | A setup that gets abandoned mid-chain wastes the CC and the cooldowns already committed to target A |
| P8 | Cooldowns ("go") burned with no kill and no matching payoff | Cluster of offensive `SPELL_CAST_SUCCESS` (burst cooldowns) with no enemy `UNIT_DIED` shortly after, followed by the enemy's own cooldown cluster with the player's team now lacking a defensive answer | Confirms a bad "go" decision — cooldowns traded for nothing, then used against a cold (no-cooldown) team |
| P9 | Ignoring dampening in a long game | Match duration well past the dampening start (5 s in 2v2 / 5 min 5 s otherwise), with healing (`SPELL_HEAL`) values not dropping in the log relative to early-game values, alongside passive, non-committal play (no `SPELL_CAST_SUCCESS` clustering suggesting a "go") | High dampening makes healing unreliable — a team that keeps playing purely defensively as dampening climbs is missing its best (and worsening) opportunity to force a kill |
| P10 | Died fully un-CC'd into a clean kill (no CC-break attempted, none available) | `UNIT_DIED` preceded by enemy CC `SPELL_AURA_APPLIED` with no player `SPELL_CAST_SUCCESS` of a break, and no earlier cast showing the break was already used/unavailable | If the break genuinely wasn't available (already spent, per P1), this isn't a fresh mistake — it's the consequence of P1 upstream; say so rather than double-counting |

Rules (same as PvE, restated for PvP): quote the line; rank by impact (usually P4/P5/P8 outrank P2/P3 in a competitive match); at most 3 findings; never claim a DR or dampening number from memory — cite it (§1) or say "not enough data, would need the current `/pvp` DR tooltip or an addon reading."

**Reading DR from raw lines (worked example, INFERRED method — the base API does not print a duration field, so this is inference from timestamps, not a direct read):**
```
12:00:01.234  SPELL_AURA_APPLIED,Player-...,"Rogue",...,DestGUID,"Target",...,spellId,"Kidney Shot",...,STUN
12:00:01.234  ...                                                                        (base duration ~6 s at max combo points)
12:00:05.234  SPELL_AURA_REMOVED,...,spellId,"Kidney Shot",...,STUN
```
Removed 4 s after applied against a known ~6 s base duration is consistent with a 2nd-application 50% DR hit in Retail S2 (6 s → 3 s would be the pure-DR expectation; deviations from the exact math usually mean a partial resist, an early dispel/cleanse, or the target dying/being interrupted some other way — check for a competing event like `SPELL_DISPEL` or `UNIT_DIED` at the same timestamp before concluding the DR math itself was wrong). A trinket break shows as `SPELL_CAST_SUCCESS` of the Medallion/Sigil landing between the `APPLIED` and the expected natural `REMOVED` time, with the `REMOVED` event then coinciding with the trinket cast timestamp instead of the expected duration.

**Classic arena note:** TBC Classic Anniversary (and later Classic flavors that add arena) run 2v2/3v3/5v5 rated arena on a separate Arena Points economy from the BG/honor track in §5.1–5.2 — a player's arena rating and BG rank are independent progressions with different currencies, so "I'm Rank 10 in BGs but my arena rating is low" is normal, not a sign something's broken.

## 7. Skill-Capped / top-player pointers (not watched — titles + URLs only, per brief)

- Skill-Capped WoW PvP Guides channel (hub for class/tier-list videos): https://www.youtube.com/@skillcappedwowpvp
- "WORLDS BEST PLAYERS DISCUSS PvP META | SKILL CAPPED PODCAST" — https://www.youtube.com/watch?v=J6k7bXu4blY
- "THE PvP Tier List Season 2" — https://www.youtube.com/watch?v=qJyLa6evWLw
- "GAIN RATING with these POSITIONING RULES in WotLK Classic" (Skill-Capped) — https://www.youtube.com/watch?v=a6ZYc9ybK-Q
- "WoW Arena Fundamentals: Positioning" — https://www.youtube.com/watch?v=Zjvunil03E0
- "WoW Guides - The Fundamentals of Arena and Positioning!" — https://www.youtube.com/watch?v=rO3R-MNor-E
- "How To Heal Arena: Episode 1: Positioning" — https://www.youtube.com/watch?v=Oj22n6JSZ2o
- "Learn These Fundamentals or Keep Losing (Beginner PvP) - Part 3" — https://www.youtube.com/watch?v=ktzBO7w8yOc
- "The COMPLETE Beginner's Guide to WoW Arena (Part 2)" — https://www.youtube.com/watch?v=Pk648jzSMSQ
- Skill-Capped article hub, per-spec "Midnight changes" for patch 12.1 PvP talents/rotation (e.g. Holy Paladin, Balance Druid, Retribution Paladin, Havoc DH, Discipline Priest, Arcane/Frost Mage, Shadow Priest, Beast Mastery/Survival Hunter, Augmentation Evoker): https://www.skill-capped.com/wowarticles/
- Skill-Capped 2v2 tier list article: https://www.skill-capped.com/wowarticles/tier-lists/2v2/
- Skill-Capped diminishing returns primer (Cataclysm Classic-focused but explains the mechanic): https://www.skill-capped.com/articles/cataclysm/diminishing-returns-cataclysm-pvp-guide/
- Venruki (top-tier multi-glad, Mage/Monk, react/analysis content) channel: https://www.youtube.com/@Venruki

None of these transcripts were fetched this session (YouTube transcript extraction wasn't attempted/available via the tools on hand) — flagging per the brief as pointers only, not summarized content. A future session with transcript access should pull the positioning and DR-specific videos first since they map directly to §1.

## Sources

1. https://murlok.io/meta — RETRIEVED, Midnight Season 2 landing page, confirms season label.
2. https://murlok.io/meta/dps/2v2, /meta/dps/3v3, /meta/healer/3v3, /meta/dps/rbg — RETRIEVED, live per-spec rating rankings, Midnight Season 2 / patch 12.1, fetched 2026-09-25.
3. https://timesaver.gg/blog/wow-midnight-season-2-best-dps-solo-shuffle — RETRIEVED, Solo Shuffle DPS tier projection, explicitly caveated by the source as pre-Season-2-data.
4. Search-result synthesis citing WoW Midnight 12.1 PTR development notes (via Icy Veins "Class Changes, Diminishing Returns: Midnight 12.1 PTR Development Notes, June 30th" and an EZG 12.1 class-changes article) — REPORTED, gave the 20 s DR reset / 2-application immunity change and the Gladiator's Distinction stat swap; not independently opened as a primary Blizzard patch-note document this session.
5. https://maxroll.gg/wow/resources/crowd-control-diminishing-returns — RETRIEVED, DR category table, labeled "Patch 12.0.7" (Season 1 numbers; cross-checked against source 4 for the Season 2 delta).
6. Icy Veins Midnight PvP Season 1 guide (fetched via search snippet only — direct WebFetch returned HTTP 403) — REPORTED, gave Solo Shuffle/Blitz/RBG format descriptions, old 16 s/3-app DR numbers, and Honor 276 / Conquest 289 scaling figures for unrated content.
7. https://www.wowhead.com/spell=208683/gladiators-medallion and https://warcraft.wiki.gg/wiki/PvP_medallion — RETRIEVED/REPORTED via search snippet, Medallion vs. Sigil of Adaptation mechanics.
8. https://warcraft.wiki.gg/wiki/Dampening — REPORTED via search snippet, start timers (5 s in 2v2, 5:05 otherwise) and ~1%/10 s stacking; forum threads referenced in the same search show this percentage has been retuned before, so treat the exact current step as needing an in-game re-check.
9. Search synthesis on Blitz rules (Icy Veins "Battleground Blitz Guide" + expcarry Blitz guide, snippet only) — REPORTED: 8v8, comp targeting (2 healers/5-6 DPS/0-1 tank), min ilvl 330 to queue, normalizes to 472 in-match, map pool including Deephaul Ravine.
10. https://timesaver.gg/blog/wow-midnight-season-2-gear-fast-pvp and related search snippet — REPORTED: Season 2 Conquest cap 1,600 week 1 +800/week, 344 ilvl Conquest BiS, 331 ilvl / 10,850 Honor for full Honor set.
11. Blizzard News, "Take up Arms with Midnight's PvP Updates" / "Take on New PvP Challenges in Midnight" (https://news.blizzard.com/en-us/article/24223778/... and /24243215/...) — REPORTED via search snippet: Slayer's Rise 40v40 epic BG objectives (Spire assassination, neutral camp recruitment, Shenzar Refinery).
12. https://warcraft.wiki.gg/wiki/Deephaul_Ravine and Blizzard's Deephaul Ravine announcement — RETRIEVED via search snippet: 10v10, mine carts + crystal delivery, first to 1,500 points.
13. https://warcraft.wiki.gg/wiki/Deepwind_Gorge (and `_original`) — RETRIEVED via search snippet: 5-node domination + gold cart, 1,500 (current)/1,600 (original) resource cap.
14. Vanilla WoW wiki, "Diminishing returns" (vanilla-wow-archive.fandom.com) — REPORTED via search snippet (direct WebFetch returned HTTP 402); 15 s reset, 100/50/25/immune curve, separate activated-vs-proc stun categories.
15. Search synthesis on Classic honor system (Wowhead Classic "PvP Honor Ranking System Overview," boostlord.com, wowx5.ru) — REPORTED: 14 ranks per faction, weekly relative Honor/Rank-Points, original 20%/week decay, gear kept permanently once earned, patch 1.14.4 (2023) removed decay for current Classic Era.
16. Search synthesis on Alterac Valley strategy (Wowpedia, Icy Veins, wow-pro.com) — REPORTED: rush strategy, General/Warlord buff tied to tower/bunker count, stealth classes for tower caps, honor bonus for towers left intact.
17. Search synthesis on Warsong Gulch mechanics (classic-wow-archive fandom, Blizzard forums thread on the FC debuff) — REPORTED: ~5 s unattended flag auto-return, 20 s flag respawn after capture, escalating FC damage/slow debuff around the 10–15 min mark.
18. Search synthesis on Arathi Basin mechanics (Warcraft Wiki, wow-pro.com) — REPORTED: ~8 s capture channel, node must go uncontested to start generating.
19. WebSearch on current expansion/Classic status (Wikipedia "World of Warcraft: Midnight," GameInformer BlizzCon 2026 coverage, Blizzardwatch Classic progression articles) — RETRIEVED: Midnight is the current retail expansion (released 2026-03-02), now in Season 2; Classic flavors live are Classic Era/Hardcore, Season of Discovery, MoP Classic (Siege of Orgrimmar, moving toward WoD Classic), and TBC Classic Anniversary (launched 2026-02-05, at Black Temple/Mount Hyjal); WoW: Forever beta is underway with a 2026-11-04 launch, not yet live.
20. https://www.skill-capped.com/wowarticles/ and individual per-spec "midnight-changes" URLs (e.g. .../guides/retribution-paladin-pvp-guide/midnight-changes/) — RETRIEVED via search listing (titles only, articles not opened) — confirms PvP talents are still an active system in 12.1.
21. YouTube search results for Skill-Capped and Venruki channel/video pointers (§7) — RETRIEVED as search listing only; no transcript fetched.

## Open questions

- Exact current Season 2 dampening start/step percentages (source 8 flags this as having been retuned before — needs a live `/pvp` check or a Dampening-tracking addon, not just a wiki page, to quote a number to a player with confidence).
- Whether Honor-gear/Conquest-gear scaling for unrated content is still 276/289 in Season 2, or whether those Season 1 figures (source 6) have moved with the new Conquest BiS of 344.
- Precise current check-pvp.fr and Skill-Capped tier-list *content* (both were only reached via third-party search snippets this session, not opened directly — Icy Veins also 403'd on every direct WebFetch attempt) — a session with working access to those three sites should re-derive §3's comp list from primary tier lists rather than aggregator summaries, since the aggregators disagreed with each other on Solo Shuffle S-tier.
- Exact Honorable-Kill level-band rule and whether Season of Discovery / Hardcore Classic match the Classic Era figures used in §5.1 — only Classic Era/original-Vanilla sources were checked.
- Whether the "2v2 doesn't grant the seasonal Gladiator-tier title" framing (source 6) still holds exactly, or whether Elite-set/other reward unlocks in Season 2 count 2v2 rating toward anything — not directly confirmed against a current rewards page.
- No transcript-level detail from any Skill-Capped or Venruki video was available this session (§7) — durable technique detail (e.g., specific pillar-play routes per arena map, specific kite patterns per class) could be added once transcripts are fetchable.
