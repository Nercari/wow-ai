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
    const status = lua.lua_pcall(L, 0, 0, 0);
    if (status !== lua.LUA_OK) throw new Error(to_jsstring(lua.lua_tostring(L, -1)));
  };
  const get = expr => {
    run(`RESULT = tostring(${expr})`); lua.lua_getglobal(L, to_luastring('RESULT'));
    const value = to_jsstring(lua.lua_tolstring(L, -1)); lua.lua_pop(L, 1); return value;
  };
  run(fs.readFileSync(path.join(__dirname, '..', 'wow_stub.lua'), 'utf8'));
  run('unpack = table.unpack');
  for (const file of ['Codec.lua', 'Inbox.lua', 'WoWAI.lua', 'Forever.lua', 'Forever_Lockout.lua', 'Forever_Calm.lua']) run(read(file));
  run('STUB.FireEvent("ADDON_LOADED", "WoWAI"); STUB.FireEvent("PLAYER_LOGIN"); STUB.RunTimers()');
  return { run, get };
}

test('the window folds when a fight starts and opens again when it ends', () => {
  const v = vm();
  v.run('WoWAI.Toggle(true)');
  assert.equal(v.get('WoWAIFrame.shown'), 'true');
  v.run('STUB.combat = true; STUB.FireEvent("PLAYER_REGEN_DISABLED")');
  assert.equal(v.get('WoWAIFrame.shown'), 'false', 'no advice on screen in combat');
  assert.equal(v.get('WoWAIDB.settings.minimized'), 'true');
  v.run('STUB.combat = false; STUB.FireEvent("PLAYER_REGEN_ENABLED")');
  assert.equal(v.get('WoWAIFrame.shown'), 'true', 'back after the fight');
});

test('a window the player had closed stays closed, and a manual choice in a fight wins', () => {
  let v = vm();
  v.run('WoWAI.Toggle(false)');
  v.run('STUB.combat = true; STUB.FireEvent("PLAYER_REGEN_DISABLED"); STUB.combat = false; STUB.FireEvent("PLAYER_REGEN_ENABLED")');
  assert.equal(v.get('WoWAIFrame.shown'), 'false');

  v = vm();
  v.run('WoWAI.Toggle(true); STUB.combat = true; STUB.FireEvent("PLAYER_REGEN_DISABLED"); WoWAI.Toggle(false)');
  v.run('STUB.combat = false; STUB.FireEvent("PLAYER_REGEN_ENABLED")');
  assert.equal(v.get('WoWAIFrame.shown'), 'false', 'player closed it mid-fight, it stays closed');
});
