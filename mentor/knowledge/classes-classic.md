topic: Classic-era class and spec fundamentals (all 9 vanilla classes)
applies-to: Classic Era / Hardcore (permanent, live), Season of Discovery (concluded at Phase 8 "Scarlet Enclave", maintenance mode, no new content), Mists of Pandaria Classic (brief notes only, live as of fetch date)
fetched: 2026-09-25
sources: 24 (listed at the end)

## Method note (read before using this file)

Wowhead's Classic guide pages (`wowhead.com/classic/guide/...`) are React-rendered; this session's WebFetch tool only returned the page shell (header/nav/comments), not the article body, on every attempt. Icy Veins returned HTTP 403 to WebFetch on every attempt. Where this file cites those two sites, the content came from WebSearch's synthesized-snippet results (which do quote real page text and return the URL) rather than a full fetched page — labeled **REPORTED** unless a second, directly-fetched source (Warcraft Tavern, warcraft.wiki.gg, or another site WebFetch could render) corroborated it, in which case it's **RETRIEVED**. Pure game-mechanics reasoning (how a rubric check maps to a class's specific spells) is labeled **INFERRED**. This session's WebSearch quota was exhausted before Priest/Druid cooldown specifics and the elixir-stacking rule could get a dedicated search; the elixir rule and world-buff list were confirmed by direct WebFetch instead (see below), but Priest/Druid cooldown lists rely more heavily on INFERRED reasoning from mechanics established elsewhere in this file — flagged inline.

## Version landscape as of 2026-09-25 (RETRIEVED)

- **Classic Era** and **Hardcore** permanent realms are both live now, unpatched vanilla 1-60 content. [1]
- **Season of Discovery (SoD)** reached Phase 8 ("Scarlet Enclave"), the final phase; Blizzard confirmed no new phases and no fresh SoD realm — it's in maintenance mode but realms and characters remain playable. [1]
- **Mists of Pandaria Classic** is live and progressing through its own phase cadence (Phase 3 running into 2026, Phase 5 "Siege of Orgrimmar" targeted for summer 2026). It is a different game from 1-60 vanilla in almost every system; see the MoP notes per class below and the shared talent-system note. [2]
- This file's main body is vanilla 1-60 (Classic Era / Hardcore), with a per-class **SoD runes** callout and a brief **MoP Classic differs** callout. Burning Crusade/Wrath/Cataclysm Anniversary realms are out of scope for this file.

## Shared mechanics that apply to every class below

- **Elixir/flask stacking (RETRIEVED, warcraft.wiki.gg via WebFetch):** guardian elixirs don't stack with other guardian elixirs, battle elixirs don't stack with other battle elixirs — you can have exactly one of each active at a time. A flask counts as both a battle and a guardian elixir simultaneously (and its buff survives death), so drinking a flask occupies both slots. [3]
- **Major world buffs (RETRIEVED, Warcraft Tavern via WebFetch):** Rallying Cry of the Dragonslayer (+10% spell crit, +5% melee/ranged crit, +140 AP, 120 min, from turning in a dragon head in a capital), Songflower Serenade (+15 all stats, +5% spell/melee/ranged crit, 60 min, Felwood plants), Warchief's Blessing (Horde only: +300 HP, +15% melee haste, +10 MP5, 60 min), DM Tribute buffs (+15% max HP, +200 AP, +3% spell crit, 120 min, Dire Maul North), Sayge's Fortune (selectable, ~10% damage or a stat buff, 120 min, Darkmoon Faire), Spirit of Zandalar (+10% move speed, +15% all stats, 120 min), plus shorter zone buffs (Songflower/Resist Fire/Lordaeron's Blessing/Traces of Silithyst). [4] These stack with each other (they aren't elixirs) and are why "world-buffed" raids look very different from a fresh-logged-in character — a mentor should treat DPS/HPS numbers from a world-buffed log as not directly comparable to an unbuffed one.
- **Generic mistake rubric (this repo, `rubrics/_generic.md`):** idle time, resource capping, missed interrupts, late cooldowns, and dying to avoidable damage are class-agnostic checks already defined there. The per-class "common mistakes" below are the class-specific instances of those same checks — cite the specific event, not just the category.

---

## Warrior

**Role(s) in raid/dungeon (INFERRED from class design, consistent with [5][6]):** Protection tanks the main/off-tank slots; Fury (dual-wield) is the standard raid DPS spec; Arms sees some raid use for its high burst/Mortal Strike healing-reduction debuff on specific progression fights. Warriors provide Battle Shout (party AP) and, situationally, Demoralizing Shout.

**Core rotation/priority:**
- DPS (REPORTED, [5]): keep Battle Shout up; below ~20% target health, Execute is the priority; above that, Overpower whenever the target is dodged (it has a short window), otherwise Heroic Strike/Whirlwind/Mortal Strike on cooldown as rage allows. Rotation is rage-gated, not GCD-gated — abilities queue behind whatever rage you have.
- Tank (REPORTED, [6]): open with Sunder Armor to build the 5-stack debuff quickly, then hold 5 stacks on the primary target for the raid's physical DPS, filling rage with Shield Slam (best threat-per-rage) and Revenge when available.
- Weapon speed matters more than most classes: a slow, high-top-end weapon out-damages a faster low-damage one because white-damage scaling and Heroic Strike/Cleave rage-dump efficiency both favor big hits. [5]

**Key cooldowns:**
- Death Wish / Recklessness / Berserker Rage — offensive; time Death Wish so it's active through as much of Execute phase as possible rather than popping it on pull. [7]
- Shield Wall / Last Stand (Protection) — defensive, save for a spike or an enrage-timer wipe risk, not routine damage.
- Bloodrage — early-fight or when rage-starved; costs health, so don't use it with a healer not yet topping you off.

**Stat priority (REPORTED, [5][6]):** weapon DPS/top-end damage first (exponentially more valuable than for other classes), then Strength, then Stamina, then Agility (crit/dodge), then hit/crit. Tanks weight Stamina and Defense/avoidance higher for survivability once threat is secure.

**Leveling spec & tips (REPORTED, [7][8]):** Arms is the commonly recommended leveling path (Warcraft Tavern: respec toward the full Arms build around level 30 for Sweeping Strikes; Icy Veins snippet: "respec to full Arms at level 30... follow its talents until 60"). Early points go into Improved Rend/Improved Charge. Keep a stock of food and bandages — Warrior downtime between pulls is real since there's no self-heal. A swing-timer addon helps queue Heroic Strike correctly. Target same-level or slightly-under mobs; Warriors are one of the weaker solo levelers early on.

**Common mistakes that show up in logs (INFERRED mapping of known Warrior mechanics onto log events):**
- **Rage capping:** advanced-logging power field sits near max rage across several consecutive `SWING_DAMAGE` events with no `SPELL_CAST_SUCCESS` for Heroic Strike/Cleave in between — rage is overflowing and being wasted. Ties to generic rubric G7.
- **Buff lapse:** `SPELL_AURA_REMOVED` for Battle Shout with no reapplying `SPELL_CAST_SUCCESS` for a long stretch while the party is in combat — a free raid-wide AP loss.
- **Tank Sunder gap:** no `SPELL_CAST_SUCCESS` of Sunder Armor in the first few GCDs of a pull, or `SPELL_AURA_APPLIED_DOSE` showing the 5-stack dropping and not being rebuilt promptly — threat and raid DPS both suffer.
- **Missed Overpower:** an enemy `SPELL_MISSED` (subtype `DODGE`) by the Warrior's swing with no Overpower `SPELL_CAST_SUCCESS` in the following few seconds — the proc window was let go.

**Consumables/world buffs relevance:** Warriors are prime beneficiaries of AP-focused world buffs (Rallying Cry, DM Tribute) and Stamina-heavy raid buffs for tanks. Standard raid consumables: Strength/Agility battle elixirs (e.g., a Juju or Elixir of the Mongoose-type buff), a Stamina guardian elixir for tanks, weapon sharpening stones/oils, and Rage-adjacent items like Free Action Potion for CC immunity.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Warrior overview, [9]):** Hamstring to slow and disengage from a single mob, Piercing Howl against multiple, Intimidating Shout as the emergency fear-and-run button (fears up to 5 nearby enemies). Warriors are named as one of the weaker Hardcore classes: no self-heal, very immobile once Intercept is on cooldown, vulnerable to disease/poison, and highly gear-dependent — the guide's advice is "if you pull 3+ mobs, just run."

