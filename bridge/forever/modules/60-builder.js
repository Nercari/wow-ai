'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { scan } = require('../../../tools/safety-ci');

function fail(ctx, job, message) {
  ctx.finish(job, 'error', message);
}

function loadFiles(name, ctx) {
  const root = path.resolve(ctx.cfg.forever.mentorDir, 'addon-staging', name);
  const rootInfo = fs.lstatSync(root);
  if (!rootInfo.isDirectory() || rootInfo.isSymbolicLink()) throw new Error('Staging path must be a real directory.');
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const files = new Map();
  let bytes = 0;
  for (const entry of entries) {
    if (entry.isSymbolicLink() || !entry.isFile()) throw new Error(`Rejected non-file or linked path: ${entry.name}`);
    const ext = path.extname(entry.name).toLowerCase();
    if (ext === '.xml') throw new Error('XML is not supported by the builder yet.');
    if (!['.toc', '.lua'].includes(ext)) throw new Error(`Only .toc and .lua files are allowed: ${entry.name}`);
    const file = path.resolve(root, entry.name);
    if (!file.startsWith(root + path.sep)) throw new Error(`Path escapes staging directory: ${entry.name}`);
    const content = fs.readFileSync(file, 'utf8');
    bytes += Buffer.byteLength(content);
    files.set(entry.name, { file, content, hash: crypto.createHash('sha256').update(content).digest('hex') });
  }
  if (bytes > 512 * 1024) throw new Error('Staging addon exceeds 512 KB.');
  const tocs = [...files.keys()].filter(file => file.toLowerCase().endsWith('.toc'));
  if (!tocs.length) throw new Error('Staging addon must contain a .toc file.');
  const checked = scan([root], { mode: 'untrusted' });
  if (!checked.ok) throw new Error(`Addon lint failed:\n${checked.findings.map(item => `${item.file}:${item.line} [${item.rule}] ${item.text}`).join('\n')}`);
  for (const item of files.values()) {
    const after = fs.readFileSync(item.file, 'utf8');
    if (crypto.createHash('sha256').update(after).digest('hex') !== item.hash) throw new Error('Staging files changed during lint; retry the build.');
  }
  const toc = files.get(tocs[0]).content;
  const ordered = [];
  for (const line of toc.split(/\r?\n/)) {
    const file = line.trim();
    if (/^[A-Za-z0-9_ -]+\.lua$/i.test(file) && files.has(file) && !ordered.includes(file)) ordered.push(file);
  }
  if (!ordered.length) throw new Error('The .toc must list at least one plain .lua file in the staging folder.');
  return { root, files, ordered };
}

function safeName(value) { return /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(value); }
function isKilled(ctx) { return fs.existsSync(path.join(ctx.HERE, 'KILLED')); }

module.exports = {
  intercept(job, ctx) {
    if (!['try', 'promote', 'builder-reset'].includes(job.cmd)) return false;
    if (job.cmd === 'builder-reset') {
      ctx.state.forever = ctx.state.forever || {};
      ctx.state.forever.builder = { used: {} };
      ctx.saveState();
      ctx.finish(job, 'done', 'Builder slots reset.');
      return true;
    }
    if (isKilled(ctx)) { fail(ctx, job, 'AI is off. /wowai on to resume.'); return true; }
    const name = String(job.text || '').trim();
    if (!safeName(name)) { fail(ctx, job, 'Invalid addon name. Use a letter followed by up to 39 letters, numbers or underscores.'); return true; }
    if (name.startsWith('WoWAI')) { fail(ctx, job, 'Names beginning with WoWAI are reserved.'); return true; }
    let loaded;
    try { loaded = loadFiles(name, ctx); } catch (error) { fail(ctx, job, error.message); return true; }
    const addons = ctx.cfg.addonDir;
    if (job.cmd === 'promote') {
      if (name.startsWith('WoWAI')) { fail(ctx, job, 'Names beginning with WoWAI are reserved.'); return true; }
      const dest = path.join(addons, name);
      if (fs.existsSync(dest)) {
        const info = fs.lstatSync(dest);
        if (!info.isDirectory() || info.isSymbolicLink()) { fail(ctx, job, 'Refusing to promote through a linked or non-directory destination.'); return true; }
        const marker = path.join(dest, '.wowai-promoted');
        let marked = false;
        try { marked = fs.lstatSync(marker).isFile(); } catch {}
        if (!marked) { fail(ctx, job, `Refusing to overwrite unmarked addon folder: ${dest}`); return true; }
      }
      fs.mkdirSync(dest, { recursive: true });
      for (const [file, data] of loaded.files) ctx.atomicWrite(path.join(dest, file), data.content);
      ctx.atomicWrite(path.join(dest, '.wowai-promoted'), `Promoted by WoW AI at ${new Date().toISOString()}\n`);
      ctx.finish(job, 'done', `Promoted ${name}: it loads after the next client restart.`);
      return true;
    }
    ctx.state.forever = ctx.state.forever || {};
    const builder = ctx.state.forever.builder = ctx.state.forever.builder || { used: {} };
    builder.used = builder.used || {};
    let slot = 0;
    for (let i = 1; i <= 20; i++) {
      const candidate = `WoWAI_U${String(i).padStart(2, '0')}`;
      const dir = path.join(addons, candidate);
      try {
        const dirInfo = fs.lstatSync(dir);
        const markerInfo = fs.lstatSync(path.join(dir, '.wowai-slot'));
        if (!builder.used[candidate] && dirInfo.isDirectory() &&
            !dirInfo.isSymbolicLink() && markerInfo.isFile()) { slot = i; break; }
      } catch {}
    }
    if (!slot) {
      ctx.finish(job, 'error', 'All 20 test slots were used since the client started. ' +
        'Restart the client to free them (or /ai builder reset after a restart).');
      return true;
    }
    const slotName = `WoWAI_U${String(slot).padStart(2, '0')}`;
    const body = `-- Built ${name} at ${new Date().toISOString()}\n-- Source files: ${loaded.ordered.join(', ')}\n` +
      loaded.ordered.map(file => `do\n-- ${file}\n${loaded.files.get(file).content}\nend\n`).join('\n');
    ctx.atomicWrite(path.join(addons, slotName, 'main.lua'), body);
    builder.used[slotName] = { slot: slotName, name, at: Date.now() };
    ctx.saveState();
    ctx.finish(job, 'done', `[builder] slot=${slotName} name=${name}\nPress Load in the builder frame.`);
    return true;
  },
};
