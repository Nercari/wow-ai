'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const A = require('../../agents');
function send(command, target, text, ctx) {
  return new Promise(resolve => {
    const args = ['send', '-t', target, '-q', text];
    const script = /\.m?js$/i.test(command);
    // The default hermes goes through the same lookup as the chat agent (.exe or unwrapped .cmd shim).
    const r = command === 'hermes' ? A.resolveCommand('hermes', (ctx.cfg.agents || {}).hermes || {}) : { file: command, args: [] };
    const child = spawn(script ? process.execPath : r.file, script ? [command, ...args] : [...r.args, ...args],
      { windowsHide: true, stdio: 'ignore' });
    const timer = setTimeout(() => { child.kill(); resolve(false); }, 20000);
    child.on('error', err => { clearTimeout(timer); ctx.log('phone notifier:', err.message); resolve(false); });
    child.on('close', code => { clearTimeout(timer); resolve(code === 0); });
  });
}
function brief(text) {
  const full = String(text || '');
  const matches = [...full.matchAll(/(?:^|\n)\s*(?:\*\*)?TL;?DR:?(?:\*\*)?\s*/gi)];
  return (matches.length ? full.slice(matches[matches.length - 1].index + matches[matches.length - 1][0].length) : full).trim().slice(0, 300);
}
module.exports = {
  init(ctx) { this.ctx = ctx; this.ackPolicy(); this.timer = setInterval(() => this.ackPolicy(), 6 * 3600000); },
  async ackPolicy() {
    const ctx = this.ctx, file = path.join(ctx.REPO, 'policy', 'ALERT.json');
    try {
      const alert = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (alert.at === ctx.state.forever.policyAckAt) return;
      const msg = `[policy] ${alert.text || alert.message || 'Policy alert'}`;
      ctx.publish('policy', { chat: 'policy', id: Date.now(), status: 'done', text: msg, cwd: '', agent: '' }, true);
      const phone = ctx.cfg.forever.phone || {};
      if (phone.target) await send(phone.command || 'hermes', phone.target, msg, ctx);
      ctx.state.forever.policyAckAt = alert.at; ctx.saveState();
    } catch (err) { if (err.code !== 'ENOENT') ctx.log('policy alert:', err.message); }
  },
  onFinish(job, status, text, ctx) {
    const phone = ctx.cfg.forever.phone || {};
    if (!phone.target || fs.existsSync(path.join(ctx.HERE, 'KILLED'))) return;
    const elapsed = Date.now() - (job.startedAt || Date.now());
    if (elapsed < (phone.notifyAfterMs || 60000) && !['review', 'council', 'journal'].includes(job.cmd)) return;
    const summary = brief(text);
    send(phone.command || 'hermes', phone.target, `${job.chat}: ${status} — ${summary}`, ctx);
  },
  intercept(job, ctx) {
    if (job.cmd !== 'phone') return false;
    const phone = ctx.cfg.forever.phone || {};
    if (!phone.target) { ctx.finish(job, 'error', 'Phone notifications are off.'); return true; }
    const summary = ctx.transcript ? ctx.transcript(job.chat) : '';
    send(phone.command || 'hermes', phone.target, `Continue on your phone: chat ${job.chat}, folder ${job.cwd}. Summary: ${summary}`, ctx)
      .then(ok => ctx.finish(job, ok ? 'done' : 'error', ok ? 'Sent to your phone.' : 'Could not reach your phone (hermes send failed).'));
    return true;
  },
  stop() { if (this.timer) clearInterval(this.timer); },
};