**SoD runes (RETRIEVED via WebSearch synthesis, [10]):** relatively light changes overall; notable runes include Precise Timing (Slam becomes instant, 6s cooldown), Blood Surge (chance for Heroic Strike/Bloodthirst/Whirlwind to make the next Slam free and instant), and Enraged Regeneration (heals 30% of max health over 10s, usable only while Enrage/Berserker Rage/Bloodrage is active) — the last one is Warrior's only real self-heal and changes Hardcore viability materially.

**MoP Classic differs (INFERRED, not verified this session beyond the general talent-system note below):** the whole spec/rotation model changes — Fury becomes the primary DPS identity built around a different resource flow, Protection gains active-mitigation cooldowns, and the vanilla concepts of "stance dancing for rage" and "weapon-speed-first itemization" are gone. Treat any vanilla Warrior rotation advice as inapplicable in MoP.

---

## Paladin

**Role(s) in raid/dungeon (INFERRED, consistent with class-design consensus and [11]):** primarily a Holy healer in vanilla raids — Paladins bring irreplaceable raid utility (Blessings, Auras, Cleanse, Hand of Freedom/Salvation/Protection) that keeps them raid-relevant even though Retribution is a weak vanilla raid DPS spec. Alliance-only in vanilla.

**Core rotation/priority (mixed confidence — see labels):**
- Leveling/solo Retribution (REPORTED, [12]): Judgement of Righteousness/Wisdom on cooldown, Seal of Command (needs a slow weapon, ≥3.5 speed, to get reliable procs) or Seal of Righteousness with a fast weapon, Consecration/Hammer of Justice as available. One search result describing "Judgement and Consecration as the two-spell core, with Vengeance procs" appears to blend later-era Retribution mechanics (Vengeance is not a vanilla talent) — treat that specific claim as **unconfirmed for vanilla** and don't repeat it as fact without rechecking a vanilla-specific source.
- Holy healer: reactive Flash of Light/Holy Light triage plus Blessing/Judgement management between heals; Paladins in vanilla raids are primarily single-target healers assigned to the tank(s).

**Key cooldowns:** Divine Shield/Blessing of Protection (emergency, situational — can prevent physical damage/CC but has the well-known vanilla forbearance interaction), Lay on Hands (full-heal, once per fight, save for a genuine emergency not routine top-off), Blessing of Sacrifice for redirecting damage from a squishier ally.

**Stat priority (REPORTED, [12]):** Strength and Spirit roughly equal, then Agility, then Stamina, then Intellect. Weapon damage range matters specifically because Seal of Command's damage is calculated from it.

**Leveling spec & tips (REPORTED, [12]):** straightforward Retribution path from 1-32 using Blessing of Wisdom for sustain; the guide notes respeccing around level 32 once 3/5 Reckoning is available, shifting toward an AoE-grinding build for multi-mob pulls.

**Common mistakes that show up in logs (INFERRED):**
- **Seal not maintained:** long gaps with no Seal-related `SPELL_AURA_APPLIED` while the Paladin is actively attacking — Seals fall off on their own timer/on cast of another Seal, and forgetting to refresh loses a large chunk of damage.
- **Judgement off cooldown, not used:** in a long fight, gaps between Judgement `SPELL_CAST_SUCCESS` events wider than its cooldown — generic rubric G6 (late/missed cooldown), Paladin flavor.
- **Reactive-only healing:** tank health drops (repeated `SWING_DAMAGE`/`SPELL_DAMAGE` against the tank) with the first responding heal `SPELL_CAST_SUCCESS` arriving late relative to the spike, rather than a HoT or pre-heal already in flight.

**Consumables/world buffs relevance:** as a hybrid, Paladins benefit from whichever buff category matches their current role — Spirit/Int consumables for healing mana, Strength/AP for Retribution leveling or off-spec DPS pulls.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Paladin overview, [13]):** called out as "the safest of all melee classes" due to strong self-healing, high passive mitigation from mail/plate, and low downtime; weaknesses are below-average kill speed and heavy mana dependence, with kill speed tied almost entirely to weapon quality. Hardcore stat priority leans harder into Stamina than standard Classic play.

**SoD runes (RETRIEVED via WebSearch synthesis, [14]):** Retribution gets a major rework — Seal of Martyrdom and Exorcist (both formerly rune-gated) become baseline, closing the old "mostly auto-attacking" gap in the Retribution rotation. Rune counts shrank each phase (12 in Phase 1 down to 1-2 by Phase 5); Phase 4 moved some older rune effects into the trainer skill book and replaced them with new runes.

