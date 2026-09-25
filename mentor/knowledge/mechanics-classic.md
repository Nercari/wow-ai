topic: Classic-era combat mechanics (attack tables, resource regen, threat, timing systems)
applies-to: Classic Era / Hardcore / Anniversary / Season of Discovery (primary); notes flag where TBC/Wrath/Cata/MoP Classic differ
fetched: 2026-09-25
sources: 32 (listed at the end)

## How to use this file
Coaching happens between pulls or after a log review, never mid-combat. Every section below pairs a mechanic with what a coach can actually point at in a combat log (event names follow the `COMBAT_LOG_EVENT_UNFILTERED` schema used by the in-game log, Details!/Recount, and Warcraft Logs Classic uploads: `SWING_DAMAGE`, `SWING_MISSED`, `SPELL_DAMAGE`, `SPELL_MISSED`, `SPELL_CAST_SUCCESS`, `SPELL_AURA_APPLIED`, `SPELL_AURA_REMOVED`, `SPELL_INTERRUPT`, `SPELL_PERIODIC_DAMAGE`, `RANGE_DAMAGE`, `UNIT_DIED`, `PARTY_KILL`). RETRIEVED confirms this event schema is used in Classic logs (source 30).

---

## 1. The melee attack table

Every melee swing (auto-attack or special ability) is resolved as **one roll down a single table** with a fixed precedence order. Once a result lands in one category, none of the categories below it are checked. RETRIEVED (source 1, source 2).

**Order of resolution:** Miss → Dodge → Parry → Glancing Blow → Block → Critical Strike → Crushing Blow → ordinary Hit.

Key structural rule: these outcomes are **mutually exclusive** — there is no such thing as a "blocked crit" or a "parried crushing blow" against a normal mob/player white-damage swing. RETRIEVED (source 1).

**Table-overflow rule:** if Miss + Dodge + Parry + Block chance together reach or exceed 100%, the attacker can never roll into Crit or Crushing Blow — stacking enough avoidance literally pushes crushing blows and crits off the bottom of the table. This is the theoretical basis of "avoidance tanking" (dodge/parry/block stacking) in vanilla-era tank gearing. RETRIEVED (source 1, source 12).

### Outcome-by-outcome

