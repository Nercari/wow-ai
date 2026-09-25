'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  init(ctx) {
    this.ctx = ctx;
    this.dir = path.join(ctx.REPO, 'bridge', 'ptt');
    fs.mkdirSync(this.dir, { recursive: true });
    this.last = null;
    this.watcher = fs.watch(this.dir, () => this.drain());
  },
  onRun(info) {
    const job = info.job;
    if (!job || job.via === 'ptt' || !job.chat) return;
    this.last = { session: job.session, chat: job.chat, cwd: job.cwd, agent: job.agent };
  },
  intercept(job) {
    if (job.via !== 'ptt' && job.chat) {
      this.last = { session: job.session, chat: job.chat, cwd: job.cwd, agent: job.agent };
    }
    return false;
  },
  drain() {
    const ctx = this.ctx;
    for (const name of fs.readdirSync(this.dir).filter(file => /^\d+\.json$/.test(file))) {
      const file = path.join(this.dir, name);
      let record;
      try { record = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (error) { ctx.log('ptt invalid file:', error.message); }
      try { fs.unlinkSync(file); } catch {}
      const killed = fs.existsSync(path.join(ctx.HERE, 'KILLED'));
      if (killed || !ctx.lastStripSeenAt || Date.now() - ctx.lastStripSeenAt() > 10000) {
        this.drop('dropped: game in lockout or not running');
        continue;
      }
      if (!record || typeof record.text !== 'string' || !record.text.trim() || !this.last) {
        this.drop('dropped: no valid text or active chat');
        continue;
      }
      const now = Date.now();
      const job = { ...this.last, session: `ptt-${now}-${Math.random().toString(36).slice(2)}`,
        id: now,
        text: record.text.trim(), via: 'ptt', at: Date.now() };
      ctx.submit(job);
    }
  },
  drop(reason) {
    const line = `${new Date().toISOString()} ${reason}\n`;
    this.ctx.log('ptt:', reason);
    fs.appendFileSync(path.join(this.dir, 'ptt.log'), line);
  },
  stop() { if (this.watcher) this.watcher.close(); },
};
