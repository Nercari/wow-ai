topic: Retail PvE spec fundamentals and meta — all 13 classes, 39 specs
applies-to: Retail only (Midnight expansion, patch 12.1.0, Season 2; the patch name "Curse of Ula'tek" is REPORTED from a WebSearch synthesis, not confirmed from a Blizzard page this session — see Open Questions). Does not apply to Classic Era/Anniversary/Hardcore, SoD, MoP Classic, or WoW Forever — those run older, separate class kits.
fetched: 2026-09-25
sources: 15 numbered verification sources below, plus 125 inline URL occurrences (guide links repeated in a spec's "Guides" line and, where relevant, in its prose) across the file — all pulled from actual WebSearch results or successful WebFetch calls this session, none constructed

## Method note for this file
Midnight (released 2026-03-02) rebuilt every class: new rotations, a third Hero Talent tree per class (a fourth for Druid, since it has 4 specs), a new Demon Hunter spec (Devourer), and a new "Apex Talent" capstone per spec. My training data predates Midnight entirely, so I cannot treat any pre-Midnight ability name as safe by default. Hero-talent names and their favored raid/M+ pick are RETRIEVED for essentially every spec (WebSearch snippets citing Wowhead/Icy Veins/Method/Maxroll, WebFetch of method.gg guide pages, or the warcraft.wiki.gg hero-talent index) — treat those as solid.

Confidence on the **Priority/Cooldowns prose** varies by spec and is honest, not uniform:
- **Directly WebFetched from a method.gg rotation/talent page this session** (ability names and sequencing RETRIEVED, not memory): Arms Warrior, Blood DK, Frost DK, Unholy DK, Brewmaster Monk, Havoc DH, Vengeance DH, Marksmanship Hunter, Survival Hunter, Devastation Evoker, Fire Mage, Holy Paladin, Holy Priest, Balance Druid, Restoration Druid, Restoration Shaman, Destruction Warlock (17 specs).
- **WebSearch snippets gave specific ability/proc names** used to build the prose (RETRIEVED, secondhand — a synthesis of a fetched page, not the page itself): Fury Warrior, Retribution Paladin, Protection Paladin, Beast Mastery Hunter, Assassination Rogue, Subtlety Rogue, Outlaw Rogue, Discipline Priest, Shadow Priest, Elemental Shaman, Enhancement Shaman, Arcane Mage, Frost Mage, Affliction Warlock, Demonology Warlock, Mistweaver Monk, Windwalker Monk, Devourer DH, Preservation Evoker, Augmentation Evoker (20 specs).
- **Thin or memory-filled**: Protection Warrior, Guardian Druid, Feral Druid. WebFetch/WebSearch on these returned hero-talent favor but little to no rotation detail, so the priority/cooldown ability names are carried from pre-Midnight training data (INFERRED, unverified against Midnight's rebuilt kit) — they're foundational, long-standing abilities for their spec (Shield Slam, Thrash, Rake, etc.) and likely still exist, but I have not confirmed they weren't renamed or reworked. Coach with these three cautiously and check the linked guide before citing a specific button name to a player.

A first pass of this file copied two spell names across specs by mistake (fixed): Holy Priest's priority line briefly showed Holy Paladin abilities, and Beast Mastery Hunter's cooldown line paired Bestial Wrath with Trueshot (a Marksmanship-only cooldown). Both are corrected below using retrieved, spec-correct data. If you spot another cross-spec name while using this file, treat it as a bug and re-check the linked guide rather than trusting the prose.

The log-mistake → combat-log-event mappings are INFERRED from durable log-analysis logic (resource caps show as flat RESOURCE_CHANGE plateaus, dropped DoTs/HoTs as gaps between SPELL_AURA_APPLIED/REFRESH and REMOVED, missed procs as AURA_APPLIED→REMOVED with no matching SPELL_CAST_SUCCESS, cooldowns not paired as SPELL_CAST_SUCCESS timestamps far apart) applied to whatever ability name is used in that spec's entry — the mapping logic is durable regardless of confidence tier above. WebSearch quota ran out mid-session (session-wide 200-call cap, shared with other work), which is why some specs above rely on snippets rather than a direct fetch.

Hero-talent tree map (RETRIEVED, warcraft.wiki.gg — see Sources #1), unchanged in structure from pre-Midnight, still 2 specs per tree:
- Warrior: Colossus (Arms+Prot), Mountain Thane (Fury+Prot), Slayer (Arms+Fury)
- Paladin: Herald of the Sun (Holy+Ret), Lightsmith (Holy+Prot), Templar (Prot+Ret)
- Hunter: Dark Ranger (BM+MM), Pack Leader (BM+Surv), Sentinel (MM+Surv)
- Rogue: Deathstalker (Assa+Sub), Fatebound (Assa+Outlaw), Trickster (Outlaw+Sub)
- Priest: Archon (Holy+Shadow), Oracle (Disc+Holy), Voidweaver (Disc+Shadow)
- Death Knight: Deathbringer (Blood+Frost), Rider of the Apocalypse (Frost+Unholy), San'layn (Blood+Unholy)
- Shaman: Farseer (Ele+Resto), Stormbringer (Ele+Enh), Totemic (Enh+Resto)
- Mage: Frostfire (Fire+Frost), Spellslinger (Arcane+Frost), Sunfury (Arcane+Fire)
- Warlock: Diabolist (Demo+Destro), Hellcaller (Affli+Destro), Soul Harvester (Affli+Demo)
- Monk: Conduit of the Celestials (MW+WW), Master of Harmony (Brew+MW), Shado-Pan (Brew+WW)
- Druid: Druid of the Claw (Feral+Guardian), Elune's Chosen (Balance+Guardian), Keeper of the Grove (Balance+Resto), Wildstalker (Feral+Resto)
- Demon Hunter: Aldrachi Reaver (Havoc+Veng), Fel-Scarred/Void-Scarred (Havoc+Devourer), Annihilator (Veng+Devourer)
- Evoker: Chronowarden (Aug+Pres), Flameshaper (Dev+Pres), Scalecommander (Aug+Dev)

---

## Warrior

### Arms — DPS (melee)
Hero talents: Colossus (AoE-leaning) vs Slayer (ST-leaning). Method's 12.1 talent guide: no big gap either way — "Colossus has superior AoE while Slayer has the better single target," pick by preference. [RETRIEVED, method.gg]
Priority: Mortal Strike on cooldown as the priority ST hit; build and spend Sweeping Strikes charges before they refresh so none are wasted in cleave; open burst with Colossus Smash/Warbreaker and dump Overpower/Slayer procs into that window; under 20% shift hard into Execute, especially Sudden Death procs in Slayer builds. Rend is now Arms-exclusive and cheap (10 rage) — keep it up on the primary target.
Cooldowns: Colossus Smash/Warbreaker paired with on-use trinkets and Avatar; Bladestorm doubles as an AoE/cleave cooldown.
Mistakes a log catches:
1. Colossus Smash not lined up with trinket procs — compare SPELL_CAST_SUCCESS timestamps.
2. Sweeping Strikes charge left unspent before recast — AURA gap with no matching multi-target SPELL_DAMAGE.
3. Sudden Death procs expiring unused in execute range — SPELL_AURA_APPLIED→REMOVED with no Execute cast between.
Guides: [Method talents](https://www.method.gg/guides/arms-warrior/talents)

### Fury — DPS (melee)
Hero talents: Slayer (ST) vs Mountain Thane (best multi-target/cleave, which covers most raid adds and M+). Mountain Thane favored for M+ and cleave-heavy raid fights; Slayer for pure ST. [RETRIEVED, WebSearch of Wowhead/Icy Veins/Method]
Priority: keep Enrage rolling via Bloodthirst/Raging Blow, dump Rage into Rampage before it caps, weave in Execute-range Crushing Blow in Slayer builds.
Cooldowns: Recklessness + Avatar popped together; Odyn's Fury for burst cleave.
Mistakes a log catches:
1. Rage capping — RESOURCE_CHANGE plateaued at max before a Rampage cast.
2. Recklessness and Avatar cast on separate GCDs instead of together.
3. Enrage uptime holes — AURA_APPLIED/REMOVED gaps across the fight.
Guides: [Maxroll raid](https://maxroll.gg/wow/class-guides/fury-warrior-raid-guide) · [Maxroll M+](https://maxroll.gg/wow/class-guides/fury-warrior-mythic-plus-guide) · [Icy Veins DPS](https://www.icy-veins.com/wow/fury-warrior-pve-dps-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/fury-warrior-pve-dps-spec-builds-talents) · [Method talents](https://www.method.gg/guides/fury-warrior/talents) · [Murlok M+](https://murlok.io/warrior/fury/m+)

### Protection — Tank
Hero talents: Mountain Thane (better rage economy/rotational flow, plus Stormshield utility) vs Colossus. Mountain Thane recommended by default, unchanged from prior tuning. [RETRIEVED, WebSearch]
Priority: Shield Slam on cooldown as the core mitigation+threat button, Thunder Clap/Revenge for AoE threat and rage, Ignore Pain to smooth incoming spikes without overcapping the absorb.
Cooldowns: Shield Wall/Last Stand paired with a healer cooldown on a known big hit.
Mistakes a log catches:
1. Ignore Pain refreshed while the old absorb is still large — wasted mitigation, visible as AURA_APPLIED refresh with high remaining value.
2. Shield Wall/Last Stand popped reactively after the big hit already landed rather than pre-positioned — compare AURA_APPLIED timestamp to the boss ability's SPELL_CAST_SUCCESS/DAMAGE event.
3. Rage capped, missing Shield Slam resets — RESOURCE_CHANGE plateau.
Guides: [Method talents](https://www.method.gg/guides/protection-warrior/talents)

## Paladin

### Retribution — DPS (melee)
Hero talents: Templar (stacked cleave via Shake the Heavens) vs Herald of the Sun (buffs Divine Storm/dot damage via Dawnlight). Templar recommended for both raid and M+ in 12.1, largely on Hammer of Light's burst. Apex talent "Light Within" leans into Art of War procs (now bankable to 2 charges). [RETRIEVED, WebSearch of Method/Icy Veins/timesaver.gg]
Priority: build/spend Holy Power via Blade of Justice/Judgment into Templar's Verdict or Divine Storm depending on target count; spend Art of War procs promptly on Blade of Justice; weave Hammer of Light (now 3 Holy Power, damage cut 30% in 12.1) after a Divine Toll/wings dump.
Cooldowns: Avenging Wrath/wings paired with Divine Toll to dump Holy Power fast, chained into Hammer of Light.
Mistakes a log catches:
1. Art of War procs banked to cap without a Blade of Justice cast following — AURA stacking with no matching cast.
2. Wings popped without Divine Toll synced — CD timestamps far apart.
3. Holy Power capped at 5 for multiple GCDs before a generator — RESOURCE_CHANGE plateau.
Guides: [Maxroll raid](https://maxroll.gg/wow/class-guides/retribution-paladin-raid-guide) · [Maxroll M+](https://maxroll.gg/wow/class-guides/retribution-paladin-mythic-plus-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/retribution-paladin-pve-dps-spec-builds-talents) · [Method](https://www.method.gg/guides/retribution-paladin/talents)

### Holy — Healer
Hero talents: Herald of the Sun is the default recommendation for both raid and M+; Lightsmith is viable with talent swaps. [RETRIEVED, method.gg]
Priority: Holy Shock on cooldown as the core generator/heal, weave Eternal Flame (replaces Word of Glory with upfront heal + HoT)/Dawnlight for spot healing, save Divine Toll for burst phases, use Light of Dawn/Holy Prism for AoE top-off.
Cooldowns: Aura Mastery pre-positioned before a known raid-damage spike; Sun's Avatar (wings, Herald of the Sun) as the burst window.
Mistakes a log catches:
1. Holy Shock off cooldown — SPELL_CAST_SUCCESS gaps beyond its CD, a clean throughput-loss signature.
2. Aura Mastery cast reactively after damage already registered instead of pre-positioned — timestamp vs. boss ability cast.
3. Spenders used while the raid is already topped — large SPELL_HEAL events with near-100% overheal right after another big AoE heal.
Guides: [Method talents](https://www.method.gg/guides/holy-paladin/talents)

### Protection — Tank
Hero talents: Lightsmith edges ahead on raw DPS for M+; Templar's cleave profile fits Season 2 raid (no pure-ST fights). Method notes the same talent build works under either hero spec, so the "favored" pick is soft. [RETRIEVED, method.gg]
Priority: Judgment/Avenger's Shield on cooldown for threat and mitigation, Hammer of the Righteous for AoE threat, Shield of the Righteous kept up for active mitigation, Word of Glory/Eternal Flame woven for self-healing.
Cooldowns: Ardent Defender/Guardian of Ancient Kings paired with Divine Toll for damage.
Mistakes a log catches:
1. Shield of the Righteous uptime gaps — AURA_APPLIED/REMOVED holes on the mitigation buff line up with damage-taken spikes.
2. Avenger's Shield off cooldown (missed proc extensions) — cast gaps exceeding CD.
3. Major defensive used reactively after the spike already hit rather than pre-emptively.
Guides: [Maxroll M+](https://maxroll.gg/wow/class-guides/protection-paladin-mythic-plus-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/protection-paladin-pve-tank-spec-builds-talents) · [Method](https://www.method.gg/guides/protection-paladin/talents) · [Wowhead M+ tips](https://www.wowhead.com/guide/classes/paladin/protection/mythic-plus-dungeon-tips) · [Murlok M+](https://murlok.io/paladin/protection/templar/m+)

## Hunter

### Beast Mastery — DPS (ranged/pet)
Hero talents: Pack Leader in all content; Dark Ranger is tankier but well behind on damage. Pack Leader's core is Howl of the Pack Leader/Stampede! — Kill Command occasionally summons a strong Beast, amplified further on Bestial Wrath. [RETRIEVED, WebSearch of Icy Veins/Method]
Priority: Kill Command on cooldown as the main damage+resource button, Barbed Shot to keep Frenzy stacked on the pet, Cobra Shot as filler so Focus doesn't cap, Bestial Wrath synced with Call of the Wild. 12.1 buffed Kill Command +20%, Cobra Shot +25%, Barbed Shot +10%.
Cooldowns: Bestial Wrath stacked with Call of the Wild (BM's own burst window — Trueshot belongs to Marksmanship, not BM).
Mistakes a log catches:
1. Focus capping — RESOURCE_CHANGE plateau instead of a Cobra Shot filler.
2. Pet Frenzy stacks allowed to drop — AURA gaps on the pet's Frenzy buff, pet damage falls off.
3. Bestial Wrath not aligned with Call of the Wild — CD timestamps far apart.
Guides: [Maxroll raid](https://maxroll.gg/wow/class-guides/beast-mastery-hunter-raid-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/beast-mastery-hunter-pve-dps-spec-builds-talents) · [Icy Veins DPS](https://www.icy-veins.com/wow/beast-mastery-hunter-pve-dps-guide) · [Method](https://www.method.gg/guides/beast-mastery-hunter/talents) · [Murlok M+](https://murlok.io/hunter/beast-mastery/m+)

### Marksmanship — DPS (ranged)
Hero talents: Sentinel for raid/ST, Dark Ranger for M+/AoE (Method's dedicated build split). [RETRIEVED, method.gg]
Priority: Aimed Shot as the primary nuke, empowered by Sentinel's Mark or Precise Shots procs; Rapid Fire on cooldown; Trick Shots for cleave; don't let Steady Shot filler starve Focus needed for Aimed Shot.
Cooldowns: Trueshot as the core burst window — Sentinel extends it via Moonlight Chakram, Dark Ranger ties it to Withering Fire for Deathblow procs.
Mistakes a log catches:
1. Aimed Shot cast without an available proc (Precise Shots/Sentinel's Mark) already up — check AURA timing vs. the cast.
2. Deathblow-reset Kill Shot/Black Arrow procs left unused — AURA applied/removed with no matching cast.
3. Trueshot not synced with raid burst cooldowns.
Guides: [Method talents](https://www.method.gg/guides/marksmanship-hunter/talents)

### Survival — DPS (melee)
Hero talents: Sentinel now outperforms Pack Leader in all PvE content for damage after 12.1 tuning, and has the better defensive (Don't Look Back vs. Shell Cover). [RETRIEVED, method.gg]
Priority: Wildfire Bomb on cooldown (AoE plus Sentinel's Lunar Storm proc), weave the Kill Command/Raptor Strike melee chain, spend Focus before it caps rather than banking it.
Cooldowns: Takedown (Method's named damage-amp cooldown for Survival in 12.1 — boosts both hunter and pet damage, with possible cooldown-reduction) paired with a staged Wildfire Bomb; Boomstick (short-CD AoE) and Flamefang Pitch (60s AoE, extra charge possible) round out the cleave kit.
Mistakes a log catches:
1. Wildfire Bomb off cooldown — cast gaps exceeding its CD.
2. Takedown popped without resources staged first (bomb/Kill Command not ready to follow up).
3. Focus capping on the melee filler chain — RESOURCE_CHANGE plateau.
Guides: [Method talents](https://www.method.gg/guides/survival-hunter/talents)

## Rogue

### Assassination — DPS (melee)
Hero talents: Deathstalker recommended in all content — slightly higher sustained ST and AoE than Fatebound, plus strong priority-target damage via Singular Focus. [RETRIEVED, WebSearch]
Priority: keep Garrote/Rupture bleeds up on cleave/priority targets, Envenom to dump combo points at 5, weave Fan of Knives only at 3+ targets, mark the priority target with Singular Focus in AoE.
Cooldowns: Vendetta/Deathmark paired with on-use trinkets and a fresh bleed application.
Mistakes a log catches:
1. Garrote/Rupture falling off — AURA_REMOVED/REFRESH gaps during a Vendetta window.
2. Combo points capped before Envenom — RESOURCE_CHANGE plateau at 5+.
3. Vendetta/Deathmark not paired with trinkets — CD timestamps far apart.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/assassination-rogue-pve-dps-spec-builds-talents) · [Icy Veins DPS](https://www.icy-veins.com/wow/assassination-rogue-pve-dps-guide) · [Method](https://www.method.gg/guides/assassination-rogue/talents)

### Outlaw — DPS (melee)
Hero talents: Trickster is the best overall pick for all content in 12.1 (roughly 7% ahead of Fatebound), and Midnight smoothed its previously-invasive playstyle. Most raiders still default to Fatebound out of habit, but Trickster is the tuned-stronger pick for both raid and M+. [RETRIEVED, WebSearch]
Priority: Pistol Shot to build combo points and roll Roll the Bones, keep Roll the Bones buffs refreshed, dump into Dispatch/Between the Eyes, use Adrenaline Rush/Blade Flurry for burst and cleave.
Cooldowns: Adrenaline Rush paired with Killing Spree/Blade Flurry.
Mistakes a log catches:
1. Roll the Bones allowed to expire without a reroll — AURA_REMOVED with no new cast shortly after.
2. Combo points capped — RESOURCE_CHANGE plateau.
3. Adrenaline Rush not paired with Blade Flurry during multi-target segments.
Guides: [Method talents](https://www.method.gg/guides/outlaw-rogue/talents) · [Icy Veins talents](https://www.icy-veins.com/wow/outlaw-rogue-pve-dps-spec-builds-talents) · [Icy Veins hero talents](https://www.icy-veins.com/wow/outlaw-rogue-hero-talents-pve-guide) · [Murlok M+](https://murlok.io/rogue/outlaw/fatebound/m+)

### Subtlety — DPS (melee)
Hero talents: Deathstalker outperforms Trickster outright for Subtlety; Singular Focus turns AoE into priority damage against the marked target, strong for M+. [RETRIEVED, WebSearch]
Priority: build combo points with Backstab/Shuriken Storm-style openers, dump into Eviscerate/Black Powder inside Shadow Dance, chain finishers via the Ancient Arts apex talent without a builder between, keep Symbols of Death rolling.
Cooldowns: Shadow Dance + Shadow Blades stacked together roughly every 90s.
Mistakes a log catches:
1. Shadow Dance and Shadow Blades used on separate cooldowns instead of stacked — CD timestamps far apart.
2. Opening Ambush missed at the pull — no matching SPELL_CAST_SUCCESS in the first GCDs.
3. Finisher cast below 5 combo points — RESOURCE_CHANGE below cap at the finisher's cast.
Guides: [Method talents](https://www.method.gg/guides/subtlety-rogue/talents)

## Priest

### Discipline — Healer
Hero talents: Oracle is the default — built-in overheal protection (Piety) and more constant healing outside cooldowns than Voidweaver, generally easier to play. [RETRIEVED, WebSearch]
Priority: keep Atonement active across the raid via Power Word: Shield/Radiance, deal damage with Smite/Penance to convert it into Atonement healing, use Shadowfiend/Mindbender for mana, save Pain Suppression/Ultimate Penitence for defensive cooldowns.
Cooldowns: Power Word: Barrier-type raid cooldown paired with a maintained Atonement window before a known damage phase.
Mistakes a log catches:
1. Atonement allowed to fall off the raid ahead of a known AoE phase — AURA gaps pre-empting the damage.
2. Low damage-cast count relative to fight length (pure shielding, not converting to Atonement healing).
3. Pain Suppression cast reactively after a hit registers instead of pre-emptively on a known mechanic.
Guides: [Maxroll M+](https://maxroll.gg/wow/class-guides/discipline-priest-mythic-plus-guide) · [Method](https://www.method.gg/guides/discipline-priest/talents) · [Murlok M+](https://murlok.io/priest/discipline/m+)

### Holy — Healer
Hero talents: both Archon and Oracle are viable; Archon is the raid pick (Halo-centered burst windows with Apotheosis + Prayer of Healing), Oracle the M+ baseline (sustained throughput and better personal damage to help beat the timer). Oracle has ~62.5% overall usage. [RETRIEVED, WebSearch]
Priority: Oracle doubles down on Prayer of Mending — keep it on cooldown as the main heal. Archon instead prioritizes Holy Word: Serenity (Ultimate Serenity layers Sanctify's group-heal effect onto it as a single-target cast) and uses Prayer of Healing for group damage, amplified by Surge of Light procs. Holy Word: Sanctify is confirmed a current ability in 12.1 (correction: an earlier pass of this file also listed "Light of Dawn" here — that's a Holy Paladin spell, not Priest, and has been removed).
Cooldowns: Divine Hymn, with a choice between a shorter cooldown (Seraphic Crescendo, ~2 min) or more power (Gales of Song); Apotheosis, choosing between longer uptime (Eternal Sanctity) or more power (Divinity); Halo (Archon only) as a 1-minute cooldown that also generates Surge of Light procs.
Mistakes a log catches:
1. Prayer of Mending (Oracle) off cooldown — cast gaps exceeding its CD, a clean throughput-loss signature.
2. Divine Hymn/Apotheosis not synced with a known raid-damage spike.
3. Archon: Surge of Light procs left unspent on Prayer of Healing — AURA applied/removed with no matching cast.
Guides: [Method talents](https://www.method.gg/guides/holy-priest/talents) · [Maxroll M+](https://maxroll.gg/wow/class-guides/holy-priest-mythic-plus-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/holy-priest-pve-healing-spec-builds-talents)

### Shadow — DPS (ranged)
Hero talents: both are strong; Voidweaver is the recommended starting point, Archon if you want a more sustained damage pattern. Voidweaver's first point (Void Torrent) creates an Entropic Rift, AoE-damaging and turning Mind Blast into Void Blast while active. [RETRIEVED, WebSearch]
Priority: keep Shadow Word: Pain/Vampiric Touch up on all cleave targets, Mind Blast/Void Blast on cooldown, Void Eruption/Dark Ascension to enter the burst form, Void Torrent to open the Entropic Rift and ramp AoE.
Cooldowns: Void Eruption paired with Power Infusion/trinkets.
Mistakes a log catches:
1. DoTs falling off during movement — AURA_REMOVED/REFRESH gaps.
2. Entropic Rift window not filled with Void Blast casts — rift active with no matching casts.
3. Mind Blast/Void Blast off cooldown — cast gaps exceeding CD.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/shadow-priest-pve-dps-spec-builds-talents) · [Method](https://www.method.gg/guides/shadow-priest/talents)

## Death Knight

### Blood — Tank
Hero talents: San'layn out-tunes Deathbringer in M+ after 12.1 changes, but Deathbringer stays more approachable; San'layn is the default recommendation for all content. [RETRIEVED, method.gg]
Priority: Heart Strike/Vampiric Strike to build Essence of the Blood Queen stacks and Runic Power, Death Strike to heal (best value at low health, not banked reflexively), keep Bone Shield stacked via Marrowrend, Dancing Rune Weapon for the burst/mitigation window.
Cooldowns: Dancing Rune Weapon paired with Vampiric Blood.
Mistakes a log catches:
1. Death Strike cast at high health, wasting the heal, instead of banking Runic Power for a low-health moment — high-overheal SPELL_HEAL events.
2. Bone Shield stacks depleted to 0 — AURA stack count hitting empty.
3. Dancing Rune Weapon used reactively after a big hit already landed instead of paired with Vampiric Blood proactively.
Guides: [Method talents](https://www.method.gg/guides/blood-death-knight/talents)

### Frost — DPS (melee)
Hero talents: Deathbringer favored for raid's structured, predictable patterns; Rider of the Apocalypse favored for M+'s variable dungeon encounters. [RETRIEVED, method.gg]
Priority: alternate Obliterate/Frost Strike to consume Killing Machine procs, Howling Blast to spread Frost Fever and consume Rime, switch to Frostscythe/Glacial Advance at 3+ targets, Pillar of Frost as the core burst window.
Cooldowns: Pillar of Frost extended by Frostwyrm's Fury; Reaper's Mark (Deathbringer, 45s) synced with Pillar of Frost for empowered Obliterate.
Mistakes a log catches:
1. Killing Machine procs overwritten/not used on Obliterate — AURA applied/removed with no follow-up cast.
2. Pillar of Frost not extended via Frostwyrm's Fury — shorter buff duration than expected.
3. Runes capped instead of spent — RESOURCE_CHANGE plateau.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/frost-death-knight-pve-dps-spec-builds-talents) · [Method](https://www.method.gg/guides/frost-death-knight/talents)

### Unholy — DPS (melee)
Hero talents: Rider of the Apocalypse recommended for raid single-target; both viable in M+, with San'layn's Blightfall giving it an AoE-damage-extension edge there. [RETRIEVED, method.gg]
Priority: the core mechanic changed from the old Festering Wounds model — build and maintain Lesser Ghoul stacks via Festering Strike/Festering Scythe, and never fire Scourge Strike without an active Lesser Ghoul stack (fall back to Death Coil instead if none is up). Then split by target count: Death Coil on 1-2 targets, Epidemic on 3+. During Forbidden Knowledge windows, swap to Necrotic Coil (1-3 targets) or Graveyard (4+).
Cooldowns: Army of the Dead macro'd with Dark Transformation so both fire together and the Commander of the Dead buff overlaps all summons; Putrefy should be popped quickly after the pull rather than held.
Mistakes a log catches:
1. Scourge Strike cast with no Lesser Ghoul stack active — a clear DPS-loss pattern visible as SPELL_CAST_SUCCESS(Scourge Strike) with no preceding matching AURA stack.
2. Army of the Dead and Dark Transformation cast on separate GCDs instead of macro'd together — CD timestamps far apart, missed Commander of the Dead overlap.
3. Putrefy held instead of used early post-pull — late first cast relative to encounter start.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/unholy-death-knight-pve-dps-spec-builds-talents) · [Icy Veins DPS](https://www.icy-veins.com/wow/unholy-death-knight-pve-dps-guide) · [Maxroll M+](https://maxroll.gg/wow/class-guides/unholy-death-knight-mythic-plus-guide) · [Method](https://www.method.gg/guides/unholy-death-knight/talents) · [Murlok M+](https://murlok.io/death-knight/unholy/m+)

## Shaman

### Elemental — DPS (ranged)
Hero talents: Farseer (ancestors that cast alongside you, Lava Burst-centric) vs Stormbringer (lightning/Maelstrom-into-Tempest). Which is favored for raid vs. M+ specifically was not confirmed this session (quota ran out); SeeMeta has Elemental S-tier overall in both raid and M+ but doesn't split by hero tree. [Open question]
Priority: Lava Burst on cooldown (guaranteed crit via Lava Surge), Earth Shock/Elemental Blast to spend Maelstrom, Flame Shock maintained on all cleave targets, Stormkeeper to empower a burst of Lightning Bolt/Chain Lightning.
Cooldowns: Stormkeeper paired with Fire Elemental/Storm Elemental and trinkets.
Mistakes a log catches:
1. Flame Shock falling off cleave targets — AURA_REMOVED gaps.
2. Maelstrom capped instead of spent — RESOURCE_CHANGE plateau.
3. Free Lava Surge procs not used — AURA applied/removed without a following instant Lava Burst.
Guides: [Maxroll M+](https://maxroll.gg/wow/class-guides/elemental-shaman-mythic-plus-guide) · [Method](https://www.method.gg/guides/elemental-shaman/talents)

### Enhancement — DPS (melee)
Hero talents: Stormbringer is the clear pick for both raid and M+ in 12.1 — Totemic is undertuned and the new tier set favors Stormbringer's extra Crash Lightnings. [RETRIEVED, WebSearch]
Priority: Stormstrike/Lava Lash to build Maelstrom Weapon stacks, spend stacks on empowered Lightning Bolt/Chain Lightning (Tempest at threshold), Feral Spirit/Doom Winds for the burst window.
Cooldowns: Feral Spirit paired with Doom Winds.
Mistakes a log catches:
1. Maelstrom Weapon stacks capped/overwritten — stack plateau before a spender cast.
2. Doom Winds not paired with Feral Spirit — CD timestamps far apart.
3. Tempest procs not consumed promptly — AURA applied/removed without a matching big Lightning Bolt.
Guides: [Icy Veins DPS](https://www.icy-veins.com/wow/enhancement-shaman-pve-dps-guide) · [Icy Veins M+ tips](https://www.icy-veins.com/wow/enhancement-shaman-pve-dps-mythic-plus-tips) · [Method talents](https://www.method.gg/guides/enhancement-shaman/talents) · [Murlok Stormbringer M+](https://murlok.io/shaman/enhancement/stormbringer/m+)

### Restoration — Healer
Hero talents: Totemic recommended for both raid and M+ — much more forgiving on movement-heavy fights, more instants, and Totemic Projection lets you reposition Surging Totem. Farseer has lost a lot of power comparatively. [RETRIEVED, WebSearch]
Priority: Riptide as the foundational cast, kept up frequently under either hero tree; Chain Heal for group healing (Totemic's Lively Totems can fire extra Chain Heals passively); Healing Wave for single-target, upgraded to guaranteed crit during Ascendance; passive coverage from Healing Stream Totem/Stormstream Totem; reposition Surging Totem via Totemic Projection after movement.
Cooldowns: Ascendance (3-min baseline, reducible to 2 min) instantly heals all injured allies in 20 yards and cheapens/empowers Healing Wave and Chain Heal (+3 jumps) for its duration; Spirit Link Totem as the primary raid defensive (10% damage reduction + health redistribution in a 13-yard radius); Nature's Swiftness/Ancestral Swiftness to guarantee a Stormstream Totem proc in Totemic builds.
Mistakes a log catches:
1. Riptide off cooldown — cast gaps exceeding CD, a clean efficiency-loss signature.
2. Surging Totem left in a bad spot after movement (no Totemic Projection recast).
3. Ascendance/Spirit Link Totem not aligned with a known raid-damage spike.
Guides: [Method talents](https://www.method.gg/guides/restoration-shaman/talents) · [Icy Veins talents](https://www.icy-veins.com/wow/restoration-shaman-pve-healing-spec-builds-talents) · [Wowhead abilities/talents](https://www.wowhead.com/guide/classes/shaman/restoration/abilities-talents-pve-healer)

## Mage

### Arcane — DPS (ranged)
Hero talents: Sunfury is ahead in both raid damage and single-target M+ without losing AoE — the clear pick over Spellslinger in 12.1. [RETRIEVED, WebSearch]
Priority: build Arcane Blast charges, burn phase via Evocation-Arcane Surge spending mana quickly, Touch of the Magi/Arcane Orb to pool Clearcasting and Arcane Barrage resets, Presence of Mind for instant burst.
Cooldowns: Arcane Surge paired with Touch of the Magi and burst trinkets.
Mistakes a log catches:
1. Clearcasting procs (Prismatic Bolt/Arcane Missiles) left unspent — AURA applied/removed without a matching cast.
2. Burn phase not synced with raid cooldowns/trinkets.
3. Mana mismanaged, forcing a conserve phase mid-fight — RESOURCE_CHANGE (mana) near 0 outside the intended burn window.
Guides: [Method talents](https://www.method.gg/guides/arcane-mage/talents) · [Maxroll raid](https://maxroll.gg/wow/class-guides/arcane-mage-raid-guide) · [Maxroll M+](https://maxroll.gg/wow/class-guides/arcane-mage-mythic-plus-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/arcane-mage-pve-dps-spec-builds-talents)

### Fire — DPS (ranged)
Hero talents: Sunfury is the clear recommendation over Frostfire, which is undertuned and saw little play in testing. [RETRIEVED, method.gg]
Priority: Fireball/Flamestrike spam to build Hot Streak (2 crits), spend Hot Streak immediately on Pyroblast/Flamestrike, weave Fire Blast to guarantee crits and refill charges during Combustion.
Cooldowns: Combustion (now a static ~1-minute window with Kindling) synced with raid cooldowns and trinkets.
Mistakes a log catches:
1. Hot Streak procs not spent immediately (clipped by movement) — AURA applied/removed without an immediate Pyroblast cast.
2. Fire Blast charges capped outside Combustion — charge count at max for extended stretches.
3. Combustion not aligned with trinkets/raid burst cooldowns.
Guides: [Maxroll raid](https://maxroll.gg/wow/class-guides/fire-mage-raid-guide) · [Method talents](https://www.method.gg/guides/fire-mage/talents)

### Frost — DPS (ranged)
Hero talents: Spellslinger currently outperforms Frostfire for both single and AoE. Spellslinger's Frost Splinter is a new automatic-projectile passive. [RETRIEVED, WebSearch]
Priority: Ice Lance to consume Fingers of Frost, Flurry to apply Winter's Chill for guaranteed crits, Glacial Spike as a big hit when talented, Icy Veins as the burst window.
Cooldowns: Icy Veins paired with Frozen Orb/Comet Storm.
Mistakes a log catches:
1. Fingers of Frost procs overwritten/dropped — AURA stack lost with no matching Ice Lance.
2. Icy Veins not aligned with Frozen Orb/trinkets.
3. Winter's Chill window under-used — fewer crit-guaranteed casts than the debuff duration allows.
Guides: [Maxroll M+](https://maxroll.gg/wow/class-guides/frost-mage-mythic-plus-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/frost-mage-pve-dps-spec-builds-talents) · [Method](https://www.method.gg/guides/frost-mage/talents) · [Murlok M+](https://murlok.io/mage/frost/m+)

## Warlock

### Affliction — DPS (ranged)
Hero talents: Soul Harvester is currently the better option over Hellcaller — more upfront burst and stronger single-target, while Hellcaller leans into Wither/Malevolence AoE. Apex talents lean heavily into Haunt, cast on cooldown. [RETRIEVED, WebSearch]
Priority: maintain Agony/Corruption/Unstable Affliction on all targets, Malefic Rapture to spend Soul Shards while DoTs are ticking on multiple targets, Haunt on cooldown, refresh DoTs just ahead of the Soul Harvester burst window.
Cooldowns: Summon Darkglare/Soul Harvester burst window paired with a fresh DoT application.
Mistakes a log catches:
1. Agony/Unstable Affliction falling off or losing stacks — AURA_REMOVED gaps or stack resets.
2. Malefic Rapture spent with few DoTs active — low-value cast, visible as low concurrent DoT-aura count at cast time.
3. Haunt off cooldown.
Guides: [Icy Veins DPS](https://www.icy-veins.com/wow/affliction-warlock-pve-dps-guide) · [Method talents](https://www.method.gg/guides/affliction-warlock/talents)

### Demonology — DPS (ranged)
Hero talents: Diabolist is the stronger hero talent in 12.1 even after an AoE nerf. [RETRIEVED, WebSearch]
Priority: Hand of Gul'dan to dump Soul Shards and summon Wild Imps, Demonbolt to generate shards while waiting, pool Imps and shards ahead of Summon Demonic Tyrant rather than dumping early, let Diabolic Ritual demons rotate on their own timers.
Cooldowns: Summon Demonic Tyrant (Tyrant window) paired with pooled resources and trinkets/raid cooldowns.
Mistakes a log catches:
1. Imps/shards dumped right before Tyrant instead of pooled — a burst of Hand of Gul'dan casts right before the Tyrant cast instead of banked resources.
2. Tyrant not aligned with raid cooldowns/trinkets.
3. Wild Imps left uncommanded — Imp-related summon events not synced with the burst window.
Guides: [Icy Veins DPS](https://www.icy-veins.com/wow/demonology-warlock-pve-dps-guide) · [Method](https://www.method.gg/guides/demonology-warlock/talents) · [Kalamazi Demonology](https://www.kalamazi.gg/guides/demonology)

### Destruction — DPS (ranged)
Hero talents: Hellcaller is preferred for most raid scenarios (especially pure ST); Diabolist is a strong M+ alternative. 12.1 removed Rain of Fire's ability to stack Wither, narrowing Hellcaller's AoE edge somewhat. [RETRIEVED, method.gg]
Priority: keep Immolate/Wither on the primary target, Incinerate to build Soul Shards, Chaos Bolt as the main shard-spender, Conflagrate for instant burst + Backdraft, Rain of Fire for AoE.
Cooldowns: Malevolence (Hellcaller, 1-minute) paired with a freshly refreshed Wither.
Mistakes a log catches:
1. Immolate/Wither falling off — AURA_REMOVED gaps.
2. Soul Shards capped, wasting Incinerate casts — RESOURCE_CHANGE plateau at max shards.
3. Malevolence popped without Wither freshly applied first.
Guides: [Method talents](https://www.method.gg/guides/destruction-warlock/talents) · [Kalamazi raid](https://www.kalamazi.gg/guides/Midnight) · [Kalamazi M+](https://www.kalamazi.gg/guides/mythic-plus)

## Monk

### Brewmaster — Tank
Hero talents: Shado-Pan recommended for raid (physical damage, strong defensives); Master of Harmony for M+ (more consistent durability/damage). [RETRIEVED, method.gg]
Priority: Keg Smash on cooldown for threat and Brew charge generation, Blackout Kick/Breath of Fire to build Stagger reduction, purify Stagger via Celestial Brew/Purifying Brew before it overflows, Invoke Niuzao for the burst mitigation+damage window.
Cooldowns: Invoke Niuzao paired with Weapons of Order/Celestial Brew.
Mistakes a log catches:
1. Stagger purified too late — a run of stagger DAMAGE_SPLIT ticks before a purify cast.
2. Keg Smash off cooldown (core threat/Brew generator) — cast gaps exceeding CD.
3. Celestial Brew/Fortifying Brew used reactively after a big hit instead of pre-positioned before a known mechanic.
Guides: [Method talents](https://www.method.gg/guides/brewmaster-monk/talents)

### Mistweaver — Healer
Hero talents: Conduit of the Celestials remains dominant for both raid and M+ across Season 2. [RETRIEVED, WebSearch]
Priority: spread Renewing Mist widely, use Vivify to cleave heals off Renewing Mist targets, Enveloping Mist for tank/spot healing, Thunder Focus Tea to empower a key heal, Celestial Conduit as the burst AoE cooldown.
Cooldowns: Celestial Conduit paired with Revival/a known raid-damage window.
Mistakes a log catches:
1. Renewing Mist coverage gaps across the raid — AURA holes.
2. Thunder Focus Tea burned on a low-value cast instead of a big heal window.
3. Celestial Conduit not synced with a damage spike.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/mistweaver-monk-pve-healing-spec-builds-talents) · [Method](https://www.method.gg/guides/mistweaver-monk/talents)

### Windwalker — DPS (melee)
Hero talents: both are close for ST — Shado-Pan is simpler/lower-ceiling, Conduit of the Celestials has a higher ceiling but is more punishing on mistakes. Post-buffs to Spinning Crane Kick/Jade Ignition, Celestial Conduit sees more play for AoE. [RETRIEVED, WebSearch]
Priority: Rising Sun Kick/Fists of Fury on cooldown, weight Spinning Crane Kick up in AoE, Tiger Palm to build Chi, Invoke Xuen for the burst window.
Cooldowns: Invoke Xuen paired with Touch of Death/trinkets.
Mistakes a log catches:
1. Chi capped instead of spent — RESOURCE_CHANGE plateau.
2. The cleave-enabling debuff from Rising Sun Kick/Spinning Crane Kick not kept up on secondary targets in AoE (exact current debuff name not individually re-verified this session — check the linked guide).
3. Invoke Xuen not aligned with raid cooldowns.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/windwalker-monk-pve-dps-spec-builds-talents) · [Method](https://www.method.gg/guides/windwalker-monk/talents) · [Wowhead talent builds](https://www.wowhead.com/guide/classes/monk/windwalker/talent-builds-pve-dps) · [Murlok M+](https://murlok.io/monk/windwalker/m+)

## Druid

### Balance — DPS (ranged)
Hero talents: Elune's Chosen dominates in M+ (47 of top 50 parses use it) and is also the best single-target raid pick; Keeper of the Grove trades burst for sustained damage, in higher demand for some M+ routes. [RETRIEVED, WebSearch]
Priority: keep Moonfire/Sunfire applied on all targets throughout. Elune's Chosen: use Incarnation: Chosen of Elune outside Eclipse when Fury of Elune is available, then cast Fury of Elune, enter Lunar Eclipse above ~90% Astral Power, spend Starweaver/Touch the Cosmos procs on Starfall, then Starfall on 2+ targets or Starsurge on 1 near Astral Power cap, filling with Starfire. Keeper of the Grove instead aligns Force of Nature with Celestial Alignment/Eclipse, layers in Fury of Elune, and spends Starsurge as the primary Astral Power dump (burning any banked Ascendant Eclipse stacks early), filling with Wrath.
Cooldowns: coordinate the full burst window every ~2 minutes — Force of Nature + Celestial Alignment (or Incarnation) + Convoke the Spirits stacked together, timed with Fury of Elune.
Mistakes a log catches:
1. Moonfire/Sunfire falling off targets — AURA_REMOVED gaps.
2. Astral Power capped instead of spent on Starsurge/Starfall — RESOURCE_CHANGE plateau.
3. Force of Nature, Celestial Alignment/Incarnation, and Convoke the Spirits cast on separate cooldowns instead of stacked together — CD timestamps spread out instead of clustered.
Guides: [Method talents](https://www.method.gg/guides/balance-druid/talents) · [Maxroll raid](https://maxroll.gg/wow/class-guides/balance-druid-raid-guide) · [Maxroll M+](https://maxroll.gg/wow/class-guides/balance-druid-mythic-plus-guide) · [Icy Veins DPS](https://www.icy-veins.com/wow/balance-druid-pve-dps-guide)

### Feral — DPS (melee)
Hero talents: close between Wildstalker (DoT/self-heal focused, via Thriving Growth/Regrowth synergy) and Druid of the Claw (Bite-focused, burstier). No strong overall lean found this session. [RETRIEVED, WebSearch — soft]
Priority: keep Rake/Rip bleeds maintained, spend combo points on Ferocious Bite/finishers at 5, Berserk/Incarnation for the burst window, Tiger's Fury for energy and a damage buff.
Cooldowns: Berserk/Incarnation paired with Tiger's Fury.
Mistakes a log catches:
1. Rip/Rake falling off — AURA_REMOVED gaps.
2. Combo points capped before a finisher — RESOURCE_CHANGE plateau.
3. Tiger's Fury not paired with Berserk/Incarnation.
Guides: [Method talents](https://www.method.gg/guides/feral-druid/talents)

### Guardian — Tank
Hero talents: Druid of the Claw and Elune's Chosen are extremely even in 12.1 at all key levels; Elune's Chosen generally recommended for its simpler, more flexible profile. [RETRIEVED, WebSearch]
Priority: Thrash/Moonfire for AoE threat and bleed, Mangle for single-target and rage, stack Ironfur for active mitigation, Incarnation: Guardian of Ursoc for the burst/mitigation window.
Cooldowns: Incarnation paired with the class burst-window equivalent (Berserk).
Mistakes a log catches:
1. Ironfur uptime gaps ahead of a physical-damage phase — AURA holes.
2. Rage capped instead of spent on Ironfur — RESOURCE_CHANGE plateau.
3. Survival Instincts/Barkskin used reactively rather than pre-emptively.
Guides: [Maxroll M+](https://maxroll.gg/wow/class-guides/guardian-druid-mythic-plus-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/guardian-druid-pve-tank-spec-builds-talents) · [Method](https://www.method.gg/guides/guardian-druid/talents)

### Restoration — Healer
Hero talents: Wildstalker recommended in all content for Season 2, following changes late in Season 1 that carried over. [RETRIEVED, WebSearch]
Priority: Rejuvenation as the HoT base (don't spam it — mana-costly), Wild Growth positioned on grouped allies for max targets, instant Regrowth during Incarnation (synergizes with Soul of the Forest), Swiftmend as the primary spell to consume (triggers the Apex Talent's bloom + mana return), Lifebloom maintained via the Everbloom apex talent, Efflorescence for passive AoE (auto-placed with the Lifetreading talent).
Cooldowns: Convoke the Spirits (~1 min) channels a rapid burst of Wild Growth/Swiftmend/Regrowth/Rejuvenation and can be moved mid-channel; Incarnation: Tree of Life (30s) adds 10% healing, an instant/cheaper Rejuvenation, +2 Wild Growth targets, and instant Regrowth/Wrath; Tranquility as the big group cooldown; Ironbark as the external defensive.
Mistakes a log catches:
1. Rejuvenation/Lifebloom coverage gaps across the raid — AURA holes.
2. Swiftmend used without a Lifebloom/Rejuvenation bloom queued up (losing the Apex Talent payoff) — cast with no matching HoT AURA active beforehand.
3. Tranquility cast reactively instead of pre-positioned before a known heavy-damage phase.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/restoration-druid-pve-healing-spec-builds-talents) · [Method](https://www.method.gg/guides/restoration-druid/talents)

## Demon Hunter

### Havoc — DPS (melee)
Hero talents: Fel-Scarred is slightly stronger than Aldrachi Reaver in almost all situations for both raid and M+; Aldrachi Reaver stays viable where funnel damage matters (consistent add spawns). [RETRIEVED, method.gg]
Priority: spend Fury on Chaos Strike/Annihilation, Blade Dance/Death Sweep for cleave, Eye Beam to enter Demonic form (extra Fury/damage), The Hunt on cooldown for gap-close plus damage.
Cooldowns: Metamorphosis paired with The Hunt/Eye Beam, reset via Chaotic Transformation.
Mistakes a log catches:
1. Fury capped instead of spent — RESOURCE_CHANGE plateau.
2. Eye Beam off cooldown — cast gaps exceeding CD.
3. Metamorphosis not aligned with trinkets/raid cooldowns.
Guides: [Icy Veins DPS](https://www.icy-veins.com/wow/havoc-demon-hunter-pve-dps-guide) · [Icy Veins talents](https://www.icy-veins.com/wow/havoc-demon-hunter-pve-dps-spec-builds-talents) · [Method](https://www.method.gg/guides/havoc-demon-hunter/talents)

### Vengeance — Tank
Hero talents: Annihilator is the highest-damage build for most raid situations (best ST and strong AoE); in M+ Annihilator is currently slightly ahead of Aldrachi Reaver but the gap is small and could shift with tuning. [RETRIEVED, method.gg]
Priority: Fracture/Shear to generate Fury and Soul Fragments, Soul Cleave/Spirit Bomb to consume fragments for healing and damage, Sigil of Flame/Fiery Brand for damage plus mitigation, Demon Spikes for physical mitigation uptime.
Cooldowns: Fiery Brand paired with the Annihilator meteor/burst window (Voidfall stacks via Fracture).
Mistakes a log catches:
1. Soul Fragments left unconsumed, overcapped — stack count at cap for multiple GCDs.
2. Demon Spikes uptime gaps ahead of a physical-damage phase.
3. Metamorphosis/Fiery Brand not pre-positioned before a known high-damage mechanic.
Guides: [Method talents](https://www.method.gg/guides/vengeance-demon-hunter/talents)

### Devourer — DPS (new spec, added in Midnight)
Hero talents: Void-Scarred is ahead of Annihilator in all Season 2 encounters for single-target and pulls further ahead in AoE at all M+ key levels; Annihilator remains playable for those who like its style. [RETRIEVED, WebSearch]
Priority: this is the newest, least-documented spec — general shape from what's retrieved: build Void resources through core generators, spend on Collapsing Star, and use Void Metamorphosis as the burst transformation window (Apex Talent makes Collapsing Star always crit inside it and grants bonus souls on entry). Treat this priority summary as thin; check the guide links for the current button order before coaching in detail.
Cooldowns: Void Metamorphosis paired with a saved Collapsing Star to open the window.
Mistakes a log catches (general, lower confidence given thin source coverage):
1. Collapsing Star not saved to open inside Void Metamorphosis.
2. Core resource capped outside the burst window — RESOURCE_CHANGE plateau.
3. Void Metamorphosis not aligned with raid cooldowns/trinkets.
Guides: [Method talents](https://www.method.gg/guides/devourer-demon-hunter/talents) · [Icy Veins talents](https://www.icy-veins.com/wow/devourer-demon-hunter-pve-dps-spec-builds-talents) · [Maxroll raid](https://maxroll.gg/wow/class-guides/devourer-demon-hunter-raid-guide) · [Wowhead talent builds](https://www.wowhead.com/guide/classes/demon-hunter/devourer/talent-builds-pve-dps)

## Evoker

### Devastation — DPS (ranged)
Hero talents: Scalecommander outperforms Flameshaper in almost all damage profiles — strong single-target without sacrificing cleave, recommended for both raid and M+. [RETRIEVED, method.gg]
Priority: Living Flame/Azure Strike as fillers, Pyre for AoE (Eruption is Augmentation's spender, not Devastation's), charge empowered spells (Fire Breath/Disintegrate) to the level the pull actually needs, Dragonrage as the core burst window, extended via Animosity/Causality by casting empowered spells inside it, with Tyranny maximizing Mastery value during the window.
Cooldowns: Dragonrage paired with Deep Breath and trinkets.
Mistakes a log catches:
1. Empowered spells cast at the wrong charge level for the situation (e.g. a max-charge Fire Breath on a single target).
2. Dragonrage not extended by empowered casts inside it — shorter buff duration than expected.
3. Essence capped instead of spent on Pyre/Eruption — RESOURCE_CHANGE plateau.
Guides: [Method talents](https://www.method.gg/guides/devastation-evoker/talents)

### Preservation — Healer
Hero talents: Flameshaper for players leaning into breath-based healing — stronger Dream Breath in raid, highest damage+healing potential and extra flexibility in M+. Chronowarden leans on Prescience/buff-based healing instead. [RETRIEVED, WebSearch]
Priority: apply Echo before a big heal for the double-dip, Dream Breath/Spiritbloom for raid-wide healing, Emerald Communion/Rewind for cooldowns, Living Flame filler when nothing urgent.
Cooldowns: Dream Breath (Flameshaper-empowered) paired with a known raid-damage phase.
Mistakes a log catches:
1. Echo not applied before a big heal — no Echo aura preceding the cast.
2. Major cooldown not aligned with the damage spike.
3. Empowered heal charged too low for a raid check under time pressure.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/preservation-evoker-pve-healing-spec-builds-talents) · [Maxroll M+](https://maxroll.gg/wow/class-guides/preservation-evoker-mythic-plus-guide) · [Method](https://www.method.gg/guides/preservation-evoker/talents)

### Augmentation — DPS (ranged support/hybrid)
Hero talents: Chronowarden recommended for raiding (vastly outperforms in raid scenarios); Scalecommander recommended for weekly keys, Chronowarden again for higher keys. [RETRIEVED, WebSearch]
Priority: spread Prescience to buff allies' damage, keep Ebon Might up on self and key allies, use Upheaval/Breath of Eons as the core buff-extension cooldowns, Living Flame/Azure Strike as filler.
Cooldowns: Breath of Eons paired with the raid's other burst cooldowns (it buffs allied cooldowns too).
Mistakes a log catches:
1. Ebon Might allowed to fall off self or key allies — AURA_REMOVED gaps.
2. Prescience not kept on the current top damage dealers.
3. Breath of Eons/Upheaval not aligned with the raid's cooldown window.
Guides: [Icy Veins talents](https://www.icy-veins.com/wow/augmentation-evoker-pve-dps-spec-builds-talents) · [Icy Veins DPS](https://www.icy-veins.com/wow/augmentation-evoker-pve-dps-guide) · [Method](https://www.method.gg/guides/augmentation-evoker/talents)

---

## Meta snapshot — VOLATILE (fetched 2026-09-25, recheck after 14 days or a patch)

Primary source: SeeMeta.com Raid and Mythic+ tier lists, which state they aggregate real boss-kill and keystone-run logs (Warcraft Logs-derived) with pick-rate weighting. RETRIEVED via browser this session, patch 12.1.0, Midnight, data period 2026-09-12 to 2026-09-25, last updated 2026-09-25 (today).
- Raid: https://seemeta.com/en/wow/raid
- Mythic+: https://seemeta.com/en/wow/mythic-plus

Archon.gg's tier-list pages (the brief's first-choice source) returned a "Human Verification" bot-check wall on every fetch attempt (`archon.gg/wow/tier-list/{dps,tank,healer}-rankings/mythic-plus/...`). Per policy I did not attempt to solve or bypass it, so Archon could not be used directly this session. raider.io's M+ character-rankings page confirmed the live season slug (`season-midnight-2`) and current dungeon ("Seat" = Seat of the Triumvirate) but didn't finish loading spec-level breakdowns in the time available.

### Raid — DPS tier (5,475 logged runs, ~324 ilvl sample)
- S: Arcane Mage, Arms Warrior, Retribution Paladin, Demonology Warlock, Elemental Shaman, Balance Druid
- A: Beast Mastery Hunter, Marksmanship Hunter, Havoc Demon Hunter, Frost Death Knight, Assassination Rogue, Unholy Death Knight
- B: Devourer Demon Hunter, Windwalker Monk, Shadow Priest
- C: Subtlety Rogue, Fury Warrior, Devastation Evoker, Enhancement Shaman, Destruction Warlock, Augmentation Evoker, Feral Druid
- D: Frost Mage, Affliction Warlock, Survival Hunter, Outlaw Rogue, Fire Mage

### Raid — Healer tier (1,262 logged runs)
- S: Restoration Shaman, Holy Priest
- A: Holy Paladin
- B: Restoration Druid, Preservation Evoker, Mistweaver Monk
- (lowest, unranked-tier): Discipline Priest

### Raid — Tank tier (655 logged runs)
- S: Blood Death Knight
- A: Protection Paladin
- B: Guardian Druid, Brewmaster Monk, Protection Warrior
- C: Vengeance Demon Hunter

### Mythic+ — DPS tier (3,982 logged runs, high keys, ~324 ilvl sample)
- S: Arcane Mage, Arms Warrior, Retribution Paladin, Demonology Warlock, Beast Mastery Hunter, Elemental Shaman
- A: Balance Druid, Havoc Demon Hunter, Unholy Death Knight, Shadow Priest, Assassination Rogue
- B: Frost Death Knight, Marksmanship Hunter, Devourer Demon Hunter, Windwalker Monk, Enhancement Shaman, Subtlety Rogue, Devastation Evoker
- C: Feral Druid, Destruction Warlock, Affliction Warlock, Fury Warrior
- (lowest, unranked-tier): Frost Mage, Augmentation Evoker, Survival Hunter, Outlaw Rogue, Fire Mage

### Mythic+ — Healer tier (929 logged runs)
- S: Holy Paladin, Restoration Shaman, Holy Priest
- B: Mistweaver Monk, Restoration Druid, Preservation Evoker
- (lowest, unranked-tier): Discipline Priest

### Mythic+ — Tank tier (689 logged runs)
- S: Blood Death Knight, Protection Paladin
- B: Guardian Druid, Vengeance Demon Hunter
- C: Protection Warrior, Brewmaster Monk

Cross-check (REPORTED, not independently fetched — a WebSearch synthesis citing leprestore.gg, which says it draws on Wowhead/Archon/Warcraft Logs/Blizzard hotfix data as of 2026-09-04): Demonology Warlock moved to S tier after an August 25 tuning pass; Arms Warrior and Arcane Mage sit at A+; a second tier lists Unholy DK, Subtlety Rogue, Devourer DH, Elemental Shaman, Outlaw Rogue, Windwalker Monk, and Assassination Rogue. This broadly agrees with SeeMeta on the top of the DPS list (Demonology/Arms/Arcane all top-tier) but ranks Subtlety Rogue, Outlaw Rogue, and Windwalker Monk noticeably higher than SeeMeta's log-derived numbers do. I trust SeeMeta more for this file because it shows its methodology (real logs, dated, numeric DPS/HPS per spec) rather than a qualitative tier claim I couldn't verify at the source.

Takeaways a coach can state with confidence right now:
- Overall-strongest DPS across both raid and M+: Arcane Mage, Arms Warrior, Retribution Paladin, Demonology Warlock, Elemental Shaman.
- Weakest DPS in both settings: Fire Mage and Outlaw Rogue post consistently at the bottom of both lists despite strong guide-level talent recommendations — this is a tuning gap, not a "you're playing it wrong" signal.
- Blood Death Knight is the clear top tank in both raid and M+; Protection Paladin is strong in both, Vengeance DH and Brewmaster Monk are the weakest tanks in their respective settings.
- Holy Priest and Restoration Shaman are the top healers in both settings; Discipline Priest is the consistent bottom performer in the aggregated logs.

---

## Sources
1. https://warcraft.wiki.gg/wiki/Hero_talent — WebFetch, full hero-talent tree/spec-pairing list for Midnight, RETRIEVED.
2. https://www.windowscentral.com/gaming/pc-gaming/world-of-warcraft-expansion-roadmap-detailed — WebSearch snippet, Midnight roadmap/patch cadence.
3. https://www.icy-veins.com/wow/midnight-expansion-guide — WebSearch snippet, expansion overview.
4. https://en.wikipedia.org/wiki/World_of_Warcraft:_Midnight — WebSearch snippet, expansion background.
5. https://www.wowhead.com/guide/midnight/expansion-overview — WebSearch snippet.
6. http://worldofwarcraft.blizzard.com/en-us/news/24230699/level-up-your-talents-in-midnight — WebSearch snippet, Blizzard blue post on talent point changes.
7. https://news.blizzard.com/en-us/article/24244455/midnight-pre-expansion-content-update-notes — WebSearch snippet + WebFetch (confirmed Season 1 dungeon unlock list; couldn't confirm current patch number from body text).
8. https://news.blizzard.com/en-us/article/24246298/second-midnight-pre-expansion-update-notes — WebFetch, partial (season/dungeon names only).
9. https://seemeta.com/en/wow/mythic-plus — Browser RETRIEVED, M+ tier list, patch 12.1.0, fetched 2026-09-25.
10. https://seemeta.com/en/wow/raid — Browser RETRIEVED, raid tier list, patch 12.1.0, fetched 2026-09-25.
11. https://raider.io/mythic-plus-character-rankings/season-midnight-2/seat/all/all — Browser RETRIEVED (partial load), confirmed season/dungeon slug only.
12. https://www.archon.gg/wow/tier-list/dps-rankings/mythic-plus/high-keys/seat/this-week — attempted, blocked by bot-verification wall, not bypassed.
13. https://www.archon.gg/wow/tier-list/tank-rankings/mythic-plus/10/seat/this-week — attempted, blocked by bot-verification wall.
14. https://www.archon.gg/wow/tier-list/healer-rankings/mythic-plus/10/seat/this-week — attempted, blocked by bot-verification wall.
15. https://leprestore.com/guides/wow/mythic-plus-dps-rankings/ — WebSearch snippet only (REPORTED), cross-check tier claims.
16–74. Guide-site URLs cited inline under each spec's "Guides" line (Icy Veins, Method.gg, Maxroll.gg, Murlok.io, Wowhead, Kalamazi.gg) — each URL came directly from a WebSearch result or a successful WebFetch this session (2026-09-25); none were constructed or guessed. See each spec section for the exact link.

## Open questions
- Elemental Shaman: no confirmed raid-vs-M+ hero-talent split (Farseer vs. Stormbringer) found before the WebSearch quota (200 calls/session, shared across this session's work) ran out. Flagged "check current guide" in its section. (Unholy DK's hero-talent split was resolved in a follow-up fetch: Rider of the Apocalypse for raid, either viable in M+.)
- Feral Druid hero-talent lean (Wildstalker vs. Druid of the Claw) reads as genuinely close in every source found, and its rotation prose is carried from pre-Midnight training data (INFERRED, unverified) rather than a Midnight-specific fetch — flagged in the method note's confidence tiers.
- Protection Warrior and Guardian Druid rotation prose is likewise carried from pre-Midnight training data — method.gg's talent pages for both returned hero-talent info but no rotation detail this session, and the dedicated "Playstyle & Rotation" sub-pages weren't fetched. Treat their button names as a starting checklist, not verified.
- Devourer Demon Hunter is the newest spec in the game (added this expansion) — guide sites have far less depth on it than on the other 38 specs. Treat its priority/mistake section as a starting sketch, not a settled rotation.
- Patch name "Curse of Ula'tek" for 12.1 is REPORTED (from a WebSearch synthesis, not a Blizzard page fetched this session) — the patch number 12.1.0 and season number are corroborated independently by SeeMeta's dated tier-list pages, but the patch's subtitle was not independently confirmed.
- Class Discord community servers (e.g. the long-standing per-class theorycrafting Discords) were not verified this session — WebSearch quota ran out before I could confirm current invite links, and I won't construct a discord.gg URL I haven't seen. A coach wanting these should search "<class name> wow discord" or check the class's Icy Veins/Wowhead guide footer, which usually links the current one.
- Archon.gg (explicitly named in the task) could not be read directly due to its bot-verification gate; SeeMeta was used as the numeric-tier-list substitute. If Archon access becomes available (e.g. via an authenticated session), re-verify the tier lists against it.
- SeeMeta is not a brand-name-recognized stats site the way Archon/Warcraft Logs/raider.io are; treat its tier placements as directionally useful but re-confirm against Archon or Warcraft Logs' own parse-percentile pages when accessible.
- Season 2 dungeon pool (which exact 8 dungeons, beyond the confirmed "Seat of the Triumvirate") was not independently enumerated this session.
- Scope note: per the shared brief's "do not edit any other file," this session did not write anything to the Atlas Inbox (`G:\My Drive\Obsidian Vaults\AI Projects\01_Inbox\`) even though CLAUDE.md's general inbox-capture rule would otherwise apply — that capture is left to whichever orchestrator session assembles the final mentor knowledge pack.
