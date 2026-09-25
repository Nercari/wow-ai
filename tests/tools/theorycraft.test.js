"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { evaluate, weights, armorReduction, attackTable } = require("../../tools/theorycraft");

const script = path.join(__dirname, "../../tools/theorycraft.js");
const melee = {
  class: "Warrior", level: 60, role: "melee", stats: { weaponSkill: 300 },
  gear: { ap: 300 }, weapon: { min: 70, max: 70, speed: 2 },
  target: { level: 60, armor: 0 }, abilities: [{ name: "Swing", kind: "white" }]
};

function near(actual, expected, tolerance = 0.01) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `expected ${expected}, got ${actual}`);
}

test("white attacks use one roll, equal-level glances, and 200% melee crits", () => {
  // AP = 60*3 - 20 + 300 = 460; swing = 70 + 460/14*2 = 135.7142857.
  // At equal level: 5 miss, 5 dodge, 10 glance at 0.95, 80 hit.
  near(evaluate(melee).totalDps, 135.7142857 * (0.8 + 0.1 * 0.95) / 2);
  const crit = structuredClone(melee);
  crit.stats.critPct = 10;
  // Crit replaces 10 hit points: 70 hit, 10 glance, 10 crit at 2.0.
  near(evaluate(crit).totalDps, 135.7142857 * (0.7 + 0.095 + 0.1 * 2) / 2);
  const pvp = structuredClone(melee);
  pvp.target.player = true;
  // Player targets cannot receive glances: 5 miss, 5 dodge, 90 hit.
  near(evaluate(pvp).totalDps, 135.7142857 * 0.9 / 2);
});

test("boss table has 8 miss, 6.5 dodge, 40 glance, and 15.2 crit", () => {
  const boss = structuredClone(melee);
  boss.target.level = 63;
  boss.stats.critPct = 20;
  const table = attackTable(boss, {
    get: key => ({ meleeMiss: { base: 5, perSkillLow: 0.1, perSkillHigh: 0.2 },
      dodge: { base: 5, perSkill: 0.1 }, glance: { base: 10, perSkill: 2 },
      glanceLow: { base: 1.3, perSkill: 0.05, cap: 0.91 },
      glanceHigh: { base: 1.2, perSkill: 0.03, floor: 0.2, cap: 0.99 },
      hitSuppressionPerSkill: 0.2, critSuppressionPerLevel: 1,
      critAuraSuppressionPlus3: 1.8 })[key]
  }, "white", 20, 0);
  near(table.miss, 0.08, 0.0001);
  near(table.dodge, 0.065, 0.0001);
  near(table.glance, 0.4, 0.0001);
  near(table.glanceMult, 0.65, 0.0001);
  near(table.crit, 0.152, 0.0001);
  near(table.hit, 0.303, 0.0001);
  // 0.303 hit + 0.4*0.65 glance + 0.152*2 crit = 0.867.
  near(table.hit + table.glance * table.glanceMult + table.crit * 2, 0.867, 0.0001);
});

test("yellow attack crits on landed hits using two rolls", () => {
  const scenario = structuredClone(melee);
  scenario.target.level = 63;
  scenario.gear.hitPct = 9;
  scenario.stats.critPct = 20;
  scenario.abilities = [{ name: "Strike", kind: "yellow", baseMin: 1000 }];
  // 8% miss with 1% suppression and 9% hit => 0 miss; 6.5% dodge => 0.935 landed.
  // Crit after suppression is 15.2%; expected damage = 0.935*(1+0.152)*1000.
  near(evaluate(scenario).abilities[0].averageDamagePerCast, 1077.12);
});

test("hit weight is positive below the yellow cap and exactly zero at and above it", () => {
  const scenario = structuredClone(melee);
  scenario.target.level = 63;
  scenario.abilities = [{ name: "Strike", kind: "yellow", weaponPct: 1 }];
  scenario.gear.hitPct = 8;
  assert.ok(weights(scenario).hitPct > 0);
  scenario.gear.hitPct = 9;
  assert.equal(weights(scenario).hitPct, 0);
  scenario.gear.hitPct = 20;
  assert.equal(weights(scenario).hitPct, 0);
});

test("level 60 armor denominator is 5882.5", () => {
  near(armorReduction(3731, 60), 3731 / (3731 + 5882.5), 1e-12);
});

test("spell hit, crit, coefficient, and boss miss", () => {
  const scenario = {
    class: "Mage", level: 60, role: "caster", stats: { sp: 100, spellHitPct: 5, spellCritPct: 10 },
    target: { level: 60 }, abilities: [{ name: "Bolt", kind: "spell", baseMin: 100, coeff: 0.5 }]
  };
  // 150 damage; equal level 4%-5% hit floors at 1%; 10% crit at 1.5.
  near(evaluate(scenario).abilities[0].averageDamagePerCast, 150 * 0.99 * 1.05);
  scenario.target.level = 63;
  // Boss 17%-5% = 12% miss.
  near(evaluate(scenario).abilities[0].averageDamagePerCast, 150 * 0.88 * 1.05);
});

