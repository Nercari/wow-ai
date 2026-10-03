'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const fengari = require('fengari');
const { lua, lauxlib, lualib, to_luastring, to_jsstring } = fengari;

const addon = path.join(__dirname, '..', '..', 'addon', 'WoWAI');
const read = file => fs.readFileSync(path.join(addon, file), 'utf8');

function vm(withForever = true) {
  const L = lauxlib.luaL_newstate();
  lualib.luaL_openlibs(L);
  const run = code => {
    assert.equal(lauxlib.luaL_loadstring(L, to_luastring(code)), lua.LUA_OK);
    const status = lua.lua_pcall(L, 0, 0, 0);
    if (status !== lua.LUA_OK) {
      const message = lua.lua_tostring(L, -1);
      throw new Error(message ? to_jsstring(message) : 'Lua runtime error ' + status);
    }
  };
  const get = expr => {
    run(`local value = (${expr}); RESULT = value == nil and '' or tostring(value)`);
    lua.lua_getglobal(L, to_luastring('RESULT'));
    const result = to_jsstring(lua.lua_tolstring(L, -1));
    lua.lua_pop(L, 1);
    return result;
  };
  run(fs.readFileSync(path.join(__dirname, '..', 'wow_stub.lua'), 'utf8'));
  run('unpack = table.unpack; STUB.gear = {}; GetInventoryItemLink = function(_, slot) return STUB.gear[slot] end');
  run(read('Codec.lua'));
  run(read('Inbox.lua'));
  if (withForever) {
    run(read('Forever.lua'));
    run(read('Forever_Lockout.lua'));
    run(read('Forever_Context.lua'));
    run(read('Forever_Switch.lua'));
    run(read('Forever_Commands.lua'));
  }
  run(read('WoWAI.lua'));
  return { run, get };
}

function records(v) {
  const shown = v.get('WoWAIStrip and WoWAIStrip.shown');
  if (shown !== 'true') return [];
  v.run(`
    local parts = {}
    for _, t in ipairs(WoWAIStrip.textures) do
      if t.shown and t.color then
        local c, r = math.floor(t.x / 4), math.floor(-t.y / 4)
        local n = (t.color[1] >= 0.5 and 4 or 0) + (t.color[2] >= 0.5 and 2 or 0) + (t.color[3] >= 0.5 and 1 or 0)
        parts[r * 200 + c] = n
      end
    end
    local bytes, acc, bits = {}, 0, 0
    for i = 0, #parts do
      acc = acc * 8 + (parts[i] or 0)
      bits = bits + 3
      if bits >= 8 then
        bits = bits - 8
        bytes[#bytes + 1] = math.floor(acc / (2 ^ bits)) % 256
        acc = acc % (2 ^ bits)
      end
    end
    local len = bytes[5] * 256 + bytes[6]
    RESULT = ''
    for i = 1, len do RESULT = RESULT .. string.char(bytes[6 + i]) end`);
  const raw = v.get('RESULT');
  return raw.split('\x1e').filter(Boolean).map(record => {
    const fields = record.split('\x1f');
    return { flags: fields[4], text: fields.slice(fields[4].split(';').includes('c') ? 7 : 6).join('\x1f'), ctx: fields[6] || '' };
  });
}

function setup() {
  const v = vm();
  v.run('STUB.FireEvent("ADDON_LOADED", "WoWAI"); STUB.FireEvent("PLAYER_LOGIN")');
  v.run('for _, mod in ipairs(WoWAIForever.modules) do if mod.init then mod.init() end end');
  v.run('WoWAI.IsConnected = function() return true end');
  return v;
}

test('plain chat context is byte-identical with P3 modules loaded', () => {
  const withModules = vm(true);
  const without = vm(false);
  withModules.run('STUB.FireEvent("ADDON_LOADED", "WoWAI")');
  without.run('STUB.FireEvent("ADDON_LOADED", "WoWAI")');
  assert.equal(withModules.get('WoWAI.GameContext()'), without.get('WoWAI.GameContext()'));
});

