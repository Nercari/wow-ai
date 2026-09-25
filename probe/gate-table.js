'use strict';
const fs = require('node:fs');

function argsOf(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    options[key] = argv[i + 1] && !argv[i + 1].startsWith('--')
      ? argv[++i]
      : true;
  }
  return options;
}

function luaUnescape(value) {
  const escapes = { n: '\n', r: '\r', t: '\t', '\\': '\\', '"': '"', "'": "'" };
  return value.replace(/\\(n|r|t|\\|"|'|\d{1,3})/g, (match, code) => {
    return /^\d/.test(code) ? String.fromCharCode(Number(code)) : escapes[code];
  });
}

function parseReport(file) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/\["report"\]\s*=\s*"((?:\\.|[^"\\])*)"/);
  if (!match) throw Error('Could not find ["report"] string in SavedVariables');
  const report = {};
  for (const line of luaUnescape(match[1]).split(/\r?\n/)) {
    const split = line.indexOf('=');
    if (split > 0) report[line.slice(0, split)] = line.slice(split + 1);
  }
  return report;
}
const rows = [
  ['F02', 'screenshot_hw', 'Screenshot() callable from click', 'log only'],
  ['F03', 'log.advancedParameters.present', 'positions in advanced log', 'review without positions'],
  ['F04', 'meter_after_combat', 'C_DamageMeter readable after combat', 'field omitted'],
  ['F07', 'api_encounterjournal', 'Encounter Journal exists', 'web only'],
  ['F09/F16', 'api_speaktext,tts_voices', 'SpeakText voices', 'text only'],
  ['F12', 'createmacro', 'CreateMacro works out of combat', 'no Create button (copy text)'],
  ['F13', 'api_auctionhouse', 'C_AuctionHouse exists', 'shift-clicked items only'],
  ['F17', 'bridge', 'bridge side gate', 'bridge probe required'],
  ['F23', 'loadaddon_lod', 'LoadOnDemand LoadAddOn works', 'Promote-only (restart per iteration)'],
  ['F25', 'screenshot_hw,png_set,strip_shown', 'Screenshot + PNG + strip decode',
    'H1 transport; decode checked later by bridge decoder'],
  ['S1', 'api_challengemode', 'challenge-mode API exists', 'encounter lockout only'],
  ['S4', 'sv_readback', 'SavedVariables read-back',
    'addon forgets off across reload (bridge still authoritative)'],
  ['R4', 'loggingcombat_call', 'LoggingCombat(true) callable', 'manual /combatlog'],
  ['R3', 'ev_regen,ev_encounter', 'REGEN/ENCOUNTER events fire',
    'manual combat/encounter observations'],
  ['R3', 'screenshot_no_hw', 'screenshot without hardware event',
    'Send click must trigger it'],
];
const PASS_VALUES = {
  api_auctionhouse: ['table'],
  api_encounterjournal: ['function'],
  api_challengemode: ['function'],
  api_speaktext: ['function'],
  tts_voices: ['function'],
  createmacro: ['PASS'],
  loadaddon_lod: ['PASS'],
  meter_after_combat: ['PASS'],
  sv_readback: ['PASS'],
  loggingcombat_call: ['true'],
  ev_regen: ['combat=1'],
  ev_encounter: ['ENCOUNTER_START=1'],
  screenshot_hw: ['PASS'],
  screenshot_no_hw: ['PASS'],
};

function verdict(key, value) {
  if (value == null || value === '' || value.startsWith('UNKNOWN') || value === 'ABSENT') {
    return 'UNKNOWN';
  }
  const keys = key.split(',');
  const values = value.split(',');
  if (keys.length !== values.length) return 'UNKNOWN';
  if (keys.every((item, index) => (PASS_VALUES[item] || []).includes(values[index]))) {
    return 'PASS';
  }
  return keys.every(item => PASS_VALUES[item]) ? 'FALLBACK' : 'UNKNOWN';
}

function getValue(key, saved, log) {
  if (key === 'bridge') return null;
  if (key.startsWith('log.')) {
    return log && log.advancedParameters
      ? String(log.advancedParameters.present)
      : null;
  }
  return key.split(',').map(item => saved[item]).filter(Boolean).join(',') || null;
}

function main() {
  const options = argsOf(process.argv.slice(2));
  if (!options.sv) {
    console.error('Usage: node probe/gate-table.js --sv <SavedVariables.lua> [--log-report <check-log-json>] [--out gate-table.md]');
    process.exitCode = 2;
    return;
  }
  const saved = parseReport(options.sv);
  const log = options['log-report']
    ? JSON.parse(fs.readFileSync(options['log-report'], 'utf8'))
    : null;
  const lines = [
    '# WOW-02 Gate Table', '',
    '| Gate | Probe key(s) | Result | Verdict | Feature(s) affected | Fallback |',
    '|---|---|---|---|---|---|',
  ];
  for (const [gate, key, feature, fallback] of rows) {
    const value = getValue(key, saved, log);
    const result = gate === 'F25' ? 'UNKNOWN' : verdict(key, value);
    lines.push(`| ${gate} | ${key} | ${value || 'UNKNOWN'} | ${result} | ${feature} | ${fallback} |`);
  }
  lines.push('', '## Upstream transports (H1)', '', '| Transport | Result | Notes |',
    '|---|---|---|', '| Reload transport | UNKNOWN | Fill in after manual checklist |',
    '| Pixel tiers | UNKNOWN | Fill in after manual checklist |', '');
  const output = lines.join('\n');
  if (options.out) fs.writeFileSync(options.out, output);
  else console.log(output);
}
try{main();}catch(e){console.error(e.message);process.exitCode=1;}
