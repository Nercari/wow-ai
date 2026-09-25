'use strict';
const path = require('path');
function inside(cwd, root) {
  const rel = path.relative(path.resolve(root), path.resolve(cwd));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}
function setOption(args, names, values) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (names.includes(args[i])) args.splice(i, 2);
  }
  args.push(...values);
}
// Flags that lift the sandbox or approvals; a mentor chat never keeps them.
const BYPASS = /^(--dangerously-skip-permissions|--dangerously-bypass-approvals-and-sandbox|--always-approve|--full-auto|-y|--yolo)(=.*)?$/;
function rewrite(agent, args, cwd, repo) {
  args = args.filter(arg => !BYPASS.test(String(arg)));
  if (agent === 'claude') {
    setOption(args, ['--permission-mode'], ['--permission-mode', 'acceptEdits']);
    for (let i = 0; i < args.length;) {
      if (args[i] === '--allowedTools') {
        args.splice(i, 1);
        while (i < args.length && !args[i].startsWith('-')) args.splice(i, 1);
      } else i++;
    }
    args.push('--allowedTools', 'Read', 'Grep', 'Glob', 'Edit', 'Write', 'WebFetch', 'WebSearch', `Bash(node ${path.join(repo, 'tools', 'slice-fight.js')}:*)`);
  } else if (agent === 'codex') {
    setOption(args, ['-s', '--sandbox'], ['-s', 'workspace-write']);
    setOption(args, ['-C'], ['-C', cwd]);
  } else if (agent === 'agy') {
    setOption(args, ['--mode'], ['--mode', 'accept-edits']);
    setOption(args, ['--add-dir'], ['--add-dir', cwd]);
  } else if (agent === 'grok') {
    setOption(args, ['--permission-mode'], ['--permission-mode', 'dontAsk']);
  } else if (agent === 'hermes') {
    setOption(args, ['--in'], ['--in', cwd]);
  }
  return args;
}
module.exports = {
  inside,
  rewrite,
  augment(job, info, ctx) {
    const root = ctx.cfg.forever && ctx.cfg.forever.mentorDir || path.join(ctx.REPO, '..', 'wow-mentor');
    const cwd = job.cwd || '';
    if (!inside(cwd, root)) return;
    info.args = rewrite(info.agentId || job.agent, info.args || [], cwd, ctx.REPO);
  },
};
