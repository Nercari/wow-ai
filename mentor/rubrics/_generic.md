# Generic PvE rubric (all classes)

Checks you can prove from the player-filtered combat log. Each row names the evidence to quote. Class rubrics (`rubrics/<class>.md`) add rotation and cooldown checks; write one per class when the player asks, with sources (see the Freshness rule).

| # | Mistake | Evidence in the log | Impact |
|---|---|---|---|
| G1 | Died to avoidable damage | `UNIT_DIED` for the player; the 15 s before it: repeated `SPELL_PERIODIC_DAMAGE`/`SPELL_DAMAGE` from the same ground or frontal spell ID | Highest: a death costs the whole remaining fight |
| G2 | No defensive used before a death | damage-taken spike in the last 5 s, no `SPELL_CAST_SUCCESS` of a defensive, potion or healthstone by the player, and the ability was not on cooldown (check earlier casts) | High |
| G3 | Standing in a hazard (advanced logging) | several ticks of the same periodic spell while the player's position barely moves; report seconds and coordinates | High |
| G4 | Idle time (DPS/heal) | gaps > 2.5 s without a player `SPELL_CAST_SUCCESS` / `SWING_DAMAGE` while the target was alive and the player was not dead or moving far | Medium |
| G5 | Missed interrupt | enemy `SPELL_CAST_START` that completes (`SPELL_CAST_SUCCESS` / damage) while the player had an interrupt available; only when the player's role or the group plan expects them to kick | Medium |
| G6 | Late major cooldown | the damage/heal cooldown first used long after the pull, or never, on a fight long enough for two uses | Medium |
| G7 | Resource capping | resource at max for several consecutive casts (advanced logging power fields) | Low–medium |
| G8 | Pulled with low health/mana | the first player lines of the fight show low resource (advanced logging) | Low |

Rules:
- Quote the lines. A row without a quoted line is not a finding.
- Rank by impact, keep at most 3.
- Don't infer intent ("you panicked"). Describe what happened and what to do.
- If advanced logging is off, G3, G7 and G8 are not available; say so once.
