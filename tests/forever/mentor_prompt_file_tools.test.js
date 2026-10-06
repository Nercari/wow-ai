'use strict';
// Backlog item 30: the coach listed and read logs with shell commands, which a
// mentor chat blocks, so each try ended in a permission prompt (3 in one session).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const guard = require('../../bridge/forever/modules/05-mentor-guard.js');

test('the mentor prompt tells the coach to use file tools, never shell commands, to read files', () => {
  const mentor = fs.readFileSync(path.join(__dirname, '..', '..', 'mentor', 'AGENTS.md'), 'utf8');
  const rule = mentor.split('\n').find(l => l.includes('**File tools, not shell commands.**')) || '';
  for (const word of ['Read, Grep, Glob', '`ls`', '`Get-Content`', 'pipes', 'node <repo>/tools/']) assert.ok(rule.includes(word), word);
});

test('the file tools the prompt names are the ones a mentor chat allows without asking', () => {
  const args = guard.rewrite('claude', [], '/w', '/repo');
  const allowed = args.slice(args.indexOf('--allowedTools') + 1);
  for (const tool of ['Read', 'Grep', 'Glob']) assert.ok(allowed.includes(tool), tool);
  assert.ok(!allowed.some(r => /^Bash(\((ls|cat|dir|tail)\b.*)?$/.test(r)), 'no shell read rule is pre-allowed');
});