test('P3 slash sends use chat routing, one game context, lockouts and profile records', () => {
  const v = setup();
  v.run('WoWAIDB.chats[1].name = "other"; WoWAI.NewChat("mentor"); WoWAIDB.activeChat = WoWAIDB.chats[1].id');
  v.run('STUB.FireEvent("PLAYER_REGEN_DISABLED"); SlashCmdList.WOWAI("hello")');
  assert.match(v.get('WoWAIDB.chats[1].history[#WoWAIDB.chats[1].history].text'), /AI paused in combat/);
  assert.equal(records(v).some(record => record.text === 'hello'), false);
  assert.equal(v.get('WoWAIStrip == nil or not WoWAIStrip.shown'), 'true');
  v.run(`
    WoWAIForever.modules[1].onEvent("PLAYER_REGEN_ENABLED")
    WoWAIForever.modules[2].onEvent("PLAYER_REGEN_ENABLED")
    WoWAIForever.modules[2].onEvent("PLAYER_REGEN_DISABLED")
    WoWAIForever.modules[1].onEvent("ENCOUNTER_START")
    WoWAIForever.modules[2].onEvent("ENCOUNTER_START", 1, "Big Bad")`);
  v.run('WoWAIForever.modules[2].onEvent("PLAYER_DEAD")');
  assert.equal(v.get('InCombatLockdown()'), 'false');
  v.run('SlashCmdList.WOWAI("review")');
  assert.match(v.get('WoWAIDB.chats[2].history[#WoWAIDB.chats[2].history].text'), /during the encounter/);
  v.run(`
    WoWAIForever.modules[1].onEvent("ENCOUNTER_END")
    WoWAIForever.modules[2].onEvent("ENCOUNTER_END", 1, "Big Bad", 0, 1, 1)
    WoWAIForever.modules[1].onEvent("PLAYER_REGEN_ENABLED")
    WoWAIForever.modules[2].onEvent("PLAYER_REGEN_ENABLED")`);
  v.run('SlashCmdList.WOWAI("review")');
  let rec = records(v).at(-1);
  assert.match(rec.flags, /cmd=review/);
  assert.equal((rec.ctx.match(/lastFight=start=/g) || []).length, 1);
  assert.equal((rec.ctx.match(/Game: /g) || []).length, 1);
  assert.match(rec.ctx, /enc=Big Bad/);
  assert.match(rec.ctx, /deaths=/);
  v.run(`
    C_DamageMeter = {
      GetCombatSessionSummary = function()
        return { dps = 812, damage = 45200, duration = 55 }
      end,
    }
    WoWAIForever.Fire("LOCKOUT_CHANGED", true)`);
  assert.doesNotMatch(v.get('WoWAIForever.modules[2].context("review")'), /meter=/);
  v.run('WoWAIForever.Fire("LOCKOUT_CHANGED", false)');
  assert.match(v.get('WoWAIForever.modules[2].context("review")'), /meter=dps 812, dmg 45200, 55s/);
  assert.equal(v.get('WoWAIDB.activeChat'), v.get('WoWAIDB.chats[1].id'));
  v.run('C_ChallengeMode = { GetActiveChallengeMapID = function() return 2 end }; SlashCmdList.WOWAI("review")');
  assert.match(v.get('WoWAIDB.chats[2].history[#WoWAIDB.chats[2].history].text'), /challenge run/);
});

test('the off switch reaches the bridge even in combat', () => {
  const v = setup();
  v.run('WoWAIForever.modules[1].onEvent("PLAYER_REGEN_DISABLED"); SlashCmdList.WOWAI("hello")');
  assert.equal(records(v).length, 0);
  v.run('SlashCmdList.WOWAI("off")');
  assert.match(records(v).at(-1).flags, /cmd=off/);
});

