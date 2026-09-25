#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let addons = '';
let iface = '';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--addons') addons = args[++i];
  else if (args[i] === '--interface') iface = args[++i];
}
const cfgFile = path.join(__dirname, '..', 'bridge', 'config.json');
const cfg = fs.existsSync(cfgFile) ? JSON.parse(fs.readFileSync(cfgFile, 'utf8')) : {};
addons = addons || cfg.addonDir;
iface = iface || cfg.tocInterface || '16001';
if (!addons) throw new Error('AddOns directory missing; use --addons <dir>');
for (let i = 1; i <= 20; i++) {
  const slot = `WoWAI_U${String(i).padStart(2, '0')}`;
  const dir = path.join(addons, slot);
  if (fs.existsSync(dir)) {
    const dirInfo = fs.lstatSync(dir);
    let markerInfo;
    try { markerInfo = fs.lstatSync(path.join(dir, '.wowai-slot')); } catch {}
    if (!dirInfo.isDirectory() || dirInfo.isSymbolicLink() || !markerInfo ||
        !markerInfo.isFile() || markerInfo.isSymbolicLink()) {
      throw new Error(`Refusing to overwrite unmarked folder: ${dir}`);
    }
  } else fs.mkdirSync(dir, { recursive: true });
  const files = {
    [slot + '.toc']: [
      `## Interface: ${iface}`,
      `## Title: WoW AI user slot ${String(i).padStart(2, '0')}`,
      '## LoadOnDemand: 1',
      '## Notes: filled by the WoW AI builder',
      '',
      'main.lua',
      '',
    ].join('\n'),
    'main.lua': '-- Reserved for the WoW AI builder.\n',
    '.wowai-slot': 'wow-ai user slot\n',
  };
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(dir, name);
    if (!fs.existsSync(file)) fs.writeFileSync(file, content, { flag: 'wx' });
  }
}
console.log('Installed WoWAI_U01..WoWAI_U20. Start the client to discover them.');
