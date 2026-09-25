'use strict';

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

function argsOf(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    args[key] = argv[i + 1] && !argv[i + 1].startsWith('--')
      ? argv[++i]
      : true;
  }
  return args;
}

function parseTimestamp(value, year) {
  const match = value.match(/^(\d{1,2})\/(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})\.(\d+)/);
  if (!match || !year) return new Date(value).getTime();
  const millis = Number((match[6] + '000').slice(0, 3));
  return Date.UTC(year, Number(match[1]) - 1, Number(match[2]),
    Number(match[3]), Number(match[4]), Number(match[5]), millis);
}

function identifyFields(fields) {
  const names = [];
  const guids = [];
  for (let index = 0; index < fields.length; index++) {
    const value = fields[index].replace(/^"|"$/g, '');
    if (/^Player-[0-9A-Fa-f-]+$/.test(value)) guids.push(index);
    if (/^[^,]+-[^,]+$/.test(value)
      && !/^(Creature|Vehicle|Pet|GameObject|Player)-/.test(value)) {
      names.push(index);
    }
  }
  return { names, guids };
}

function anonymize(fields, player, mapping) {
  const { names, guids } = identifyFields(fields);
  for (const index of names) {
    const name = fields[index].replace(/^"|"$/g, '');
    if (name === player) continue;
    if (!mapping.has(name)) mapping.set(name, `Player${mapping.size + 1}`);
    const precedingGuid = fields[index - 1];
    if (precedingGuid && /^"?Player-[0-9A-Fa-f-]+"?$/.test(precedingGuid)) {
      mapping.set(precedingGuid.replace(/^"|"$/g, ''), mapping.get(name));
    }
    fields[index] = `"${mapping.get(name)}"`;
  }
  for (const index of guids) {
    const guid = fields[index].replace(/^"|"$/g, '');
    const mapped = mapping.get(guid);
    if (!mapped) continue;
    const number = Number(mapped.slice('Player'.length));
    fields[index] = `"Player-0000-${String(number).padStart(8, '0')}"`;
  }
}

async function main() {
  const args = argsOf(process.argv.slice(2));
  if (!args.log) {
    console.error('Usage: node probe/check-log.js --log <file> [--player Name-Realm]');
    process.exitCode = 2;
    return;
  }

  const counts = {};
  const encounters = [];
  const samples = [];
  const player = args.player || '';
  const mapping = new Map();
  const input = fs.createReadStream(args.log, { encoding: 'utf8' });
  const reader = readline.createInterface({ input, crlfDelay: Infinity });
  const fixture = args.fixture
    ? fs.createWriteStream(args.fixture, { encoding: 'utf8' })
    : null;
  let firstLine = '';
  let lineCount = 0;
  let playerSeen = false;
  let guidSeen = false;
  let advanced = false;
  let yearFound = false;
  let timezoneFound = false;
  let fixtureCount = 0;

  const start = args.start ? new Date(args.start).getTime() : NaN;
  const end = args.end ? new Date(args.end).getTime() : NaN;
  const yearHint = args.start ? new Date(args.start).getUTCFullYear() : null;

  for await (const line of reader) {
    lineCount++;
    if (!line) continue;
    if (!firstLine) firstLine = line;
    const timestamp = line.match(/^(\d{1,2}\/\d{1,2}\s+\d{2}:\d{2}:\d{2}\.\d+)\s+(.+)$/);
    const fields = timestamp
      ? [timestamp[1], ...timestamp[2].split(',')]
      : line.split(',');
    const event = (timestamp ? fields[1] : fields[0] || '')
      .trim().replace(/^"|"$/g, '');
    counts[event] = (counts[event] || 0) + 1;
    if (lineCount < 4) {
      yearFound ||= /\b20\d\d\/\d\d\/\d\d/.test(line);
      timezoneFound ||= /[+-]\d{4}(?:,|$)/.test(line);
    }
    if (event === 'ENCOUNTER_START' || event === 'ENCOUNTER_END') {
      encounters.push(line);
    }
    if (event === 'SPELL_DAMAGE' && samples.length < 3) {
      const nonAdvancedFields = 20;
      if (fields.length > nonAdvancedFields) {
        advanced = true;
        samples.push({ fields: fields.length, line });
      }
    }
    if (player && line.includes(player)) playerSeen = true;
    if (/Player-[0-9A-Fa-f-]+/.test(line)) guidSeen = true;

    if (fixture) {
      const parsedTime = parseTimestamp(fields[0], yearHint);
      if (parsedTime < start || parsedTime > end) continue;
      anonymize(fields, player, mapping);
      fixture.write(fields.join(',') + '\n');
      fixtureCount++;
    }
  }
  if (fixture) await new Promise(resolve => fixture.end(resolve));

  const summary = {
    file: path.basename(args.log),
    firstLine,
    firstFields: firstLine ? firstLine.split(',').length : 0,
    timestamp: {
      sample: firstLine.split(',')[0] || '',
      fourDigitYear: yearFound,
      timezoneSuffix: timezoneFound,
    },
    lineCount,
    counts,
    advancedParameters: {
      present: advanced,
      fieldIndexGuess: advanced ? 20 : null,
      samples,
    },
    player: { name: player || null, nameAppears: playerSeen, guidAppears: guidSeen },
    encounters,
    fixture: fixture ? {
      file: path.basename(args.fixture),
      lines: fixtureCount,
      players: Object.fromEntries(mapping),
    } : null,
  };

  if (args.json) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }
  console.log(`File: ${summary.file}`);
  console.log(`First line (${summary.firstFields} fields): ${firstLine}`);
  console.log(`Timestamp: ${summary.timestamp.sample}; year=${yearFound}; timezone suffix=${timezoneFound}`);
  console.log('Counts:', JSON.stringify(counts));
  console.log(`Advanced parameters: ${advanced}; field-index guess=${summary.advancedParameters.fieldIndexGuess}`);
  for (const sample of samples) console.log(`Sample (${sample.fields} fields): ${sample.line}`);
  console.log(`Player ${player || '(unspecified)'}: name=${playerSeen}; Player-GUID=${guidSeen}`);
  console.log('Encounter lines:', encounters.join('\n') || '(none)');
  if (summary.fixture) console.log('Fixture:', JSON.stringify(summary.fixture));
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
