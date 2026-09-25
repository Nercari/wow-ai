'use strict';
const fs = require('fs');
const path = require('path');
module.exports = {
  init(ctx) {
    const dir = path.join(ctx.HERE, 'audit');
    fs.mkdirSync(dir, { recursive: true });
    const cutoff = Date.now() - 90 * 86400000;
    for (const file of fs.readdirSync(dir)) {
      const m = /^(\d{4}-\d\d-\d\d)\.jsonl$/.exec(file);
      if (m && Date.parse(`${m[1]}T00:00:00`) < cutoff) {
        try { fs.unlinkSync(path.join(dir, file)); } catch {}
      }
    }
  },
  onRun(info, ctx) {
    const job = info.job || {};
    const prompt = String(job.text || info.prompt || '') + (job.ctx ? `\n${job.ctx}` : '');
    const rec = {
      t: new Date().toISOString(), chat: job.chat || '', agent: info.agentId || job.agent || '',
      cwd: job.cwd || info.cwd || '', bytes: Buffer.byteLength(prompt), prompt,
      attachments: job.images || [], cmd: job.cmd || '',
    };
    const now = new Date();
    const name = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    fs.mkdirSync(path.join(ctx.HERE, 'audit'), { recursive: true });
    fs.appendFileSync(path.join(ctx.HERE, 'audit', `${name}.jsonl`), JSON.stringify(rec) + '\n');
  },
};