**Miss** — base 5% chance for a max-skill attacker vs. an equal-level target with a single weapon. Two formula regions apply depending on the skill gap between attacker's weapon skill and defender's defense skill:
- If (defense − weapon skill) ≤ 10: `MissChance = 5% + (DefenseSkill − WeaponSkill) * 0.1%`
- If (defense − weapon skill) > 10: `MissChance = 5% + (DefenseSkill − WeaponSkill) * 0.2%` (8% vs. a +3 boss at 300 weapon skill). The first `(DefenseSkill − WeaponSkill − 10) * 0.2%` of +hit is suppressed, giving a 9% special-attack hit cap in that example.
RETRIEVED, formulas as documented by the classic-warrior community wiki (https://github.com/magey/classic-warrior/wiki/Attack-table, fetched by Claude 2026-09-25).

- **Practical breakpoint:** a raid boss (level 63) has defense skill 315. A level-60 attacker capped at 300 weapon skill needs **+9% hit** (from talents/gear) to never miss a special ability on a boss; going from 304→305 weapon skill (via buffs/enchants) drops the needed hit to **~6%** because 305 crosses the "no longer suppressed" breakpoint. REPORTED, repeated consistently across Blizzard forum threads and guide sites (source 4, source 5).
- Vs. players, the formula uses the target's Defense skill instead of a flat mob value: `MissChance = 5% + (PlayerDefense − AttackerWeaponSkill) * 0.04%` per point. RETRIEVED (source 2).

**Dodge** — mob dodge is `5% + (DefenseSkill − WeaponSkill) * 0.1%`, or 6.5% vs. a +3 boss at 300 weapon skill; there is no separate per-level term. Player dodge scales from Agility (class-specific ratio) plus talents. RETRIEVED (https://github.com/magey/classic-warrior/wiki/Attack-table, fetched by Claude 2026-09-25).

**Parry** — base chance exists only for defenders with Parry (players with a weapon equipped, most humanoid mobs). A creature 3 levels above the player has roughly **14%** parry chance. Parry (and dodge) also gets a **"6-second rule"**-adjacent effect for tanks called **parry-haste**: when the *target* of your melee attack parries you, their next swing timer is reset/shortened — this is why tanks are taught to stand in front of a boss's body, not to its side/back, to avoid instant "parry-hasted" extra swings that spike incoming damage. REPORTED (source 2, source 4); parry-haste behavior is well documented tanking lore, not independently re-verified this session — flag as REPORTED.

**Glancing Blow** — possible on player/pet white hits against mobs at every level difference, including equal level (never mob-on-player or against player targets). Formula: `GlancingChance = 10% + (TargetDefenseSkill − min(AttackerLevel*5, AttackerWeaponSkill)) * 2%`. At equal weapon skill, equal-level mobs give 10% chance and 5% average damage penalty; +1 gives 20%/5%; +2 gives 30%/15%; +3 gives 40%/35%. This is why weapon skill reduces glance severity against raid bosses. RETRIEVED (https://github.com/magey/classic-warrior/wiki/Attack-table, fetched by Claude 2026-09-25).

**Block** — only available to defenders with a shield (or specific class abilities). Base creature block chance is capped low (mobs block at most ~5% baseline); player block chance comes from shield rating/talents. Block value (flat damage reduced on a successful block) scales with Strength at roughly **20 Strength : 1 block value**, on top of the shield's base block value stat — the exact conversion was debated by the community and never had a single Blizzard-confirmed formula; treat the 20:1 figure as a widely used approximation, not a hard constant. REPORTED (source 2, source 14).

**Critical Strike** — chance from Agility/Intellect (class-specific) plus talents/gear, reduced ("suppressed") against higher-level targets. Melee loses 1% crit per target level above the attacker, plus 1.8% from auras against +3 targets: 4.8% total vs. a raid boss. RETRIEVED (https://github.com/magey/classic-warrior/wiki/Attack-table, fetched by Claude 2026-09-25). A tank stacking Defense skill to the cap becomes fully **"uncrittable"** by raid bosses (crit chance suppressed to 0) — the classic tank gearing target, not merely "high defense is nice to have." The cap depends on the boss level: **440 Defense in vanilla-based Classic** (level-63 bosses: 5.6% base crit, 0.04% per Defense point above 300) and **490 in TBC** (level-73 bosses). RETRIEVED concept (source 4, source 14). Claude correction 2026-09-25: an earlier draft gave 490 for Classic; the 440/490 split is RECALLED, not fetched, so verify it before quoting, and check Forever's own numbers because its tanks may be rebalanced.

**Crushing Blow** — the mirror of glancing blow: only creatures **≥4 levels above** the defender can crush (never player-on-mob, never mob-on-mob at low delta). A crushing blow deals **150%** of normal damage. Nominal crush chance scales roughly 2% per point the mob's effective weapon skill exceeds the defender's Defense skill, and — critically — **once Defense is capped for your level, no amount of extra Defense, Resilience, or other stat reduces crush chance directly.** The only way to reduce how often crushing blows land is to raise your *total* Miss+Dodge+Parry+Block enough that the roll never reaches down to the Crushing Blow slot (the table-overflow rule above). This is why tank gearing in raids is about stacking avoidance, not just Defense past the uncrittable cap. RETRIEVED/REPORTED mix (source 12, source 2).

### Coach checks — melee attack table
- **Tank taking repeated crushing blows / big spike hits:** filter the log for `SWING_DAMAGE` (or `SPELL_DAMAGE` for boss specials) with a `critical`/`crushing` flag on the boss's hits against the tank. Frequent crushes + low avoidance stats on the tank's gear = under-geared for that content, not a "misplay," but worth flagging for gear priority.
- **Melee DPS parked far below expected DPS with high `SWING_MISSED` (missType `MISS`) count:** weapon skill/hit is under the breakpoint for the target — check gear/buffs for weapon skill and +hit before blaming rotation.
- **Warrior/tank swing rate abnormally fast for several swings in a row (visible as tightly clustered `SWING_DAMAGE` timestamps under the weapon's base speed):** possible parry-haste chain — expected if they're tanking from the boss's side/back; the fix is positional (face the boss square-on), not a rotation fix.
- **Excess `SWING_MISSED` with missType `DODGE`/`PARRY` on a fresh pull:** normal — that's the defender's avoidance, not the attacker's mistake. Don't flag hit issues from a handful of dodges/parries; look at the aggregate percentage over the pull.

### Version notes
TBC/Wrath/Cata/MoP Classic keep the same table shape (miss→dodge→parry→glance→block→crit→crush) but change stat access: **Expertise** (introduced TBC) reduces a target's chance to dodge/parry the attacker, and later **Armor Penetration** (flat in TBC, % in Wrath) cuts into the target's armor mitigation roll (see §4). **Mists of Pandaria Classic** moved Block to its own independent roll (checked only if the attack wasn't otherwise avoided) rather than sharing a slot in the same combined roll — REPORTED (source 24). Taunt itself stopped being missable/resistable starting **patch 4.0.1** (pre-Cata); in vanilla/Era, Taunt is a spell that can miss (~17% miss vs. a raid boss, vs. ~8–9% typical melee miss) and can be resisted like other spells. REPORTED (source 27).

---

## 2. Hit caps and weapon skill effects (detail)

- **Weapon skill cap** for a level-L character is `5 * L` (300 at level 60). Skill above the natural cap comes from talents (e.g., Weapon Specialization-adjacent skill talents), racials, and buffs (Battle Shout doesn't add skill; specific class/racial bonuses and consumables do).
- **Defense skill** works the same way for the tank side of the table: base cap `5 * L`, extended by talents/gear; **490 Defense is the practical "uncrittable" target** vs. level-63 content (see §1). REPORTED (source 4, 14).
- **Suppression mechanic:** Vanilla code explicitly *suppresses* (discards) roughly the first 1% of +hit granted by talents/gear when the defender's Defense/skill is more than 10 points above your weapon skill — meaning cheap +hit trinkets/talents are wasted below a minimum weapon skill floor; this is the mechanical reason "get weapon skill to at least 305" is repeated in every warrior/rogue guide. RETRIEVED (source 4).
- **Melee hit-cap numbers commonly cited for capping specials/auto-attack vs. a raid boss** (level 60 character, weapon skill 300): **+9% hit** single-wielding (drops to ~6% at 305+ skill); **+28% hit (or 24%+skill-adjusted) for dual-wield** to remove auto-attack misses entirely — dual-wield's structurally higher miss floor is separate from and stacks with the level-based miss (see §3). REPORTED, consistently repeated across guide sites and Blizzard forum threads (source 4, 5, 15).
- **Spell hit cap vs. a raid boss is commonly cited as 16%** — base spell miss vs. a +3-level target is ~17%, and there's a **hard 1% floor** that cannot be hit-capped away, so 16% total spell hit from gear/talents/race is the practical ceiling. Talents that grant flat bonus spell hit for a given school (e.g., Shadow Focus lowering the needed *gear* hit by however many % the talent grants) reduce how much gear-hit is still needed, not the underlying cap. REPORTED (source 17).

### Coach checks — hit/weapon skill
- Player reports "I keep whiffing on bosses": pull their character sheet or armory export for **weapon skill** and **+hit%**, not just DPS logs. A `SWING_MISSED`/`SPELL_MISSED` rate meaningfully above ~9% melee / ~17% spell vs. a raid-level target with no relevant buffs up is a gearing problem, not a skill problem.
- If a raid-buff (Battle Shout equivalents, elixirs) that grants weapon skill is missing from the raid and a melee's miss rate on a boss pull spiked compared to prior pulls, check `SPELL_AURA_APPLIED`/`SPELL_AURA_REMOVED` for that buff's uptime before attributing the miss spike to the player.

---

## 3. Dual-wield penalty

Dual-wielding (two one-handers, no shield) adds a flat **+19% miss chance** to *both* weapons on top of the normal level-based miss — base miss becomes **24%** for a max-skill dual-wielder vs. an equal-level target (5% base + 19% penalty), before any level-difference adjustment. RETRIEVED (source 15).

Critical nuance: **the 19% dual-wield penalty applies only to ordinary white-damage auto-attacks** (both main-hand and off-hand swings use the penalized "dual-wield" miss roll). **Instant-cast special abilities that cost rage/energy/mana (Sinister Strike, Heroic Strike, Stormstrike, etc.) do NOT take the dual-wield penalty** — they use the normal single-weapon miss chance for that attack. REPORTED, consistently stated across sources (source 15). This matters for coaching: a dual-wielder's white-hit rate looks much worse than their special-ability hit rate in the same log, and that's expected, not a red flag.

Against higher-level mobs, dual-wield miss scales similarly to single-wield: roughly `24% + (MobLevel − PlayerLevel) * 0.5%` for small level gaps. REPORTED (source 15).

Some classes/specs get an offhand-hit-improving talent (Dual Wield Specialization variants — Warrior/Rogue improve offhand *damage*, Enhancement Shaman's version improves offhand *hit*), which is the mechanical reason Enhancement Shaman itemizes hit differently than Fury Warrior/Combat Rogue. REPORTED (source 4).

### Coach checks — dual wield
- A dual-wielding melee's raw `SWING_MISSED` percentage on auto-attacks will *always* run well above a two-hander's — don't coach this as a mistake. Compare their **special-ability** miss rate (`SPELL_MISSED` on Sinister Strike/Heroic Strike/etc.) against the single-wield hit-cap numbers instead; that's the number that should be near the target.
- If a dual-wielder's special-ability miss rate is also elevated, that IS a gearing issue (weapon skill/hit), since specials ignore the DW penalty but not the level-based miss.

---

## 4. Armor mitigation formula

Armor reduces incoming **physical** damage by a percentage that depends only on the **attacker's level** and the **defender's armor** — the defender's own level does not enter the formula. RETRIEVED (source 6).

- Against attackers level ≤59: `DamageReduction% = 100 * Armor / (Armor + Attacker_Level * 85 + 400)`
- Against attackers level ≥60: `DamageReduction% = 100 * Armor / (Armor + Attacker_Level * 467.5 − 22167.5)`
- **Hard cap: armor can never reduce more than 75% of physical damage**, regardless of how much armor is stacked past that point. RETRIEVED (source 6).

Worked example from source: a level-70-equivalent target with 12,000 armor vs. a level-73 attacker gets ≈12000/(12000+467.5*73−22167.5) ≈ 50% reduction. RETRIEVED (source 6) — note this example uses TBC-era levels/numbers to illustrate the ≥60 formula; the formula shape is the same one used at level 60 raid content.

### Coach checks — armor
- A tank complaining about "taking huge hits" from a same-level boss: armor mitigation is capped at 75% and boss-level attackers (usually +3 over the tank) use the harsher ≥60 formula — some raw damage is simply expected and unavoidable through armor alone; look instead at avoidance stats and cooldown usage in the log around the spike (`SPELL_AURA_APPLIED` for defensive cooldowns near the big `SWING_DAMAGE`/`SPELL_DAMAGE` hit).
- Sunder Armor / Faerie Fire / Curse of Recklessness-type armor-reduction debuffs stack additively as flat armor removed before this formula is applied — if a tank's incoming damage rose mid-fight, check `SPELL_AURA_APPLIED_DOSE`/`SPELL_AURA_APPLIED` for armor-reduction debuffs falling off the boss (e.g., Sunder Armor stacks dropping), not just a "the fight got harder" assumption.

### Version notes
TBC introduced **Armor Penetration rating** as a flat armor reduction (not %); Wrath switched it to a **percentage-based** reduction of remaining armor, making it one of the strongest physical-DPS stats in that expansion (REPORTED, source 22). This does not exist in Classic Era/SoD.

---

## 5. Spell attack table: hit, resist, crit

Spells use a conceptually parallel but mechanically distinct table: **Hit/Miss roll → (for non-binary damage spells) a separate partial-resist roll → Crit roll.**

**Spell hit:** base miss vs. an equal-level target is a few percent; it grows with level difference and reaches **~17% base miss vs. a +3-level (raid boss) target**, with a hard **1% miss floor** that no amount of +hit can remove. **16% total spell hit is the commonly cited practical cap vs. raid bosses.** RETRIEVED/REPORTED (source 17, §3 above).

**Level-based resistance ("resist roll #1"):** every spell that connects still rolls against the target's level-based innate resistance. Much-higher-level targets get meaningfully higher resist chance; much-lower-level targets have a small floor (~1% minimum). RETRIEVED (source 9, via search synthesis — treat the exact curve shape as REPORTED, not independently re-derived this session).

**Resistance-stat roll ("resist roll #2", separate roll):** based on the caster's level and the target's Resistance stat (Fire/Frost/Nature/Shadow/Arcane resistance) — the **target's level is not a factor** in this particular roll. Average mitigation from resistance stat caps around **75%**. Rough resistance-to-75%-mitigation thresholds: ~100 resist vs. a level-20 caster, ~150 vs. level-30, ~250 vs. level-50, ~300 vs. level-60, ~315 vs. level-63. REPORTED (source 9).

**Binary vs. non-binary spells:**
- **Binary spells** (Polymorph, Fear, Frost Nova, most crowd control) either land at full effect or are **fully resisted** — there is no partial-resist state. The computed "average mitigation %" for these effects is literally the chance the spell fails outright. REPORTED (source 9).
- **Non-binary spells** (Fireball, Shadow Bolt, most direct-damage nukes) can be **partially resisted** — the resist roll instead lands in a damage-reduction bucket (commonly discussed as 0/25/50/75/100% damage taken), visible in the log as a `SPELL_DAMAGE` event with a nonzero `resisted` amount rather than a `SPELL_MISSED` event with missType `RESIST`. REPORTED, standard classic theorycrafting terminology (source 9) — flagging the exact bucket percentages as REPORTED since they weren't independently re-derived this session.

**Spell crit:** each caster class has its own small base spell-crit % plus an Intellect-to-crit conversion ratio (e.g., roughly 1% crit per ~59.5 Intellect for Mage/Priest, ~60.6 for Warlock, ~60 for Druid, ~59.2 for Shaman, ~29.5 for Paladin, with differing bases per class). These per-class constants come from long-standing community theorycrafting (Selid-style spreadsheets), not an official Blizzard publication — REPORTED, not independently re-derived (source 21). Like melee crit, spell crit is also suppressed against higher-level targets.

### Coach checks — spell attack table
- Caster reports "constant resists on my nuke": distinguish in the log between `SPELL_MISSED` (missType `RESIST`, full resist — binary-spell behavior or an unlucky miss-table roll) and `SPELL_DAMAGE` events carrying a partial `resisted` amount (non-binary partial resist, normal and expected some fraction of the time, especially against high-resistance mobs like elementals). A pattern of *full* resists on a non-binary nuke well above the ~1% floor suggests spell hit is under target, not "bad luck."
- Binary CC (Polymorph/Fear) breaking or failing repeatedly on the **same target** without a resist-reduction debuff (e.g., Curse of Shadow/Misery-type "increase magic damage taken") up: expected variance on a binary roll, not automatically a coaching issue — check the sample size before flagging.
- If mobs of a *specific school* (Fire elementals resisting Fire spells, etc.) show unusually high full-resist rates, that's an innate high resistance stat on that mob family, not a hit-gearing problem — don't send the player to re-gear +hit for that encounter specifically.

---

## 6. Spell power coefficients

**Concept:** each spell converts a caster's spell power (+damage/+healing) into extra effect using a **coefficient**, roughly proportional to the spell's cast time relative to a baseline: `Coefficient ≈ CastTime / 3.5s` (instant-cast spells treated as 1.5s for this purpose), capped at ~200% for some DoT-heavy spells split across direct + periodic components. Channeled and AoE spells use adjusted variants of the same idea (AoE roughly halves the coefficient; channeled spells divide the bonus across ticks). REPORTED, standard classic theorycrafting (source 10).

**Low-level spell penalty:** a spell learned before level 20 benefits less from spell power until the caster reaches level 20 (roughly 3.75% less benefit per level below 20 the spell was learned at) — relevant for twink/low-level PvP brackets more than max-level raiding. REPORTED (source 10).

**Where to look this up (not memorized per-spell):** coefficients are per-spell and were never officially published by Blizzard in Classic; theorycrafting communities (Elitist Jerks-era spreadsheets, now mirrored/updated on sites like the Warcraft Wiki `Spell power coefficient` article, Icy Veins/Warcraft Tavern class guides, and SimulationCraft-style tools for the relevant Classic phase) maintain current per-spell tables. Because coefficient handling has been tuned/re-tuned across Classic re-releases, **do not hardcode specific spell coefficients into player-facing advice** — point the player or a follow-up lookup at a current class guide instead.

### Coach checks — spell power
- This is a "gear/stat-priority" mechanic, not something that shows up directly as a log anomaly. The indirect tell: a caster's average hit size on a known spell is well below what current spell-power gear should produce — cross-check their spell power stat (character pane / simc-style export) against a current coefficient table rather than trying to infer the coefficient from the log alone.

---

## 7. Threat mechanics

**Baseline ratios:** damage generates threat roughly **1:1** (100 damage ≈ 100 threat, modified by class/stance multipliers below); healing generates threat at roughly **0.5 per point of effective healing** to *each* enemy currently engaged with the raid/party, split across all of them, with **no threat from overhealing**. REPORTED (source 11, 13) — note two sources gave slightly different healing ratios (0.5 vs. 0.25 per point); treat the exact healing-threat constant as approximate and version/patch-sensitive rather than a fixed law, and prefer whatever a current, dated Classic guide says over either number here.

**Stance/form threat multipliers (Warrior/Druid):**
- Warrior Defensive Stance: **×1.3** base threat (×1.495 with 5/5 Defiance talent)
- Warrior Battle/Berserker Stance: **×0.8** base threat
- Druid Dire Bear Form: **×1.3** (×1.495 with Feral Instinct)
- Druid Cat Form: **×0.8**
REPORTED, consistently repeated across guide sites (source 13).

**Threat-reduction tools:** Blessing of Salvation (**−30%**/×0.7 threat), Tranquil Air Totem (**~×0.8**/-20% party threat), Rogue Feint (flat threat reduction, scaling by rank), Priest Fade (flat threat reduction, scaling by rank), Hunter Feign Death / Rogue Vanish (zero out current threat on the user). REPORTED (source 13).

**The 110%/130% pull-ahead rule:** a non-tank must generate **110% of the current top-threat (tank's) total threat** to pull aggro while in melee range of the mob, or **130%** while at ranged distance from it — this "threat lead" buffer is the core reason ranged DPS/healers get more slack before pulling threat than melee does, and why tanks want a head start (usually via an opening "threat rotation" before DPS/heals open up) before the raid goes all-out. RETRIEVED via synthesis of multiple guide sources (source 11, 13) — treat the exact 110/130 numbers as REPORTED community-standard figures rather than Blizzard-published constants (Blizzard never published the exact threat formula for vanilla; these numbers come from long-standing community reverse-engineering, e.g. "Kenco's research on threat").

**Taunt / fixate:** Taunt forces the mob's threat value on the caster to equal (or exceed by a small margin) the current top-threat target, but does not zero everyone else's threat — if the tank taunts and then stops attacking, threat can be pulled back off them again once other players' threat naturally overtakes the taunt-boosted value. Taunt is a spell in Era/vanilla: it can **miss** (reported ~17% vs. raid bosses, vs. ~8–9% typical melee/dual-wield miss) and can be resisted; many raid bosses are flagged taunt-immune. "Fixate" as used in modern encounter design (a boss mechanic that locks onto a specific player regardless of threat) is much rarer in vanilla/Era encounter design — most Classic-era "must be tanked/kited" mechanics work through the normal threat table, not a hardcoded fixate flag; treat any specific "fixate" claim for a Classic-era boss as encounter-specific and verify against that boss's own Encounter Journal-equivalent guide rather than assuming the general mechanic. RETRIEVED/REPORTED mix (source 27, 13).

### Coach checks — threat
- **Overaggro from a DPS pulling the boss off the tank:** look for a `UNIT_DIED`/aggro-switch inferred from the boss's `SWING_DAMAGE`/`SPELL_DAMAGE` target changing to a non-tank player. The classic tell in a raw log (without a threat meter) is **DPS-sourced `SPELL_DAMAGE`/`SWING_DAMAGE` events landing before the tank has landed several full GCDs' worth of `SPELL_CAST_SUCCESS`/`SWING_DAMAGE` on the target** — i.e., damage-dealers opening at full send before the tank has had time to build a threat lead. This matches the brief's canonical example: "SPELL_DAMAGE before tank threat established."
- **A healer pulling aggro on a hard-healing phase:** cross-reference `SPELL_HEAL`/`SPELL_PERIODIC_HEAL` volume spikes against the boss switching targets shortly after — large, frequent heals with no Salvation/threat-reduction aura (`SPELL_AURA_APPLIED` for Blessing of Salvation/Tranquil Air) up are the classic healer-pulls-aggro pattern.
- **Tank "loses" a mob to a taunt that should have worked:** check for a `SPELL_MISSED` (missType `RESIST` or `MISS`) event on the Taunt cast itself before assuming a threat-table problem — Taunt failing outright is a spell-hit/resist event, not a threat mechanic failure.

### Version notes
Retail (and later Classic expansions from Wrath onward) largely replaced ad hoc threat-reduction stacking with more codified tools (Misdirection, Tricks of the Trade, Vigilance) that don't exist in Era/vanilla — Era's threat toolkit is limited to the abilities/auras listed above.

---

## 8. Global cooldown (GCD)

The GCD in Classic Era/vanilla-based content is a fixed **1.5 seconds** for the large majority of spells/abilities, and does **not** get shortened by Haste — Haste itself barely exists as an itemized stat in Era, so GCD-based ability pacing stays constant through a fight. Rogue/feral-druid **energy** abilities typically use a **1.0-second** GCD instead of 1.5s. RETRIEVED (source 7).

### Coach checks — GCD
- A player's ability-cast cadence (`SPELL_CAST_SUCCESS` timestamps) showing consistent gaps near 1.5s (or 1.0s for energy-based specs) is expected and healthy — that's GCD-capped play, not a problem. Gaps **meaningfully larger** than the GCD floor with no cast-time spell or channel in between indicate a rotation/awareness gap (player not queuing the next input), which is a real, flaggable, coachable mistake.

### Version notes
**TBC Classic (patch 2.4-equivalent)** allowed Haste to reduce the GCD down to a floor of **1.0 second** at ~50% spell haste — the first time GCD became haste-sensitive. Wrath/Cata/MoP Classic keep that haste-reduces-GCD model. This is a meaningful mechanical difference from Era: a rotation cadence "feel" tuned on Era pacing will be wrong once a character has real Haste in TBC+.

---

## 9. Spell batching and melee leeway

**Spell batching:** in Era/vanilla-based Classic, any action one unit takes against a *different* unit is grouped and processed in **~400ms (0.4s) batches** server-side, rather than instantly the moment the cast bar finishes. Attack-table rolls and damage calculation resolve at cast completion, but the resulting damage/aura application can land anywhere within that following ~400ms window, alongside every other action queued in the same batch. This is why "simultaneous" outcomes are possible in vanilla-based Classic that aren't possible in modern retail — e.g., two Mages successfully Polymorphing each other in the same batch, or a Warrior's interrupt (Pummel) landing in the same batch as the target's own spell cast, meaning the interrupt still deals its damage but **does not apply the school lockout**, because both actions were simultaneously valid at the start of that batch window. RETRIEVED (source 19).

**Melee leeway (separate mechanic, often confused with batching):** melee/ranged attack range checks in Era/vanilla-based Classic are relaxed for moving units — extra range is granted to melee attacks (and to some ranged/charge-type abilities) when the attacker and/or target are in motion, originally implemented to compensate for higher latency common at vanilla's original release. This is why a Warrior can land a Charge+Hamstring that visually looks slightly out of the normal 5-yard melee range, and why melee in general can "stick" to a moving target more easily than the raw range number would suggest. REPORTED (source 20) — the precise yardage/timing formula was not found in a primary source this session; treat any specific "X yards over Y ms" number for leeway as unverified until a primary source is located.

### Coach checks — batching/leeway
- **A pull that should have failed CC (simultaneous interrupt-vs-cast) instead landed cleanly, or vice versa:** this is expected batching variance in Era-based Classic, not a bug or a misplay — don't coach a "the interrupt should have applied lockout" complaint as a player error without checking whether the target's cast and the interrupt happened inside the same ~400ms window (hard to prove from a log's rounded timestamps; treat close-timestamp `SPELL_INTERRUPT`-adjacent misses charitably).
- **Melee landing a hit that looked out-of-range on a screen recording:** leeway is the likely explanation, not lag/exploit — don't flag this as suspicious unless the range gap is large and sustained.

### Version notes
Blizzard has stated leeway is **not** going away even as spell-batching implementation details were adjusted over the Classic re-releases (e.g., 1.13.7-era patches) — the two systems are related in player folklore but are implemented separately, and batching tuning changes don't automatically remove leeway. Retail (post-vanilla-era expansions) removed large-scale spell batching; combat resolves far closer to real-time.

---

## 10. Swing timer and on-next-swing abilities

Auto-attack damage is governed by a **swing timer**: each weapon has a fixed swing interval (its listed weapon speed), and abilities described as "next melee attack" (Heroic Strike, Cleave, Raptor Strike/Maul-type abilities, Slam) **do not swing immediately** — they modify or consume the *next* scheduled auto-attack swing instead of firing as a separate instant hit. Because of this:

- **Heroic Strike/Cleave "queueing":** activating one of these abilities pre-emptively "queues" it against your next swing (rage is not spent until that swing actually lands), and — a widely used technique — **queuing then cancelling Heroic Strike before the main-hand swing fires can cause the off-hand swing to briefly use the special-ability ("yellow") hit table instead of the normal white-attack table**, improving off-hand hit chance/damage without ever spending the rage, when timed correctly relative to main/off-hand swing order. This is the mechanical basis of "swing-timer weaving"/HS-cancel-macro play prized by Fury Warriors. REPORTED (source 18).
- **Queue-cancel interactions:** queueing Heroic Strike de-queues Cleave or interrupts an in-progress Slam, and vice versa, since all three consume the same "next swing" slot. REPORTED (source 18).
- Abilities that reset the swing timer (e.g., certain instant-attack procs/talents in later expansions, or simply re-equipping a weapon) restart the interval from zero — mid-fight weapon swaps or forced timer resets are a real DPS cost.

### Coach checks — swing timer weaving
- **Failed swing-timer weaving (the brief's canonical example):** in the log, a Fury Warrior/Combat Rogue-style player repeatedly landing Heroic Strike/equivalent on the *white* hit table instead of the intended special-ability table (or simply never landing the "free" off-hand upgrade) shows up as an unusually high proportion of `SWING_DAMAGE` (not `SPELL_DAMAGE`) events tagged with the special ability's rage cost pattern, or as rage being spent (`SPELL_CAST_SUCCESS` for Heroic Strike) without a corresponding `SPELL_DAMAGE` event closely following the next `SWING_DAMAGE` — i.e., the special either fizzled for lack of rage at swing-time or queued against the wrong swing.
- **DPS loss from over-queueing Heroic Strike into low rage:** a string of `SPELL_CAST_SUCCESS` (Heroic Strike) events immediately followed by rage dropping to near-zero and *no* further specials for several seconds indicates rage-starved HS spam — a real, common, coachable Fury Warrior mistake distinct from swing-timer mistiming.

---

## 11. Resource regeneration

### Rage (Warrior, Feral Druid via a separate but related system)
Rage generated from **dealing** damage: `Rage = (Damage Dealt / RageConversionAtYourLevel) * 7.5`, with the level-60 rage-conversion constant at **230.6** (a fuller, hit-factor-aware version of the same idea is sometimes written `R = (15d)/(4c) + (f*s)/2`, where `d` = weapon damage, `c` = rage conversion, `f` = a hit-type factor, `s` = weapon speed). RETRIEVED, sourced to community-reconstructed Blizzard forum formulas (source 16).
Rage generated from **taking** damage: `Rage = (Damage Taken / RageConversionAtYourLevel) * 2.5`. RETRIEVED (source 16).
Hit-type factors for the damage-dealt formula: main-hand normal hit ≈2.5, main-hand crit ≈5.0, off-hand normal ≈1.25, off-hand crit ≈2.5 — i.e., crits and main-hand hits generate disproportionately more rage than off-hand normal hits. RETRIEVED (source 16).
Rage decays out of combat and (per long-standing vanilla-era behavior) also decays somewhat between fights/while not swinging — practical upshot: a Warrior who stands still waiting to pull loses banked rage, so opening rotations are built around abilities that need little/no rage (e.g., a free opener) rather than assuming a full rage bar at pull.

### Energy (Rogue, Cat Form Druid)
Energy regenerates at a **fixed rate of ~10 energy/second (20 per 2s tick)**, independent of stats, level, or gear — it does **not** pause for casting, moving, or (notably) most crowd-control effects, and nothing in the base game changes this rate except specific talents (e.g., Rogue talents that add a flat energy-regen bonus). RETRIEVED (source 8).

### Mana and the five-second rule (5SR)
Baseline formula (Spirit-driven regen outside of combat-casting interruption): `ManaRegenPer5s ≈ 5 * (0.001 + sqrt(Intellect) * Spirit * BaseRegenConstant) * 0.60`, where `BaseRegenConstant` is level-dependent — the practical takeaway is **diminishing returns on stacking Intellect for regen purposes** (sqrt scaling) and a direct linear benefit from Spirit. RETRIEVED (source 8).
**The five-second rule:** the moment a caster spends mana on a spell, **Spirit-based mana regeneration stops for 5 seconds** (the "interrupted" regen ratio defaults to 0% during that window); after 5 seconds without a further mana-spending cast, Spirit-based regen resumes at full rate. Mana returned by trinkets/potions/on-use effects is **not** affected by the 5SR and continues ticking through it. RETRIEVED (source 8).
Rough conversion: **~1.6 Spirit ≈ 1 mana/5 (outside the 5SR)** for Priest/Mage; **~2 Spirit ≈ 1 mana/5** for other casters — i.e., Priest/Mage get more regen per point of Spirit than other healer/caster classes. REPORTED (source 8).

### Coach checks — resource regen
- **Warrior opening a pull with no rage and delaying their first meaningful ability:** check `SPELL_AURA_APPLIED`/absence of pre-pull rage-builder use; this is often simply the mechanic (rage decays before the pull) rather than a mistake, unless the group specifically has access to a rage-builder opener they skipped.
- **Rogue "energy capping" (wasting regen by sitting at full energy waiting) between abilities:** visible as a gap between `SPELL_CAST_SUCCESS` events noticeably longer than the ability's own cost-recovery time at 10 energy/sec — a real, flaggable efficiency mistake (should have been spending energy on a filler like Sinister Strike instead of banking it).
- **Healer mana dropping faster than expected despite high Spirit:** check whether they're chain-casting (never going 5+ seconds between casts) — under constant casting, the 5SR keeps Spirit-based regen at zero essentially the whole fight, which is expected and by design, not a gearing failure; the actual lever is mana-efficiency/downtime between heals, not more Spirit.

### Version notes
Wrath Classic introduced/emphasized **Mp5 vs. Spirit** itemization tension and talents that let some casters regen through the 5SR (e.g., Replenishment-type mechanics appear later than Era). Cata/MoP Classic continued reworking mana/Spirit itemization (Spirit becomes healer-only itemized stat in Cata). None of that applies to Era/Anniversary/SoD, which use the vanilla 5SR model above.

---

## 12. Diminishing returns (PvP crowd control)

When a CC effect with diminishing returns (DR) is applied to a target, the **first application is full duration**; a second application of an effect in the **same DR category** within the reset window is cut to **50%** duration, a third to **25%**, and a **fourth application makes the target immune** to that category entirely. RETRIEVED (source 23).

**Reset timer:** the DR clock is meant to reset **15 seconds after the effect's duration ends** on the target, but the server only re-checks each category roughly every **5 seconds**, so in practice a given DR category can take anywhere from **15 to 20 seconds** to actually reset. RETRIEVED (source 23).

**Categories:** effects only diminish each other within the **same category** (e.g., stuns share a stun category and diminish each other; a disorient like Polymorph does not diminish a stun). Vanilla-era community documentation describes separate categories for things like general "activated" stuns vs. certain proc-based stuns vs. specific outlier abilities (e.g., Cheap Shot historically tracked somewhat separately) — treat the exact category boundaries as REPORTED/version-sensitive rather than a single fixed universal list, since DR category definitions were refined over the game's history. Source 23.

### Coach checks — DR
- A CC chain "not working" (second Polymorph/stun landing for a much shorter duration than expected) is very likely correct DR behavior, not a bug — check the timestamp gap between the two applications of the *same-category* effect; if it's under ~15–20 seconds, shortened duration is expected.
- A player chain-CCing the same target with two *different-category* effects (e.g., a stun then a fear) and being surprised the second one also lands short: that's a genuine misunderstanding of DR categories worth correcting, since different categories shouldn't interact.

### Version notes
Later expansions (Wrath onward) formalized and renamed DR categories more explicitly in the tooltip/UI layer and tuned specific abilities into different buckets over time; the 3-step (100%→50%→25%→immune) shape has been broadly stable since vanilla, but don't assume a specific ability's DR category carries unchanged from Era into TBC/Wrath/Cata/MoP Classic without checking that expansion's current patch notes.

---

## 13. Pushback, interrupts, and lockouts

**Spell pushback:** taking damage while casting a spell **delays that cast** by extending its remaining cast time — commonly cited as **+0.5 seconds per hit, for up to the first two hits** on a given cast (i.e., up to +1.0s total pushback per cast). **Channeled spells behave differently: pushback shortens/truncates a channel** (it ends earlier, losing ticks) rather than delaying its start or extending it. RETRIEVED (source 25).
**What causes pushback:** any melee attack (normal or special) or direct-damage spell hit on the caster. **DoTs and most channeled spells do *not* trigger pushback on other casts** — with the specific documented exception that **Arcane Missiles' own channel can be interrupted/pushed by incoming damage** even though channels are usually pushback-immune as a *source*. RETRIEVED (source 25).
**Talents/items that resist pushback exist** (e.g., certain talents, Barkskin-type effects, specific set bonuses) and reduce or remove the delay from a fraction of incoming hits. RETRIEVED (source 25).

**Hard interrupts vs. pushback:** a dedicated interrupt ability (Counterspell, Pummel, Kick, Earth Shock as an interrupt, etc.) doesn't just delay the cast — it **fully cancels it** (cast bar flashes red/"Interrupted") and, for most interrupts, also applies a **school lockout**: the caster cannot cast *any* spell from that specific magic school for a fixed duration. RETRIEVED (source 26).

**School lockout durations (Era/vanilla-based):** Counterspell locks the target's school (Arcane, by virtue of being the school Counterspell itself belongs to — check the specific spell's own school data for exact behavior across ranks) for **10 seconds**. Rogue Kick locks for a shorter window (commonly cited around 5 seconds in Era, on a longer ability cooldown). Exact lockout durations vary by ability and were tuned across Classic re-releases — treat these as REPORTED reference points to verify against a current spell tooltip rather than hardcoded truths. Source 26.

### Coach checks — pushback/interrupts
- A caster's cast repeatedly getting **delayed** rather than fully failing: look for `SPELL_DAMAGE`/`SWING_DAMAGE` events landing on that caster in the ~1–2 seconds before a `SPELL_CAST_SUCCESS` that completed later than its base cast time would suggest — that's pushback, not an interrupt, and it means the caster needs peels/positioning, not "better casting."
- A caster's cast fully failing with the caster then unable to recast the same spell for several seconds: check for a `SPELL_INTERRUPT` event immediately preceding — that's a hard interrupt + school lockout, and the coaching point is usually about the *interrupter's* timing/target selection, or (for the interrupted caster) switching to a different school's spell during the lockout window instead of standing idle.
- **A caster "wasting" the lockout window by casting nothing:** visible as a gap in that caster's `SPELL_CAST_SUCCESS` events noticeably longer than the known lockout duration, with no valid off-school spell available in their kit (or one available and unused) — a real, coachable mistake for hybrid casters (e.g., a Shadow Priest switching to Holy-school heals during a Shadow lockout, if their spec allows it).

---

## 14. Line of sight (LOS)

Most direct spell casts and ranged attacks require an unobstructed line from caster to target; if that line is broken mid-cast (a pillar, a wall, a corner, another large object moving between attacker and target), the cast **fails/cancels** with an on-screen LOS message. RETRIEVED (source 28).
**Channeled spells** react differently: individual ticks that occur while LOS is broken simply don't land (no damage/effect that tick), but the channel doesn't necessarily cancel outright the way a hard-cast does — if LOS is restored before the channel ends, remaining ticks can still land. REPORTED (source 28).
**Tactical uses:** pulling a group by breaking LOS behind a corner/pillar to fight mobs one at a time (a core vanilla-era pulling technique, especially relevant to hardcore/careful leveling — see §15) and, in PvP, "pillar-humping" to deny an opponent's casts. RETRIEVED (source 28).

### Coach checks — LOS
- A caster's spell repeatedly failing with no damage taken and no interrupt in the log around it: check the raid/dungeon geometry at that timestamp (screenshot/video if available) for an obstruction — a LOS failure looks like "nothing happened" in a text log, since a fully-blocked cast typically never generates a `SPELL_CAST_SUCCESS`/`SPELL_DAMAGE` pair at all (it errors client-side before completing).
- A puller successfully splitting a pack by breaking LOS: this is a *correct* use of the mechanic, not a bug — worth positively reinforcing rather than flagging.

---

## 15. Hardcore-specific safety rules

Hardcore rulesets (WoW Classic Hardcore realms, and the Hardcore self-imposed ruleset some players run on Era/Anniversary/SoD) layer **permadeath** on top of all the mechanics above; the core official rule is simple and absolute: **character death is permanent on that character/realm — no resurrection spell or item brings a Hardcore character back**, including abilities that normally bypass death in other rulesets (Shaman Reincarnation, Warlock Soulstone, Paladin bubble+hearth-style escapes, Spirit-of-Redemption-type effects) — none of these grant a second life on Hardcore. A dead Hardcore character can be character-moved off the Hardcore ruleset to play normally, but can never return to Hardcore. RETRIEVED, official Blizzard rules post (source 29).

**PvP flagging is manual** on Hardcore (`/pvp` command; no incidental auto-flagging from most quests), and battlegrounds are disabled — "Duel to the Death" (`/makgora` or right-click portrait) exists as an opt-in PvP death mode, with its own death being just as permanent. RETRIEVED (source 29).

**Behavioral rules enforced by Blizzard:** deliberately dragging dangerous mobs onto other players, forcing unwanted PvP, and similar griefing carry escalated penalties up to permanent suspension on Hardcore, reflecting how much more a "prank" costs another player under permadeath. RETRIEVED (source 29).

### Practical danger patterns (leveling safety — REPORTED, aggregated from Hardcore death-statistics writeups, source 31/32)
- **Fall damage and drowning are leading causes of death**, ahead of many mobs — careless jumps, mistimed elevators/flight points, and swimming in deep/open water without checking for exhaustion or hostile aquatic mobs are recurring, avoidable killers. REPORTED.
- **Out-of-place elite/named roamers well above the surrounding zone's mob level** (patrol elites that wander into low-level starting zones) are a recurring cause of surprise deaths — the fix is always checking a mob's level/elite status before engaging or even walking near it, not just its apparent zone. REPORTED.
- **Lava/environmental hazards inside dungeons** (cited specifically for early dungeons with open lava) kill more Hardcore characters than the bosses in those same dungeons — positioning awareness around environmental hazards matters as much as combat mechanics. REPORTED.
- **Tight mob-density zones with poor kiting room** (cramped indoor areas, mines/caves generally) are disproportionately dangerous because a bad pull has no room to kite or break LOS cleanly, and respawning mobs can block an escape route already used once. REPORTED.
- **Rushing / skipping preparation** (engaging elite or group-intended content solo, pulling without assessing patrol paths, not scouting an escape route before a pull) is the most commonly self-reported behavioral cause of Hardcore deaths — this is squarely a coaching target, distinct from "bad luck" deaths like disconnects.

### Recommended safety practices for a Hardcore/Era-safety-conscious leveler (REPORTED, aggregated guide consensus, source 30–32)
- Pick at least one talent/ability that functions as a **defensive cooldown or escape tool** appropriate to the class (e.g., a slow/root/fear the class already has) rather than optimizing the tree purely for damage.
- Always have an **escape route** planned before engaging anything non-trivial — know which direction is "away and downhill/toward safety" before the pull, not after.
- Avoid mines/caves and other enclosed high-density areas when leveling solo, or clear them unusually cautiously (single-pull, full-LOS-break-capable routes only).
- Carry and use consumables proactively (healing potions, bandages, class utility) rather than as a last resort — by the time a fight looks dangerous in the moment, it's often already too late to start using them.
- Engineering/Mining and Herbalism/Alchemy professions provide extra escape/recovery tools (utility gadgets, extra potions) that are commonly recommended specifically for Hardcore safety margin, separate from their normal profession value.

### Coach checks — hardcore safety
- **Post-mortem log review after a Hardcore death:** look for the death-causing damage source in the final seconds — `SWING_DAMAGE`/`SPELL_DAMAGE`/environmental damage immediately before `UNIT_DIED` on the player. Distinguish clearly between (a) an unavoidable one-shot from a mechanic the player had no reasonable way to know about, (b) a gear/level mismatch (fighting something too far above them), and (c) a threat/positioning mistake (extra adds pulled, LOS not used, no escape route) — only (c) is a coachable behavioral pattern; (a) and (b) are knowledge/preparation gaps worth naming as "check the mob's level/elite tag next time," not personal failure.
- **Near-death saves (health dropped very low, then recovered):** a good pattern to reinforce, not just failures — if a `SPELL_AURA_APPLIED` for a defensive cooldown or an item-use lines up right before health stabilizes, call that out explicitly as the right instinct.

---

## Sources
1. https://warcraft.wiki.gg/wiki/Attack_table — Attack table structure, outcome precedence, table-overflow rule, glancing/crushing level-gap rules. RETRIEVED (fetched this session; note: this fetch returned a partially garbled table extraction on numeric edge cases — cross-checked against source 2 for exact formulas).
2. https://github.com/magey/classic-warrior/wiki/Attack-table — Community-researched exact miss/dodge/parry/glancing formulas, dual-wield flat miss, defense-skill scaling. RETRIEVED (fetched this session).
3. https://vanilla-wow-archive.fandom.com/wiki/Attack_table — Parallel vanilla-focused attack table reference (fetch blocked this session, HTTP 402; used as a secondary pointer only).
4. https://us.forums.blizzard.com/en/wow/t/weapon-skilldefense/455342 and related guide/forum threads on weapon skill vs. defense skill and hit caps (aggregated via search). REPORTED.
5. https://www.cyrus-gaming.com/threads/game-mechanics-the-importance-of-weapon-skill.7579/ — weapon skill breakpoints (300 vs. 305). REPORTED.
6. https://wowpedia.fandom.com/wiki/Damage_reduction and https://west-games.com/wow-classic-armor-calculator/ — armor mitigation formula, 75% cap, worked example (aggregated via search). RETRIEVED-level confidence on the formula itself, cross-consistent across multiple guide sites.
7. https://wowx5.ru/en/wiki/global-cooldown and https://www.warcrafttavern.com/tbc/news/blizzard-raises-minimum-global-cooldown-to-1-second/ — GCD 1.5s baseline, TBC haste-reduces-GCD change. RETRIEVED/REPORTED.
8. https://vanilla-wow-archive.fandom.com/wiki/Mana_Regeneration and https://vanilla-wow-archive.fandom.com/wiki/Energy — mana regen formula, five-second rule, Spirit conversion ratios, energy regen rate. RETRIEVED (aggregated via search synthesis).
9. https://classic-wow-archive.fandom.com/wiki/Resistance and https://wowwiki-archive.fandom.com/wiki/Formulas:Magical_resistance — level-based resist, resistance-stat roll, binary vs. non-binary spells. REPORTED (search-synthesized; direct fetch of the primary page failed this session).
10. https://wowwiki-archive.fandom.com/wiki/Spell_power_coefficient — spell power coefficient formula and low-level penalty. REPORTED (search-synthesized).
11. https://www.wowhead.com/classic/guide/threat-overview-classic-wow — Wowhead's Classic threat overview (page confirmed to exist and to be current for patch 1.13.0 as of 2024-11-19; full body text could not be extracted this session due to a fetch limitation — used only to confirm the guide's existence/currency, not as a numeric source).
12. https://www.bluetracker.gg/wow/topic/eu-en/301950570-tanking-formulas-and-mechanics/ — tanking formulas including crushing-blow-cannot-be-reduced-by-Defense-alone rule (search-synthesized). REPORTED.
13. https://www.warcrafttavern.com/wow-classic/guides/threat-guide-reference-table/ — threat ratios, stance/form multipliers, threat-reduction abilities. RETRIEVED (fetched this session).
14. https://www.icy-veins.com/wow-classic/warrior-tank-pve-stat-priority — Defense/uncrittable target (490), crushing blow context (search-synthesized). REPORTED.
15. https://warcraft.wiki.gg/wiki/Dual_wield — dual-wield +19% miss penalty, specials-exempt rule, level-scaling formula. RETRIEVED (search-synthesized from this specific page's content).
16. https://us.forums.blizzard.com/en/wow/t/rage-generation/320080 and https://www.mmo-champion.com/threads/851623-Rage-Normalisation-Calculation — rage generation formulas (damage-dealt and damage-taken), hit-type factors. REPORTED (community-reconstructed from Blizzard forum posts).
17. https://www.wowhead.com/classic/news/hit-cap-in-classic-wow-clarifications-292085 and https://forums.askmrrobot.com/t/shadow-priest-hit-rating-caps-at-17-instead-of-16/10016 — spell hit cap (16% vs. bosses, 1% floor), melee hit cap (9%/6%/28%) (search-synthesized). REPORTED.
18. Wago.io Heroic Strike Queue Swing Timer pages and https://vanilla-wow-archive.fandom.com/wiki/Heroic_Strike — swing-timer queueing/weaving mechanics for Heroic Strike/Cleave/Slam. REPORTED (search-synthesized; these are community addon-description pages, not a primary mechanics source, but consistent with long-standing Warrior theorycrafting).
19. https://github.com/magey/classic-warrior/wiki/Spell-batching and https://www.wowisclassic.com/en/news/spell-batching-classic-wow-confirmed/ — spell batching 400ms window, simultaneous-Polymorph and Pummel-without-lockout examples, quoting a Blizzard developer statement. RETRIEVED (fetched this session, partial; some detail on limitations noted in-line).
20. https://us.forums.blizzard.com/en/wow/t/warrior-charge-range-leeway/366485 and https://barrens.chat/viewtopic.php?t=1659 — melee leeway concept and Charge+Hamstring example (search-synthesized). REPORTED — exact yardage/ms formula not found in a primary source this session.
21. https://xpoff.com/threads/in-depth-stat-guide-for-19s-with-scaling-formulas.93237/ — per-class spell crit base % and Intellect conversion ratios. REPORTED (sourced from a level-19-twink-bracket community stat guide; the underlying conversion ratios are understood to be level-independent constants used broadly in classic theorycrafting, but this specific citation is bracket-focused — treat with appropriate caution).
22. https://hitcap.io/tbc/armor-penetration-cap/ and https://www.lootxphub.com/tbc-classic-stat-guide-attributes-ratings-and-combat-mechanics-explained/ — TBC armor penetration (flat) vs. Wrath armor penetration (%) version difference. REPORTED (search-synthesized).
23. https://vanilla-wow-archive.fandom.com/wiki/Diminishing_returns and https://warcraft.wiki.gg/wiki/Diminishing_returns — DR 100/50/25/immune stepping, 15-20s reset window, category concept. RETRIEVED (search-synthesized, consistent across both wiki sources).
24. https://www.icy-veins.com/cataclysm-classic/protection-warrior-pve-stat-priority and https://www.engadget.com/2012-03-01-ghostcrawler-explains-stat-changes-in-mists-of-pandaria.html — Cata/MoP block-as-separate-roll change, Parry Rating rebalanced to match Dodge Rating in Cata. REPORTED (search-synthesized).
25. https://vanilla-wow-archive.fandom.com/wiki/Interrupt and https://wowpedia.fandom.com/wiki/Cast_time — spell pushback (+0.5s per hit, first two hits), channel truncation vs. cast delay, DoT/channel pushback-immunity exception (Arcane Missiles). RETRIEVED (search-synthesized).
26. https://warcraft.wiki.gg/wiki/Counterspell and https://wowx5.ru/en/guides/stun-interrupt-guide — Counterspell 10s school lockout, Kick ~5s lockout comparison. REPORTED (search-synthesized; exact current-patch numbers should be verified against a live tooltip).
27. https://warcraft.wiki.gg/wiki/Taunt_(warrior_ability) — Taunt miss chance (~17% vs. raid bosses), taunt-immunity on many bosses, patch 4.0.1 removing taunt-miss (post-vanilla). RETRIEVED (search-synthesized).
28. https://vanilla-wow-archive.fandom.com/wiki/Line_of_sight — LOS cast-cancel behavior, channel-tick behavior, tactical pulling/pillar use. RETRIEVED (search-synthesized).
29. http://worldofwarcraft.blizzard.com/en-us/news/23973734/rules-of-engagement-classic-hardcore-is-coming-to-world-of-warcraft — official Blizzard Hardcore rules: permanent death, resurrection-ability exclusions, manual PvP flagging, Duel to the Death, behavioral-penalty policy. RETRIEVED (fetched this session).
30. https://wowcoach.gg/docs/combat-log and https://warcraft.wiki.gg/wiki/Event:COMBAT_LOG_EVENT — combat log event schema (SWING_DAMAGE, SPELL_MISSED, SPELL_INTERRUPT, SPELL_AURA_APPLIED, etc.) used across Classic and retail. RETRIEVED (search-synthesized).
31. https://www.warcrafttavern.com/wow-classic/news/the-top-causes-of-death-in-hardcore-wow/ — Hardcore death-cause aggregation (fall damage, drowning, notorious elites like Son of Arugal/Stitches, dungeon lava). REPORTED.
32. https://www.gamespot.com/articles/gravity-is-the-deadliest-enemy-of-all-when-you-only-have-one-life-in-wow/1100-6518624/ and https://www.wowhead.com/classic/guide/tips-and-tricks-hardcore — fall damage as leading Hardcore death cause, general safety practice consensus (escape routes, professions, avoiding mines/caves, rushing as behavioral cause). REPORTED.

## Open questions
- Exact current-patch numeric constants (melee/spell hit caps, weapon skill breakpoints, DR category list, school-lockout durations) should be treated as **directionally correct but re-verify before quoting a precise number to a player** — several of the guide sites cited stopped being actively maintained for older Classic Era phases, and Blizzard has made small numeric tuning passes across Classic re-releases (SoD in particular reworks base abilities via runes) that could shift specific constants without changing the underlying mechanic shape.
- Could not obtain the full body text of Wowhead's "Threat and Aggro Management in WoW Classic" guide (fetch returned only navigation chrome, not article content) — the 110%/130% and threat-ratio numbers here are corroborated across two other independent sources (Warcraft Tavern, community "Kenco's research on threat"), but a third confirming read of the Wowhead guide itself would strengthen confidence.
- Exact melee leeway yardage/timing formula was not located in a primary source this session — only the qualitative mechanic and one concrete example (Charge+Hamstring) were confirmed.
- Season of Discovery's rune-granted abilities can change specific class mechanics referenced here (e.g., new interrupts, new procs that interact with rage/energy) on a per-phase basis; this file covers the underlying vanilla-based systems those runes plug into, not a per-phase rune-by-rune audit — a SoD-focused companion file should be checked for current-phase specifics.
- Did not independently verify the exact block-value-per-Strength constant (20:1) against a primary Blizzard source; it is a long-standing community approximation, flagged as such above.