**MoP Classic differs (INFERRED):** Retribution gains the Holy Power resource system (a combo-point-like mechanic replacing the vanilla Seal/Judgement loop), and the vanilla "Ret is a weak raid spec" reality no longer holds — treat vanilla Paladin DPS advice as inapplicable in MoP.

---

## Hunter

**Role(s) in raid/dungeon (INFERRED, standard class design):** pure ranged DPS in every version covered by this file — Hunter did not gain a tank or healer option even under SoD's rune system, unlike Shaman/Mage/Warlock/Druid. Provides Trueshot Aura equivalent buffs and pet utility (off-tanking adds, tracking).

**Core rotation/priority (REPORTED, [15][16]):** open with Hunter's Mark, then let Auto Shot carry most of the damage while weaving Serpent Sting (keep it up) and Arcane Shot between shots; Multi-Shot takes priority when facing several targets. Icy Veins' endgame guide snippet frames it as "maximize Auto Shot usage, use abilities in the downtime between shots," including deliberate choices about whether to delay a special ability so it doesn't overlap/clip the next Auto Shot.

**Key cooldowns:** Rapid Fire (attack-speed cooldown, pair with a trinket/other cooldown for a burst window), Bestial Wrath (Beast Mastery — a strong, low-cooldown pet+self damage cooldown that the guide snippet says should be used "whenever available"), Feign Death (defensive/threat-drop and, in Hardcore, a combat reset).

**Stat priority (REPORTED, [16]):** ranged weapon damage/DPS first (auto shot is most of your damage), then Agility, then Stamina; Strength is low value (mostly a pet-damage stat, not the Hunter's own damage) and Spirit is low priority because a well-played Hunter regenerates most of its mana naturally while the pet tanks.

**Leveling spec & tips (REPORTED, [16]):** Beast Mastery is the recommended leveling spec — Improved Aspect of the Hawk, Improved Revive Pet, and Frenzy all matter, and Bestial Wrath is what makes the spec strong even in low-level gear. Marksmanship out-DPSes at level 60 but is worse to level with; Survival is not recommended for leveling. From level 10 (pet available), kill speed and downtime both improve sharply because the pet tanks and Serpent Sting + Auto Shot can kill things with little Hunter mana spent.

**Common mistakes that show up in logs (INFERRED):**
- **Pet not engaged on pull:** no pet-source `SPELL_CAST_SUCCESS`/`SWING_DAMAGE` in the first several seconds of a fight — the Hunter is eating avoidable damage and losing pet DPS.
- **Serpent Sting lapse:** `SPELL_AURA_REMOVED` for Serpent Sting with a long gap before the reapplying `SPELL_CAST_SUCCESS` — lost DoT uptime, generic rubric G6/G7 flavor.
- **Auto Shot clipping:** ranged `SWING_DAMAGE` events arriving noticeably closer together than the weapon's swing speed suggests a special ability was fired at the wrong moment in the swing timer, resetting it early — a well-known Classic Hunter mechanic; flag it if the pattern repeats, but don't assert an exact "lost DPS" number without a parse tool.

**Consumables/world buffs relevance:** ammo (arrows/bullets with on-hit or stat effects) is a Hunter-specific consumable slot other classes don't have; otherwise standard Agility/AP world buffs and battle elixirs apply.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Hunter overview, [17]):** pet tanks for the Hunter, cutting a lot of risk if managed well; Feign Death can reset a fight that's going wrong. Named weaknesses: heavy pet dependence (a dead/mismanaged pet removes the class's main safety net) and needing to use Aspect of the Cheetah (root-breaks it doesn't have) carefully since it can't be used reactively mid-danger the way some other escape tools can.

**SoD runes (RETRIEVED via WebSearch synthesis, [10]):** Kill Command (a strong pet-empowering cooldown analogous to later expansions' version) and Resourcefulness (removes trap mana cost, cuts trap cooldowns) were called out as standout runes; Phase 6 added a Rune Broker vendor selling runes for 1 copper instead of requiring the original discovery quests.

**MoP Classic differs (INFERRED, not independently verified this session):** Hunters lose the Mana resource entirely in MoP (switch to Focus), which invalidates every vanilla Hunter mana-management and Spirit-stat note above for that version.

---

## Rogue

**Role(s) in raid/dungeon (INFERRED):** melee DPS only — no tank or healer option in vanilla or (per the SoD searches run this session) under SoD's rune system either, unlike the four hybrid classes. Brings Improved/Honor Among Thieves-style utility depending on patch/phase, plus poison-based utility debuffs.

**Core rotation/priority (REPORTED, [18]):** combo-point generator (Sinister Strike, or Backstab from behind) up to 5 combo points, then a finisher — Eviscerate for damage or Slice and Dice to extend attack speed, with Slice and Dice sometimes used early at low combo points if the target won't survive long enough to bank 5. Icy Veins' snippet explicitly frames this as priority-based rather than a fixed rotation.

**Key cooldowns:** Adrenaline Rush and Blade Flurry pair well together in AoE/cleave situations (REPORTED, [19]); Evasion is a damage-mitigation cooldown for when the Rogue is being focused by multiple attackers; Vanish is primarily an escape/reset tool rather than a damage cooldown.

**Stat priority (REPORTED, [18]):** Agility and Strength both matter for damage (Agility also adds crit and dodge), but Hit rating ranks unusually high for a DPS spec because most Rogue damage comes from auto-attacks/specials that can simply miss — a Rogue capped on Hit loses far less effective DPS than one who isn't.

**Leveling spec & tips (REPORTED, [18]):** Combat/Sword-and-dagger builds are common leveling choices; open from Stealth with Ambush when possible. Deadly Poison (or an equivalent) upkeep matters even while leveling.

**Common mistakes that show up in logs (INFERRED):**
- **Combo points overflowing:** several consecutive builder (`Sinister Strike`/`Backstab`) `SPELL_CAST_SUCCESS` events with no finisher in between once 5 points would already be available — wasted combo-point generation, generic rubric G7 flavor.
- **Poison lapse:** `SPELL_AURA_REMOVED` for a weapon poison's damage-proc buff with a long gap before reapplication — lost DPS uptime.
- **Not opening from Stealth:** the first `SPELL_CAST_SUCCESS` of a pull isn't a stealth-opener (Ambush/Garrote/Cheap Shot) despite a `SPELL_AURA_APPLIED` for Stealth immediately beforehand — the free burst/CC window was skipped.

**Consumables/world buffs relevance:** weapon poisons (rather than oils/stones) are the Rogue-specific consumable category; otherwise Agility/AP world buffs are the highest-value shared buffs.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Rogue overview, [17]):** Stealth lets a Rogue bypass dangerous areas entirely, and the class has "countless tools" for crowd control or escape; the flip side is that once Sprint and Vanish are both on cooldown, Rogues are immobile and vulnerable to slows, with limited self-healing and no innate disease/poison protection.

**SoD runes (RETRIEVED via WebSearch synthesis, [20]):** described as one of the more heavily reworked classes — new abilities (Saber Slash, Between the Eyes, Quick Draw) and runes (Combat Potency, Focused Attacks, Honor Among Thieves, Carnage, Cut to the Chase in Phase 3; Blunderbuss/Crimson Tempest/Fan of Knives added Phase 4) change rotation and gearing substantially from vanilla baseline.

**MoP Classic differs (INFERRED, not independently verified this session):** Energy regeneration and several finishers change, and Rogue gains new resource-adjacent mechanics; treat vanilla combo-point pacing advice as a starting point only, not a direct match.

---

## Priest

**Role(s) in raid/dungeon (INFERRED):** primarily Holy/Discipline healer; Shadow is a viable secondary raid role in vanilla both for its own DPS and because a Shadow Priest's damage-dealing generates a party-healing side effect (Vampiric Embrace-type ability) — treat the exact numbers as unconfirmed this session.

**Core rotation/priority:**
- Shadow (REPORTED, [21]): open with Holy Fire, layer Devouring Plague and Shadow Word: Pain (classic leveling advice specifically says to apply these while creating distance/running from the target), then Mind Blast on cooldown with Mind Flay as the filler once available, letting DoTs finish a low-health target.
- Holy/Discipline: reactive single-target healing (Flash Heal/Greater Heal/Renew triage) plus Power Word: Shield pre-emptively on a target about to take a known hit; this file could not independently verify a specific vanilla Priest cooldown list this session (Inner Focus, Fade, and the Weakened Soul interaction with Power Word: Shield are **INFERRED** from established class knowledge, not retrieved fresh here — recheck against a live vanilla source before quoting numbers).

**Key cooldowns:** Power Word: Shield as a pre-emptive damage-mitigation tool (mind the Weakened Soul debuff that blocks reapplication for a short window — INFERRED, verify duration before citing it), Fade to shed threat, Pain Suppression/Guardian Spirit do **not** exist in vanilla — don't suggest them for Classic Era play (they're later-expansion abilities; a mentor citing them for a vanilla character is a version-applicability error to catch).

