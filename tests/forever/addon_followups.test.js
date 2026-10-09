'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { lua, lauxlib, lualib, to_luastring, to_jsstring } = require('fengari');

const addon = path.join(__dirname, '..', '..', 'addon', 'WoWAI');
const read = file => fs.readFileSync(path.join(addon, file), 'utf8');
function vm() {
  const L = lauxlib.luaL_newstate(); lualib.luaL_openlibs(L);
  const run = code => {
    const loaded = lauxlib.luaL_loadstring(L, to_luastring(code));
    assert.equal(loaded, lua.LUA_OK, loaded === lua.LUA_OK ? '' : to_jsstring(lua.lua_tostring(L, -1)));
    if (lua.lua_pcall(L, 0, 0, 0) !== lua.LUA_OK) throw new Error(to_jsstring(lua.lua_tostring(L, -1)));
  };
  const get = expr => {
    run(`RESULT = tostring(${expr})`); lua.lua_getglobal(L, to_luastring('RESULT'));
    const value = to_jsstring(lua.lua_tolstring(L, -1)); lua.lua_pop(L, 1); return value;
  };
  run(fs.readFileSync(path.join(__dirname, '..', 'wow_stub.lua'), 'utf8'));
  run('unpack = table.unpack');
  for (const file of ['Codec.lua', 'Inbox.lua', 'WoWAI.lua', 'Forever.lua', 'Forever_Lockout.lua', 'Forever_Context.lua', 'Forever_Commands.lua']) run(read(file));
  run('STUB.FireEvent("ADDON_LOADED", "WoWAI"); STUB.FireEvent("PLAYER_LOGIN"); STUB.RunTimers()');
  run('WoWAI.IsConnected = function() return true end');
  run(`function CLICK(label)
    for _, f in ipairs(STUB.frames) do
      if f.kind == "Button" and f.text == label then f.scripts.OnClick(f); return true end
    end
    error("no button labelled " .. label)
  end`);
  return { run, get };
}
const outbox = v => v.get('WoWAIDB.outbox and WoWAIDB.outbox.cmd');
const reply = v => v.run(`local c = WoWAIDB.chats[1]
  table.insert(c.history, { role = "assistant", text = "Use Shadow Bolt.", t = time() })
  WoWAI.Toggle(true); WoWAI.Render()`);
const shown = v => v.get('table.concat(STUB.texts, "|")');

test('follow-up buttons sit under the newest finished reply; a question click fills the box and sends nothing', () => {
  const v = vm();
  reply(v);
  assert.ok(shown(v).includes('What should I buy first?'));
  v.run('CLICK("What should I buy first?")');
  assert.ok(shown(v).includes('What should I buy first, and where do I get it?'), 'typed into the box');
  assert.equal(v.get('WoWAIDB.chats[1].pendingId'), 'nil', 'nothing sent by itself');
  assert.equal(outbox(v), 'nil');
});

test('the Review follow-up is the same review command as the Review button', () => {
  const v = vm();
  reply(v);
  v.run('STUB.FireEvent("PLAYER_REGEN_DISABLED"); STUB.now = STUB.now + 30; STUB.FireEvent("PLAYER_REGEN_ENABLED")');
  v.run('CLICK("Review my last fight")');
  assert.equal(outbox(v), 'review');
});

test('no follow-ups in combat or while a reply is pending', () => {
  let v = vm();
  v.run('STUB.combat = true; STUB.FireEvent("PLAYER_REGEN_DISABLED")');
  reply(v);
  const fb = () => v.get('(function() for _, f in ipairs(STUB.frames) do if f.kind == "Button" and f.text == "What should I buy first?" and f.shown then return true end end return false end)()');
  assert.equal(fb(), 'false');
  v.run('STUB.combat = false; STUB.FireEvent("PLAYER_REGEN_ENABLED"); WoWAI.Render()');
  assert.equal(fb(), 'true', 'back after the fight');
});