test('switch commands and context payload limits', () => {
  const v = setup();
  v.run('SlashCmdList.WOWAI("off"); SlashCmdList.WOWAI("hello")');
  assert.match(records(v).at(-1).flags, /cmd=off/);
  assert.match(v.get('WoWAIDB.chats[1].history[#WoWAIDB.chats[1].history].text'), /AI is off/);
  v.run('WoWAIForever.modules[1].onEvent("PLAYER_REGEN_DISABLED")');
  v.run('WoWAIForever.modules[1].onEvent("PLAYER_REGEN_ENABLED"); WoWAIDB.chats[1].pendingId = nil; SlashCmdList.WOWAI("on")');
  assert.equal(v.get('WoWAIDB.outbox.cmd'), 'on');
  v.run('for slot = 1, 19 do STUB.gear[slot] = "|Hitem:123456:123456:123456:123456|h[x]|h" end');
  v.run(`
    WoWAIForever.modules[2].onEvent("PLAYER_REGEN_DISABLED")
    WoWAIForever.modules[2].onEvent("ENCOUNTER_START", 1, "Long Encounter")
    WoWAIForever.modules[2].onEvent("PLAYER_DEAD")
    WoWAIForever.modules[2].onEvent("ENCOUNTER_END", 1, "Long Encounter", 0, 1, 1)
    WoWAIForever.modules[1].onEvent("PLAYER_REGEN_ENABLED")
    WoWAIForever.modules[2].onEvent("PLAYER_REGEN_ENABLED")`);
  v.run(`
    WoWAIForever.modules[2].onEvent("TIME_PLAYED_MSG", 12345, 678)
    WoWAIDB.chats[1].pendingId = nil
    WoWAI.Send("Plan leveling", nil, { cmd = "level" })`);
  assert.match(records(v).at(-1).ctx, /played=12345,678/);
  assert.ok(Number(v.get('WoWAIForever.modules[2].context("gear"):len()')) < 600);
  v.run('WoWAIDB.chats[1].pendingId = nil; WoWAI.Send("gear check", nil, { cmd = "gear" })');
  assert.ok(records(v).at(-1).ctx.includes(v.get('WoWAIForever.modules[2].context("gear")')));
  const profiles = ['review', 'death', 'gear', 'build', 'quest', 'level'];
  for (const kind of profiles) {
    v.run(`WoWAI.Send(string.rep("x", 200), nil, { cmd = "${kind}" })`);
    assert.ok(records(v).at(-1).text.length + records(v).at(-1).ctx.length < 3200);
  }
});

test('practice sends the default text out of combat and is blocked in combat', () => {
  const v = setup();
  v.run('WoWAIDB.chats[1].name = "mentor"; WoWAIDB.activeChat = WoWAIDB.chats[1].id');
  v.run('STUB.FireEvent("PLAYER_REGEN_DISABLED"); SlashCmdList.WOWAI("practice")');
  assert.match(v.get('WoWAIDB.chats[1].history[#WoWAIDB.chats[1].history].text'), /AI paused in combat/);
  assert.equal(records(v).some(record => /dummy/.test(record.text)), false);
  v.run('WoWAIForever.modules[1].onEvent("PLAYER_REGEN_ENABLED"); WoWAIDB.chats[1].pendingId = nil; SlashCmdList.WOWAI("practice")');
  const rec = records(v).at(-1);
  assert.match(rec.flags, /cmd=practice/);
  assert.equal(rec.text, 'Compare my last two target-dummy sessions.');
});

test('a reply that lands mid-fight is held and shown once when the fight ends', () => {
  const v = setup();
  v.run('SlashCmdList.WOWAI("hello")');
  assert.notEqual(v.get('WoWAIDB.chats[1].pendingId'), '');
  v.run(`
    STUB.FireEvent("PLAYER_REGEN_DISABLED")
    STUB.prints = {}
    STUB.onLoadAddOn = function()
      local c = WoWAIDB.chats[1]
      WoWAI_SlotData = { now = time(), cwd = "", replies = { { chat = c.id, id = c.pendingId, status = "done", text = "held answer" } } }
    end
    STUB.now = STUB.now + 6
    STUB.Tick()`);
  v.run(`function HeldShown() local n = 0
    for _, h in ipairs(WoWAIDB.chats[1].history) do if h.text == "held answer" then n = n + 1 end end
    return n end`);
  const shown = () => v.get('HeldShown()');
  assert.equal(shown(), '0', 'nothing in the chat window during combat');
  assert.doesNotMatch(v.get('table.concat(STUB.prints, "\\n")'), /held answer/, 'nothing in the game chat during combat');
  assert.notEqual(v.get('WoWAIDB.chats[1].pendingId'), '', 'the chat is still waiting');
  v.run('STUB.now = STUB.now + 6; STUB.Tick()'); // the same reply polled again must not queue twice
  v.run('STUB.FireEvent("PLAYER_REGEN_ENABLED")');
  assert.equal(shown(), '1', 'shown once after combat');
  assert.match(v.get('table.concat(STUB.prints, "\\n")'), /held answer/);
  assert.equal(v.get('WoWAIDB.chats[1].pendingId'), '');
});