**Stat priority (REPORTED, [21]):** for Shadow, spell damage, Mana per 5, Intellect, and Spirit in roughly that order, balancing damage output against a sustainable mana pool.

**Leveling spec & tips (REPORTED, [21]):** Shadow is the generally recommended solo-leveling build from roughly level 40 onward for mana efficiency and single-target damage; Holy is viable, especially if leveling through dungeons/grouped content regularly, trading some damage for group utility.

**Common mistakes that show up in logs (INFERRED):**
- **DoT clipping/gaps (Shadow):** `SPELL_AURA_REMOVED` for Shadow Word: Pain or Devouring Plague with a delayed refresh — lost DoT uptime.
- **No pre-shield before a known spike:** a large `SPELL_DAMAGE`/`SPELL_PERIODIC_DAMAGE` hit on the tank with no Power Word: Shield `SPELL_CAST_SUCCESS` on that target beforehand, when the ability was available (generic rubric G2, Priest flavor).
- **No Fade before a death:** a Priest `UNIT_DIED` or near-death preceded by rising threat/damage with no Fade `SPELL_CAST_SUCCESS` in the window before it, when Fade was off cooldown (generic rubric G2/G5-style omission).

**Consumables/world buffs relevance:** Spirit/Intellect elixirs matter most for sustained healing throughput; Shadow Priests want the same spell-damage/crit buffs as other casters.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Priest overview, [22]):** "extremely strong self-healing" is the headline strength. The guide recommends Human specifically for Desperate Prayer (an emergency self-heal racial the class otherwise lacks) or Dwarf for Stoneform (bleed/disease/poison immunity plus 10% armor) as the safest Hardcore race choices.

**SoD runes (RETRIEVED via WebSearch synthesis, [23]):** the debuff-limit removal (a vanilla raid-wide 16-debuff cap) is called out as a major Shadow Priest buff, since it stops DoTs from being pruned off a target by other classes' effects; Shadow Weaving (stacking shadow-damage-taken debuff) and Vampiric Embrace (party healing from the Priest's shadow damage) are named as core rune-augmented tools by Phase 2-3.

**MoP Classic differs (INFERRED, not independently verified this session):** Priest healing gains the Chakra state-switching mechanic and Discipline's Atonement-style damage-as-healing model, both absent from vanilla — don't carry vanilla Holy/Disc rotation advice into MoP.

---

## Shaman

**Role(s) in raid/dungeon (INFERRED):** Horde-only in vanilla. Restoration is the primary raid role (strong raid healer); Elemental and Enhancement both see less raid use than their Alliance analogues due to vanilla itemization, but Shaman's totem buffs (Strength of Earth, Windfury Totem, Grace of Air) make even an off-spec Shaman raid-valuable for the party buffs alone.

**Core rotation/priority (REPORTED, [24]):** Enhancement — Stormstrike on cooldown (also buffs the next two Earth Shocks), Earth Shock whenever available; totem selection changes by situation (Strength of Earth/Healing Stream/Searing/Grace of Air as defaults, swapping in Windfury Totem for a group with Warriors/Rogues who benefit from it, and adjusting totems for confined dungeon pulls vs. open grinding).

**Key cooldowns:** Elemental Mastery-type burst cooldowns for Elemental, Nature's Swiftness for an instant heal or nuke in an emergency; totem drops themselves are not "cooldowns" in the rotation sense but do need to be re-established after every wipe/travel since they have limited range and don't move with you.

**Stat priority (REPORTED, [24]):** shifts with level/talents — before roughly level 29 (before Flurry is maxed for Enhancement), Spirit is weighted above Agility; after that point Agility gains priority. This is a good example of a stat priority that is genuinely talent-dependent rather than fixed.

**Leveling spec & tips (REPORTED, [24]):** all three specs (Elemental, Enhancement, Restoration) are viable leveling paths per the guide snippets; Enhancement's totem usage differs by context (fewer/cheaper totems while grinding solo vs. full totem coverage in a dungeon group).

