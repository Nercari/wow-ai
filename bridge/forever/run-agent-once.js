'use strict';

const { spawn } = require('child_process');

function runAgentOnce({ agentId, cwd, prompt, timeoutMs }, deps) {
  const { A, P, cfg, killTree } = deps;
  agentId = A.normalizeAgent(agentId);
  if (!agentId) return Promise.resolve({ status: 'error', text: 'Unknown agent.' });
  const agent = A.AGENTS[agentId], acfg = A.agentConfig(cfg, agentId), cmd = A.resolveCommand(agentId, acfg);
  if (!cmd.found) return Promise.resolve({ status: 'error', text: `${agent.name} is not installed: ${cmd.note}` });
  const system = P.systemPrompt('', ''), input = agent.input({ prompt: String(prompt || ''), system, systemShort: system, resume: '' });
  const args = [...cmd.args, ...agent.args({ cfg: acfg, resume: '', cwd, system, systemShort: system, promptFile: '' })];
  const env = agent.env({ ...process.env });
  return new Promise(resolve => {
    const child = spawn(cmd.file, args, { cwd, env, windowsHide: true, stdio: [input.stdin !== undefined ? 'pipe' : 'ignore', 'pipe', 'pipe'] });
    const parser = agent.parser(); let buffer = '', stderr = '', result = null, ended = false;
    const done = (status, text) => { if (ended) return; ended = true; clearTimeout(timer); resolve({ status, text }); };
    const line = src => { let ev; try { ev = JSON.parse(src); } catch { return; } try { const r = parser.feed(ev); if (r && r.done) result = r.done; } catch (e) { result = { text: e.message, error: true }; } };
    child.stdout.on('data', chunk => { buffer += chunk.toString('utf8'); let n; while ((n = buffer.indexOf('\n')) >= 0) { const row = buffer.slice(0, n).trim(); buffer = buffer.slice(n + 1); if (row) line(row); } });
    child.stderr.on('data', chunk => { stderr += chunk.toString('utf8'); });
    const timer = setTimeout(() => killTree(child), timeoutMs || cfg.timeoutMs || 1800000);
    child.on('error', err => done('error', err.message));
    child.on('close', code => { if (buffer.trim()) line(buffer.trim()); done(result && !result.error ? 'done' : 'error', result ? String(result.text || '') : `${agent.name} exited with code ${code} and no result.\n${stderr.trim().slice(-1500)}`); });
    if (input.stdin !== undefined) { child.stdin.on('error', () => {}); child.stdin.end(input.stdin); }
  });
}
module.exports = { runAgentOnce };
