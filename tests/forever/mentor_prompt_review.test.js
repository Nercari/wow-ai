'use strict';
// Backlog item 29: the coach told the player to "send the addon's review
// command" without naming it. The Reviews section must name both ways in.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('the mentor prompt names the review command and the button', () => {
  const mentor = fs.readFileSync(path.join(__dirname, '..', '..', 'mentor', 'AGENTS.md'), 'utf8');
  const reviews = mentor.slice(mentor.indexOf('## Reviews'), mentor.indexOf('## ', mentor.indexOf('## Reviews') + 3));
  const rule = reviews.split('\n').find(l => l.startsWith('**Name the command.**')) || '';
  for (const word of ['`/ai review`', '**Review last fight**', 'Never say']) assert.ok(rule.includes(word), word);
});