**Common mistakes that show up in logs (INFERRED):**
- **Totem not maintained:** `SPELL_AURA_REMOVED` for a totem's party buff (e.g., Strength of Earth) with no redrop `SPELL_CAST_SUCCESS` for an extended time — totems have a fixed range and duration and silently fall off if not refreshed or if the party moves out of range.
- **Windfury Weapon not reapplied:** after a weapon swap/death, no `SPELL_CAST_SUCCESS` reapplying the weapon imbue before resuming DPS — the enchant doesn't survive a weapon change.
- **Stormstrike off cooldown, unused:** gaps between Stormstrike `SPELL_CAST_SUCCESS` events wider than its cooldown during a sustained fight (generic rubric G6, Enhancement flavor).

**Consumables/world buffs relevance:** Intellect/Spirit elixirs for Restoration mana sustain; Strength/Agility for Enhancement; Shaman brings some of its own "consumable-like" value to the raid via totems, so a raid missing its Shaman loses buffs no potion replaces.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Shaman overview, [13]):** strong self-healing and raid-quality totem buffs make Shaman attractive for group/duo Hardcore leveling; the named weakness is that Shaman has **no true emergency cooldown**, so over-pulling is more dangerous than for a class with a panic button, and it's also immobile/slow-vulnerable with below-average kill speed and heavy mana dependence. Stamina and Intellect are weighted above normal Classic priority for the extra health/mana buffer.

**SoD runes (RETRIEVED via WebSearch synthesis, [10][25]):** the headline change — Shaman gains a genuine **tank role** for the first time via the Earthwarden rune, which turns Rockbiter Weapon into a tank stance: +50% threat modifier, crit immunity, +30% health, 10% flat damage reduction, and a working taunt via Earth Shock. This makes Shaman a full 4-role class (tank/healer/melee DPS/ranged DPS) under SoD, a structural change from vanilla where it can't tank at all.

**MoP Classic differs (INFERRED, not independently verified this session):** Elemental and Enhancement both get significant mechanical overhauls (e.g., a proc/reset-heavy Enhancement rotation), and the vanilla totem-refresh-by-hand gameplay is largely unchanged in spirit but the specific totems and their effects differ; re-verify before coaching a MoP Shaman with vanilla totem notes.

---

## Mage

**Role(s) in raid/dungeon (INFERRED):** ranged DPS in vanilla (Frost/Fire/Arcane), plus the raid-utility roles of Arcane Intellect (party Int buff), Polymorph crowd control, and conjured food/water for the raid.

**Core rotation/priority (REPORTED, [26]):** Frost is commonly recommended for leveling specifically for survivability (Chill/Frost Nova kiting tools) rather than raw kill speed. Two named leveling sub-styles: single-target Frost (Frostbolt-centric, using the "Shatter" interaction where Frostbolt followed immediately by Fire Blast both benefit from bonus crit against a frozen target) and AoE-grinding Frost (Cone of Cold on a group of adds, then kite with Frost Nova on cooldown).

**Key cooldowns:** Ice Block (defensive, situational emergency), Evocation (mana-recovery cooldown — the mistake to watch for is holding it until fully oom instead of using it proactively before a dangerous empty-mana stretch), Counterspell (interrupt, not a damage cooldown but a key raid/dungeon utility button).

**Stat priority:** this session's searches didn't return an explicit vanilla Mage stat-priority ranking (the Icy Veins snippet for this query focused on rotation, not stats) — **flagged as an open question below** rather than guessed.

**Leveling spec & tips (REPORTED, [26]):** Frost over Fire/Arcane for leveling, prioritizing survivability tools (Frost Nova, Chill effects, mobility) over raw damage; the guide explicitly frames Frost's value as "consistency and flexibility... in World PvP" as much as PvE efficiency.

**Common mistakes that show up in logs (INFERRED):**
- **Reactive-only mana management:** a long idle stretch (no `SPELL_CAST_SUCCESS`) followed by a very late Evocation `SPELL_CAST_SUCCESS` — the Mage ran dry before using its mana-recovery tool instead of timing it proactively.
- **Missed interrupt:** an enemy `SPELL_CAST_START` that completes (`SPELL_CAST_SUCCESS`/damage) while Counterspell was available and unused — generic rubric G5, Mage flavor; especially costly since Counterspell also silences the school for several seconds.
- **Frost Nova/kite mistiming:** in a solo-pull context, `SPELL_AURA_APPLIED` for a root landing on the Mage's own target followed immediately by the Mage continuing to stand still and take melee `SWING_DAMAGE` instead of creating distance — the kiting tool was used but not followed through on.

**Consumables/world buffs relevance:** spell-damage and spell-crit-focused elixirs/buffs are highest value; Mage's own Arcane Intellect and conjured food/water reduce the raid's dependence on purchased food/water consumables for other casters.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Mage overview, [22]):** described as having "a very safe toolkit" — strong slow/root/freeze control plus high mobility to create distance. The Gnome racial Escape Artist (removes root/slow effects) is called out specifically as a strong Hardcore pairing for Mage.

**SoD runes (RETRIEVED via WebSearch synthesis, [27]):** the headline change — Mage gains a genuine **healer role** for the first time via a damage-to-healing conversion mechanic (Regeneration/Mass Regeneration apply a "Temporal Beacon" to a target, and subsequent Mage damage heals beacon-marked targets; Rewind Time instantly heals recent damage taken on the current Temporal Beacon target). Builds diverge into a tank-healer variant (Icy Veins/Burnout/Balefire Bolt runes) versus an AoE-healer variant (Mass Regeneration/Temporal Anomaly/Rewind Time runes); Phase 5 added two more healing-support ring runes.

**MoP Classic differs (INFERRED, not independently verified this session):** Mage loses several vanilla staples' exact numbers and gains new cooldown-management-heavy rotations (e.g., a more procs/Arcane Charge-driven Arcane spec); the SoD "Mage healer" role does not exist in MoP — that's an SoD-only structural change, not carried into MoP.

---

## Warlock

**Role(s) in raid/dungeon (INFERRED):** ranged DPS in vanilla (Affliction/Destruction/Demonology), plus major raid utility — Healthstones and Soulstones (a battle-rez-adjacent tool) for the raid, plus Banish and curses as crowd control/debuffs.

**Core rotation/priority (REPORTED, [28]):** Affliction leveling loop — keep Corruption, Curse of Agony, and Drain Life all active on the target, wand it down between casts, and let the pet (Voidwalker for leveling) tank/deal damage. Corruption is singled out as the most valuable DoT partly because the Siphon Life talent heals the Warlock for a share of Corruption's damage.

