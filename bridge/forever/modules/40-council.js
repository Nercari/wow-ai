'use strict';
module.exports = {
  async intercept(job, ctx) {
    if (job.cmd !== 'council') return false;
    const opts = ctx.cfg.forever.council || {};
    const ids = (opts.agents || ['claude', 'codex']).filter(id => ctx.cfg.agents && ctx.cfg.agents[id]);
    const prompt = String(job.text || '').replace(/^\[wowai cmd=council\]\n/, '');
    if (!ids.length) { ctx.finish(job, 'error', 'No council agents are configured.'); return true; }
    const results = await Promise.all(ids.map(async id => {
      const r = await ctx.runAgentOnce({ agentId: id, cwd: job.cwd, prompt, timeoutMs: opts.timeoutMs || 240000 });
      return { id, ...r };
    }));
    const good = results.filter(r => r.status === 'done');
    const missing = results.filter(r => r.status !== 'done').map(r => r.id);
    const transcript = good.map(r => `${r.id} said:\n${r.text}`).join('\n\n');
    const synthPrompt = `[council]\nQuestion: ${prompt}\n\n${transcript}\n\n` +
      `Missing: ${missing.join(', ') || 'none'}\nSynthesize per the Council synthesis rules: agreement, disagreement ` +
      'and who is more likely right, missing agents, one recommended answer. End with a TL;DR: block.';
    const synthesis = await ctx.runAgentOnce({ agentId: opts.synthesizer || 'claude', cwd: job.cwd,
      prompt: synthPrompt, timeoutMs: opts.timeoutMs || 240000 });
    const answers = results.map(r => `**${r.id}:**\n${r.status === 'done' ? r.text.trim().slice(0, 1500) : 'Failed or timed out.'}`).join('\n\n');
    const lead = ids.length < 2 ? 'Only one council agent is available.\n\n' : '';
    const missingText = missing.length ? `\n\nMissing: ${missing.join(', ')}` : '';
    ctx.finish(job, 'done', `${lead}${answers}\n\n**Synthesis:**\n${synthesis.text || 'Synthesis failed.'}${missingText}`);
    return true;
  },
};
