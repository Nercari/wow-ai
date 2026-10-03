# Warlock rubric (adds to `_generic.md`)

Checks you can prove from the player-filtered combat log slice. Each row names the evidence to quote and the source of the class fact. Every class fact comes from `knowledge/classes-classic.md` (section Warlock; bracketed numbers are that file's own source list) and nothing else. Those facts are Classic-era (vanilla 1-60), so they may differ in Forever: say so once in the review and, where `forever-facts/` has a Forever value, prefer it. Use the spell names and IDs exactly as the slice shows them, since names may be localized.

| # | Mistake | Evidence in the log | Impact | Source |
|---|---|---|---|---|
| W1 | DoT uptime gap | `SPELL_AURA_REMOVED` of the player's Corruption or Curse of Agony on the target, then no `SPELL_CAST_SUCCESS` of it for a long stretch while the target was alive; quote the removal, the next cast and the seconds between. Corruption also carries the Siphon Life self-heal when that talent is taken, so mention it only if the notebook or the player says so | High (direct damage loss) | `classes-classic.md` Warlock, "Core rotation/priority" [28] and "Common mistakes" |
| W2 | Life Tap into danger | player `SPELL_CAST_SUCCESS` of Life Tap, then within a few seconds a large `SPELL_DAMAGE` or `SWING_DAMAGE` on the player, or a `UNIT_DIED`; quote the cast and the hit. Life Tap converts health to mana, and the habit tip is to tap only when safe and then Drain Life to heal back | High when it precedes a death, else Medium | `classes-classic.md` Warlock, "Key cooldowns/management" [29] and "Common mistakes" |
| W3 | No pet out | a long fight with no event whose source is a pet of the player (a `Pet-` GUID in the source field, or a pet name the notebook records); with advanced logging the pet owner field confirms it. Without pet events, say the slice shows none and ask whether the build uses a pet | Medium | `classes-classic.md` Warlock, "Core rotation/priority" [28] and "Common mistakes" |
| W4 | Idle time | generic G4, with one addition: the Warlock loop includes wanding between casts [28], so a gap with no `SPELL_CAST_SUCCESS` is only idle if the slice also shows no player damage event in it | Medium | `_generic.md` G4; `classes-classic.md` Warlock, "Core rotation/priority" [28] |
| W5 | No Healthstone or Soulstone prepared (raid) | no player `SPELL_CAST_SUCCESS` of a Healthstone or Soulstone spell in the slice window before the pull, in a raid where the player said they are the stone provider. Omission rule applies: cite the window, and say the stones may have been made earlier | Low | `classes-classic.md` Warlock, "Consumables/world buffs relevance" (INFERRED) |

Rules:
- Quote the lines. A row without a quoted line is not a finding.
- Rank by impact together with `_generic.md`, keep at most 3 in total.
- Do not state a cooldown length or a spell number that is not in the cited section or the slice. The knowledge file flags its Death Coil cooldown as not re-verified, so it is not used as proof of availability here.
- A rule the knowledge file does not cover (stat priority, talent builds, SoD runes and tank builds, MoP Warlock) is not a rubric row. The file lists vanilla Warlock stat priority as an open question.
- If the player's version is not vanilla (SoD, MoP Classic, Forever differences), say the row is a Classic-era check and may not apply.