**Key cooldowns/management:** Life Tap converts health to mana and is used constantly — the guide's specific habit tip is to Life Tap down some health, then immediately Drain Life the target to heal back up, rather than tapping recklessly into danger (RETRIEVED via WebFetch-adjacent WebSearch synthesis, [29]). Death Coil is an instant fear-plus-self-heal on a roughly 2-minute cooldown and, being a "horrify" effect rather than a standard fear, resists the usual fear-immunity counters. Fear-kiting technique: if Fear resists or breaks, re-cast immediately rather than waiting, and Curse of Recklessness can be used on an already-feared target to cancel the fear and pull it back under control. Soulstone should be pre-placed on a healer before a raid pull, and a Healthstone made/kept in reserve.

**Stat priority:** this session did not retrieve an explicit vanilla Warlock stat-priority ranking — **flagged in Open questions** rather than guessed; general spellcaster logic (spell damage/hit/crit, then Stamina for a squishier class that self-damages via Life Tap) is INFERRED only.

**Leveling spec & tips (REPORTED, [28]):** Affliction is the commonly recommended leveling spec, built around permanent DoT uptime plus Life Tap/Drain Life sustain; Improved Corruption is called out as close to a universal must-have talent regardless of the rest of the build.

**Common mistakes that show up in logs (INFERRED):**
- **DoT uptime gaps:** `SPELL_AURA_REMOVED` for Corruption/Curse of Agony with a late reapplying `SPELL_CAST_SUCCESS` — direct damage loss, and for Corruption specifically also a lost self-heal (Siphon Life) opportunity.
- **Dangerous Life Tap:** a Life Tap `SPELL_CAST_SUCCESS` immediately followed by a big incoming damage spike (`SPELL_DAMAGE`/`SWING_DAMAGE`) that drops the Warlock to a dangerously low health band — tapping without accounting for incoming damage.
- **No pet out:** extended combat with no pet-source events in the log at all — lost damage/utility (e.g., missing a Felhunter's spell-lock interrupt on a caster pull, or an Imp's raid buff being absent).

**Consumables/world buffs relevance:** spell-damage and spell-crit buffs matter as with any caster; Warlocks are also the ones supplying Healthstones/Soulstones to the raid, so a Warlock's own consumable prep (having stones made before the pull) is itself a raid-readiness check.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Warlock overview, [22]):** the guide frames Warlock survival around slowing the enemy and outrunning it while cooldowns recover, plus the Gnome Escape Artist racial (root/slow removal) as a strong pairing, similar to the Mage entry.

**SoD runes (RETRIEVED via WebSearch synthesis, [30]):** the headline change — Warlock gains a genuine **tank role** for the first time via the Metamorphosis rune (demon-form transformation: +500% armor, -6% chance to be critically hit, +50% threat, +100% mana gained from Life Tap), paired with Immolation Aura, Shadow Cleave, and an instant-cast Searing Pain to round out a tank kit. Both Demonology and Destruction tank-build variants exist by Phase 4; a Warlock can swap between tank and DPS largely by changing runes and gear rather than needing an entirely separate character.

