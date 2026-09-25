'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const builder = require('../../bridge/forever/modules/60-builder');

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wowai-builder-'));
  const mentorDir = path.join(root, 'mentor');
  const staging = path.join(mentorDir, 'addon-staging', 'Demo');
  const addonDir = path.join(root, 'AddOns');
  fs.mkdirSync(staging, { recursive: true });
  fs.mkdirSync(addonDir, { recursive: true });
  const ctx = {
    HERE: root, cfg: { addonDir, forever: { mentorDir } }, state: { forever: { builder: { used: {} } } },
    finish(job, status, text) { job.result = { status, text }; }, saveState() {},
    atomicWrite(file, data) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const temp = `${file}.tmp`;
      fs.writeFileSync(temp, data);
      fs.renameSync(temp, file);
    },
  };
  for (let i = 1; i <= 20; i++) {
    const name = `WoWAI_U${String(i).padStart(2, '0')}`;
    fs.mkdirSync(path.join(addonDir, name));
    fs.writeFileSync(path.join(addonDir, name, '.wowai-slot'), 'slot');
    fs.writeFileSync(path.join(addonDir, name, 'main.lua'), '-- Reserved for test\n');
  }
  return { root, staging, addonDir, ctx };
}

function source(staging, lua = 'local ok = true\n') {
  fs.writeFileSync(path.join(staging, 'Demo.toc'), '## Interface: 16001\nsecond.lua\nmain.lua\n');
  fs.writeFileSync(path.join(staging, 'main.lua'), lua);
  fs.writeFileSync(path.join(staging, 'second.lua'), 'local second = true\n');
}

test('builder rejects unsafe names and lint failures without writing slots', () => {
  const { staging, addonDir, ctx } = fixture();
  source(staging, 'loadstring("bad")\n');
  for (const name of ['../x', 'a/b', 'WoWAI_X']) {
    const job = { cmd: 'try', text: name };
    builder.intercept(job, ctx);
    assert.equal(job.result.status, 'error');
  }
  const job = { cmd: 'try', text: 'Demo' };
  builder.intercept(job, ctx);
  assert.match(job.result.text, /LUA-DYNAMIC-CODE|LUA-RESTRICTED/);
  assert.equal(fs.readFileSync(path.join(addonDir, 'WoWAI_U01', 'main.lua'), 'utf8'), '-- Reserved for test\n');
});

test('builder consumes fresh slots in TOC order and reports exhaustion', () => {
  const { staging, addonDir, ctx } = fixture();
  source(staging);
  for (let i = 1; i <= 20; i++) {
    const job = { cmd: 'try', text: 'Demo' };
    builder.intercept(job, ctx);
    assert.match(job.result.text, new RegExp(`slot=WoWAI_U${String(i).padStart(2, '0')}`));
    const content = fs.readFileSync(path.join(addonDir, `WoWAI_U${String(i).padStart(2, '0')}`, 'main.lua'), 'utf8');
    assert.ok(content.indexOf('-- second.lua') < content.indexOf('-- main.lua'));
  }
  const last = { cmd: 'try', text: 'Demo' };
  builder.intercept(last, ctx);
  assert.match(last.result.text, /All 20 test slots/);
});

test('builder refuses symlinks and promotion collisions, then marks promotion', t => {
  const { staging, addonDir, ctx } = fixture();
  source(staging);
  try { fs.symlinkSync(path.join(staging, 'main.lua'), path.join(staging, 'linked.lua')); }
  catch { t.skip('symlink creation is unavailable'); return; }
  const linked = { cmd: 'try', text: 'Demo' };
  builder.intercept(linked, ctx);
  assert.match(linked.result.text, /linked path/);
  fs.unlinkSync(path.join(staging, 'linked.lua'));
  const dest = path.join(addonDir, 'Demo');
  fs.mkdirSync(dest);
  let job = { cmd: 'promote', text: 'Demo' };
  builder.intercept(job, ctx);
  assert.match(job.result.text, /Refusing to overwrite/);
  fs.rmSync(dest, { recursive: true });
  fs.mkdirSync(dest);
  fs.writeFileSync(path.join(dest, '.wowai-promoted'), 'marker');
  job = { cmd: 'promote', text: 'Demo' };
  // Promote the staging name as the addon folder.
  job.text = 'Demo';
  builder.intercept(job, ctx);
  assert.ok(fs.existsSync(path.join(dest, '.wowai-promoted')));
});