test("tank uses boss level for EH and an incoming attack table", () => {
  const scenario = {
    class: "Warrior", level: 60, role: "tank", hp: 8000,
    stats: { armor: 16000, defense: 400, dodgePct: 15, parryPct: 12, blockPct: 20 },
    target: { level: 63 }, abilities: []
  };
  const result = evaluate(scenario);
  // K(63) = 63*467.5-22167.5 = 7285; EH = 8000/(1-16000/23285).
  near(result.effectiveHealth, 8000 / (1 - 16000 / 23285), 0.1);
  // Gap = 15; penalty = .6 each: 8.4 + 14.4 + 11.4 + 19.4 = 53.6.
  near(result.avoidancePct, 53.6);
  assert.equal(result.crushingCovered, false);
  // 5 + (315-400)*0.04 = 1.6; the prose's "0" conflicts with its own formula.
  near(result.critOnTankPct, 1.6);
  near(result.sheetTotalNeededPct, 102.4);
  scenario.stats.defense = 300;
  near(evaluate(scenario).critOnTankPct, 5.6);
});

test("coefficient override changes crit damage and removes its warning", () => {
  const scenario = structuredClone(melee);
  scenario.stats.critPct = 10;
  scenario.data = { meleeCritBonus: { value: 2, status: "verified", source: "test" } };
  // 70 hit + 10 glance at .95 + 10 crit at 3.0.
  near(evaluate(scenario).totalDps, 135.7142857 * (0.7 + 0.095 + 0.1 * 3) / 2);
  assert.ok(!evaluate(scenario).warnings.some(warning => warning.startsWith("meleeCritBonus")));
  assert.ok(evaluate(melee).warnings.some(warning => warning.startsWith("meleeCritBonus (reported)")));
});

test("offhand uses its own weapon, half damage, offhand mods, and haste", () => {
  const scenario = structuredClone(melee);
  scenario.dualWield = true;
  scenario.weapon.offhand = { min: 40, max: 40, speed: 2 };
  scenario.abilities = [{ name: "Offhand", kind: "white", hand: "off" }];
  scenario.mods = [{ name: "Offhand talent", damagePct: 10, appliesTo: ["offhand"] }];
  const normal = evaluate(scenario);
  // AP 460 gives 40 + 460/14*2 = 105.714, halved for offhand; mod adds 10%.
  // White miss 24%, dodge 5%, glance 10% at .95, hit 61%.
  near(normal.totalDps, 105.7142857 * 0.5 * (0.61 + 0.095) * 1.1 / 2);
  scenario.stats.hastePct = 100;
  near(evaluate(scenario).totalDps, normal.totalDps * 2);
});

test("sourced class ratios change weights and remove unknown warnings", () => {
  const scenario = structuredClone(melee);
  const unknown = evaluate(scenario, { weights: true });
  assert.ok(unknown.warnings.includes("agiPerCritPct (unknown)"));
  assert.equal(weights(scenario).agi, 0);
  scenario.data = { agiPerCritPct: { value: 20, source: "test", status: "verified" } };
  assert.ok(weights(scenario).agi > 0);
  assert.ok(!evaluate(scenario, { weights: true }).warnings.some(warning => warning.startsWith("agiPerCritPct")));
});

test("tank stamina weight adds ten HP before armor reduction", () => {
  const scenario = {
    class: "Warrior", level: 60, role: "tank", hp: 8000,
    stats: { armor: 16000, defense: 300 }, target: { level: 63 }, abilities: []
  };
  const reduction = 16000 / 23285;
  near(weights(scenario).sta.effectiveHealth, 10 / (1 - reduction));
});

test("spell-specific hit mods and shared resource budgets affect casts", () => {
  const scenario = {
    class: "Mage", level: 60, role: "caster", resourcePerSecond: 10,
    target: { level: 63 }, stats: { sp: 0 },
    abilities: [
      { name: "First", kind: "spell", baseMin: 100, cost: 30 },
      { name: "Second", kind: "spell", baseMin: 100, cost: 30 }
    ],
    mods: [{ name: "Hit talent", spellHitPct: 1, appliesTo: ["spell"] }]
  };
  const result = evaluate(scenario);
  // Each spell would cast 40/min, costing 40 resource/s together. Ten available means 10 casts/min each.
  near(result.abilities[0].castsPerMinute, 10);
  near(result.abilities[1].castsPerMinute, 10);
  // Boss miss is 17-1=16%, so each cast averages 84 damage.
  near(result.abilities[0].averageDamagePerCast, 84);
});

test("compare prints +10.00% and CLI handles valid, missing, and invalid files", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "theorycraft-"));
  try {
    const first = path.join(dir, "first.json");
    const second = path.join(dir, "second.json");
    const invalid = path.join(dir, "invalid.json");
    fs.writeFileSync(first, JSON.stringify(melee));
    fs.writeFileSync(second, JSON.stringify({ ...melee, mods: [{ name: "test", damagePct: 10 }] }));
    fs.writeFileSync(invalid, "{");
    const valid = spawnSync(process.execPath, [script, first, "--compare", second], { encoding: "utf8" });
    assert.equal(valid.status, 0);
    assert.match(valid.stdout, /delta \+10\.00%/);
    assert.match(valid.stdout, /Warning: .*reported/);
    for (const file of [path.join(dir, "missing.json"), invalid]) {
      const failure = spawnSync(process.execPath, [script, file], { encoding: "utf8" });
      assert.equal(failure.status, 2);
      assert.equal(failure.stderr.trim().split(/\r?\n/).length, 1);
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