**MoP Classic differs (INFERRED, not independently verified this session):** Warlock gains the Demonic Fury/Metamorphosis mechanic as a core DPS-spec feature (notably similar in name to SoD's tank rune but mechanically a different, DPS-oriented system) — don't conflate the two versions of "Metamorphosis" when coaching across SoD and MoP characters.

---

## Druid

**Role(s) in raid/dungeon (INFERRED):** the vanilla hybrid with the most raid role flexibility even before SoD — Restoration is a strong raid HoT-healer, Feral (Bear Form) is a viable tank/off-tank especially for encounters that don't require a threat reset, Feral (Cat Form) DPS and Balance both exist but are comparatively weak vanilla raid DPS roles due to itemization scarcity for those specs. Available to both factions (Night Elf/Tauren), unlike Paladin (Alliance-only) and Shaman (Horde-only).

**Core rotation/priority (REPORTED, [31]):** Feral single-target — Rake then Mangle (Cat) then Rip or Ferocious Bite depending on the finishing window, all from Cat Form; Bear Form plus Swipe for AoE/tanking. A specifically vanilla-relevant mechanic: Cat/Bear Form auto-attacks are normalized to a fixed speed based on Attack Power rather than the equipped weapon's actual speed/damage, so — unlike every weapon-wielding class in this file — weapon damage is nearly irrelevant to a Feral Druid's damage output; only the weapon's stat budget (and any Feral-specific bonus, if the piece has one) matters.

**Key cooldowns:** Innervate (mana-cooldown, typically given to a healer — including sometimes the Druid's own healer self — rather than used as a DPS cooldown), Tranquility (raid-wide heal-over-time, a save-the-raid cooldown rather than routine throughput), Enrage (Bear Form threat/rage cooldown). Nature's Swiftness gives an instant, guaranteed-not-interrupted cast for an emergency heal or CC.

**Stat priority (REPORTED, [31]):** Agility and Strength when a choice is offered, for damage; Spirit is unusually valuable for a melee-adjacent spec here specifically because Druids spend most combat time in Cat/Bear Form not directly spending mana, so Spirit-driven regen is what refills the mana pool used for form-shifting and off-heals.

**Leveling spec & tips (REPORTED, [31]):** Feral is a common leveling recommendation; Feline Swiftness (movement speed in Cat Form) is called out as close to the single most important leveling talent, and Ferocity (reduces core Feral ability costs) lets abilities be used more frequently during solo content.

**Common mistakes that show up in logs (INFERRED):**
- **Tank threat-debuff omission:** no Demoralizing Roar/Faerie Fire `SPELL_CAST_SUCCESS` in the opening GCDs of a Feral tank pull — slower threat ramp than intended, generic rubric G6 flavor.
- **Innervate misdirected under pressure:** an Innervate `SPELL_CAST_SUCCESS` targeting the Druid's own character while another raid healer's mana (if visible via advanced logging) is critically low — not wrong by itself, but worth a coaching question about raid mana-planning.
- **Involuntary form loss mid-fight:** a Shapeshift `SPELL_AURA_REMOVED` not caused by the player's own cast (e.g., from a crowd-control effect landing) followed by the Druid continuing to act as if still in Bear/Cat Form — a situational check, not a routine one.

**Consumables/world buffs relevance:** since weapon damage barely matters for Feral, gold that other melee classes would spend chasing a weapon upgrade is better spent on Agility/Strength gear and consumables instead; Restoration benefits from the same Spirit/Intellect consumables as other healers.

**Hardcore survival tools (RETRIEVED via WebSearch synthesis of Icy Veins' Hardcore Druid overview, [32]):** strong self-sustain from HoTs plus high Bear Form armor, good pre-mount mobility, and Cat Form stealth for bypassing danger are the named strengths; below-average kill speed (especially early) and heavy mana dependence are the named weaknesses. Hardcore stat priority again leans Stamina/Intellect above standard Classic weighting. The guide places Druid in the B-tier of its Hardcore leveling tier list — capable but requiring more careful play than the top classes.

**SoD runes (RETRIEVED via WebSearch synthesis, [10][33]):** Feral tanking becomes considerably more credible via three defining runes — Survival of the Fittest (damage reduction plus crit immunity in Bear Form), Lacerate (sustained threat generator), and Skull Bash (an actual interrupt, which vanilla Feral otherwise lacks). Wild Strikes turns Feral DPS into a notable raid-buff provider as well, and Feral gear/rune swaps let a single Druid flex between tanking and DPS similarly to the SoD Warlock/Shaman tank builds. Restoration healers are described as gaining "enhanced HoT capabilities" that push them toward raid-healer viability beyond their traditional tank-healing niche.

**MoP Classic differs (INFERRED, not independently verified this session):** Druid gains distinct MoP-era mechanics per spec (e.g., a different Feral combo-point/finisher structure and Balance's Eclipse mechanic reaching its more mature form); re-verify before coaching a MoP Druid off this file's vanilla Feral/Balance notes.

---

## Shared MoP Classic talent-system note (RETRIEVED via WebSearch synthesis, [34])

Every class above uses the vanilla point-buy talent tree (dozens of small incremental choices, gold-cost respecs, trainer visits). MoP Classic replaced this entirely: **one talent chosen from three options every 15 levels** (15/30/45/60/75/90), and — critically — **talents are shared across all specs of a class** (a Fury Warrior and a Protection Warrior see identical talent rows), unlike vanilla where each spec had its own tree. Respeccing between MoP talent choices doesn't require gold or a trainer, and can be done between pulls. This single change invalidates essentially all of this file's vanilla "which talents to take while leveling" guidance for a MoP Classic character — a mentor should treat a MoP-flagged player's talent questions as a different knowledge domain, not an extension of the vanilla trees above.

## Sources

1. [What's Happening With WoW Classic in 2026 - Wowhead News](https://www.wowhead.com/classic/news/whats-happening-with-wow-classic-in-2026-379860) — SoD Phase 8/maintenance-mode status, Classic Era/Hardcore live status (via WebSearch synthesis).
2. [Mists of Pandaria Classic 2026 Roadmap - Wowhead News](https://www.wowhead.com/mop-classic/news/mists-of-pandaria-classic-2026-roadmap-siege-of-orgrimmar-coming-in-summer-380187) — MoP Classic phase cadence (via WebSearch synthesis).
3. [Elixir - warcraft.wiki.gg](https://warcraft.wiki.gg/wiki/Elixir) — battle/guardian elixir stacking rule, flask interaction (direct WebFetch).
4. [WoW Classic World Buffs Guide - Warcraft Tavern](https://www.warcrafttavern.com/wow-classic/guides/world-buffs/) — world buff list, effects, durations (direct WebFetch).
5. [Warrior Leveling Guide & Best Leveling Spec 1-60 - Wowhead](https://www.wowhead.com/classic/guide/classes/warrior/leveling-tips) — rotation/stat-priority claims (WebSearch synthesis only; direct fetch returned page shell).
6. [Classic Warrior DPS Rotation, Cooldowns, and Abilities - Icy Veins](https://www.icy-veins.com/wow-classic/warrior-dps-pve-rotation-cooldowns-abilities) — Fury/Execute cooldown timing, Sunder/Shield Slam tank priority (WebSearch synthesis only; direct fetch returned HTTP 403).
7. [WoW Classic Warrior Leveling Guide - Warcraft Tavern](https://www.warcrafttavern.com/wow-classic/guides/warrior-leveling-guide/) — Arms leveling path, stat priority, tips (direct WebFetch).
8. [Hardcore WoW Warrior Leveling Guide 1-60 - Wowhead](https://www.wowhead.com/classic/guide/classes/warrior/hardcore-leveling-tips) — page could not be fetched directly (403/shell); not used as a standalone citation, folded into [9] instead.
9. Icy Veins "Hardcore Warrior Class Overview" (https://www.icy-veins.com/wow-classic/hardcore-warrior-class-overview) — Hamstring/Piercing Howl/Intimidating Shout survival kit, named weaknesses (WebSearch synthesis only; direct fetch blocked).
10. Icy Veins "Season of Discovery [Warrior/Hunter/Druid] Rune Slots and Rune Locations" pages (e.g. https://www.icy-veins.com/wow-classic/season-of-discovery-warrior-rune-slots-and-rune-locations) — rune names and effects (WebSearch synthesis only).
11. General class-design consensus on vanilla Paladin raid roles — INFERRED, not tied to a single fetched URL this session.
12. [WoW Classic Paladin Leveling Guide - Warcraft Tavern](https://www.warcrafttavern.com/wow-classic/guides/paladin-leveling-guide/) and [Paladin Leveling Guide - Wowhead](https://www.wowhead.com/classic/guide/classes/paladin/leveling-tips) — stat priority, Seal/weapon-speed mechanics, 1-32 leveling path (WebSearch synthesis; the Wowhead direct fetch returned only page shell).
13. Icy Veins "Hardcore Paladin Class Overview" / "Hardcore Shaman Class Overview" (https://www.icy-veins.com/wow-classic/hardcore-paladin-class-overview, https://www.icy-veins.com/wow-classic/hardcore-shaman-class-overview) — survival strengths/weaknesses, Hardcore stat priority (WebSearch synthesis only).
14. Season of Discovery Paladin rune sources (Icy Veins/Wowhead SoD Paladin rune pages) — Retribution rework, rune-count-by-phase (WebSearch synthesis only).
15. [Hunter Leveling Guide & Best Leveling Spec 1-60 - Wowhead](https://www.wowhead.com/classic/guide/classes/hunter/leveling-tips) — leveling rotation (WebSearch synthesis; direct fetch returned page shell).
16. [Classic Hunter DPS Rotation, Cooldowns, and Abilities - Icy Veins](https://www.icy-veins.com/wow-classic/hunter-dps-pve-rotation-cooldowns-abilities) and Icy Veins Hunter leveling guide pages — Auto Shot weaving, Bestial Wrath, BM leveling recommendation, stat priority (WebSearch synthesis only; direct fetch blocked/shell).
17. Icy Veins "Hardcore Rogue Class Overview" / "Hardcore Hunter Class Overview" (https://www.icy-veins.com/wow-classic/hardcore-rogue-class-overview, https://www.icy-veins.com/wow-classic/hardcore-hunter-class-overview) — Stealth/pet survival tools, named weaknesses (WebSearch synthesis only).
18. [Classic Rogue DPS Rotation, Cooldowns, and Abilities - Icy Veins](https://www.icy-veins.com/wow-classic/rogue-dps-pve-rotation-cooldowns-abilities) — combo-point priority, stat priority including Hit (WebSearch synthesis only).
19. Icy Veins Rogue DPS rotation/cooldowns pages — Adrenaline Rush/Blade Flurry pairing, Evasion/Vanish usage (WebSearch synthesis only).
20. Warcraft Tavern / Icy Veins SoD Rogue rune pages — new abilities (Saber Slash, Between the Eyes, Quick Draw), rune list by phase (WebSearch synthesis only).
21. [WoW Classic Priest Leveling Guide - Icy Veins](https://www.icy-veins.com/wow-classic/classic-priest-leveling-guide) and related Shadow leveling pages — Shadow rotation, stat priority, Holy-vs-Shadow leveling tradeoff (WebSearch synthesis only; direct fetch blocked).
22. Icy Veins "Hardcore Mage/Warlock/Priest Class Overview" pages — self-healing/kiting-focused survival notes, Gnome Escape Artist and Human/Dwarf racial recommendations (WebSearch synthesis only).
23. Warcraft Tavern / Icy Veins SoD Priest rune pages — debuff-limit removal, Shadow Weaving, Vampiric Embrace (WebSearch synthesis only).
24. Icy Veins Classic Shaman leveling/rotation pages (Elemental/Enhancement/Restoration) — Stormstrike/Earth Shock priority, totem selection, Spirit-vs-Agility stat-priority breakpoint (WebSearch synthesis only).
25. [WoW Season of Discovery new roles guide: Mage Healer, Shaman Tank & more - Dexerto](https://www.dexerto.com/world-of-warcraft/wow-season-of-discovery-new-roles-guide-mage-healer-shaman-tank-more-2396181/) — confirms the SoD "new roles per class" framing (WebSearch synthesis, title/snippet only, page not independently fetched).
26. Icy Veins Classic Mage leveling pages (Frost single-target/AoE builds) — Shatter combo, Frost leveling rationale (WebSearch synthesis only).
27. Warcraft Tavern / Icy Veins / Wowhead SoD Mage healer pages — Temporal Beacon mechanic, tank-healer vs. AoE-healer rune builds (WebSearch synthesis only).
28. Icy Veins Classic Warlock (Affliction) leveling pages — Corruption/Curse of Agony/Drain Life loop, Voidwalker pet choice, Improved Corruption (WebSearch synthesis only).
29. Warlock Life Tap/Fear-kiting/Death Coil mechanics — mixed sources including Wowpedia's Death Coil page and Hardcore Warlock guide snippets (WebSearch synthesis only; specific 2-minute Death Coil cooldown claim not independently re-verified this session).
30. Warcraft Tavern / Sportskeeda / Gamerant SoD Warlock tank rune coverage — Metamorphosis rune effects, Demonology/Destruction tank variants (WebSearch synthesis only).
31. Icy Veins Classic Druid (Feral) leveling pages — Rake/Mangle/Rip rotation, Feline Swiftness/Ferocity talents, normalized Cat/Bear weapon damage mechanic, Spirit-for-regen stat note (WebSearch synthesis only).
32. Icy Veins "Hardcore Druid Class Overview" (https://www.icy-veins.com/wow-classic/hardcore-druid-class-overview) — self-sustain/mobility strengths, B-tier Hardcore ranking (WebSearch synthesis only).
33. Icy Veins SoD Feral Druid Tank/DPS guides — Survival of the Fittest/Lacerate/Skull Bash tank runes, Wild Strikes raid-buff rune (WebSearch synthesis only).
34. MMOJUGG/SSEGold/boosting-ground MoP Classic talent-system coverage — tiered talent structure, shared-across-specs design, free respec (WebSearch synthesis only, aggregator-tier sources rather than Blizzard/Wowhead primary).

## Open questions

- **Vanilla Mage and Warlock stat priorities** were not confirmed this session (search results returned rotation/leveling content but not an explicit stat-ranking for either class) — needs a dedicated follow-up fetch, ideally of a page that actually renders for WebFetch (Warcraft Tavern-style) rather than Wowhead/Icy Veins.
- **Icy Veins blocks WebFetch outright (HTTP 403)** and **Wowhead's Classic guide pages don't return body content to WebFetch** (JS-rendered shell only) — this affected essentially every class section above. A future research pass should either use a tool that can execute JS-rendered pages, or lean more heavily on Warcraft Tavern / warcraft.wiki.gg / class Discords' own web-published guide pages (where they exist) as primary sources instead.
- **"Dwarven Mortar"** (named in this task's brief as a Hunter Discord guide alongside Trueshot Lodge) could not be found by search this session — no matching Discord server or guide site turned up. Trueshot Lodge and a separate "Classic Hunter Lodge" Discord were confirmed to exist as community resources, but neither's actual guide content is web-fetchable (Discord-gated). Flag "Dwarven Mortar" to the user as possibly outdated/renamed/misremembered rather than treating it as verified.
- **Fight Club (Warrior Discord)** was confirmed to exist (DPS spreadsheet, honor calculator, theorycrafting focus) but its specific guide content is likewise Discord-gated and wasn't independently fetched — this file's Warrior rotation/cooldown notes rely on Warcraft Tavern and WebSearch-synthesized Icy Veins/Wowhead content instead, not on Fight Club directly.
- **Exact vanilla numbers** (Power Word: Shield's Weakened Soul duration, Death Coil's cooldown, Metamorphosis's threat/armor percentages, Sayge's Fortune's exact damage bonus, etc.) are marked INFERRED or attributed to a low-trust aggregator where a Blizzard/Wowhead-primary confirmation wasn't obtained this session — treat every specific number in this file as **VOLATILE (fetched 2026-09-25, recheck after 14 days or a patch)** and re-verify before quoting it to a player as precise.
- **MoP Classic per-class notes** are intentionally brief per the task brief and are the least-verified part of this file (mostly INFERRED from general MoP knowledge, not fetched this session beyond the shared talent-system note). If a mentor is actively coaching a MoP Classic character, treat this file's MoP callouts as "here's what's definitely different" pointers, not a substitute for MoP-specific research.
