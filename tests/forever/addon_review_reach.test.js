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
const outbox = v => ({
  cmd: v.get('WoWAIDB.outbox and WoWAIDB.outbox.cmd'),
  text: Buffer.from(v.get('WoWAIDB.outbox and WoWAIDB.outbox.text or ""'), 'hex').toString(),
  ctx: Buffer.from(v.get('WoWAIDB.outbox and WoWAIDB.outbox.ctx or ""'), 'hex').toString(),
});
const fight = v => v.run('STUB.FireEvent("PLAYER_REGEN_DISABLED"); STUB.now = STUB.now + 30; STUB.FireEvent("PLAYER_REGEN_ENABLED")');

test('the Review last fight button sends the review command with the fight times', () => {
  const v = vm();
  fight(v);
  v.run('CLICK("Review last fight")');
  const sent = outbox(v);
  assert.equal(sent.cmd, 'review');
  assert.equal(sent.text, 'Review my last fight.');
  assert.match(sent.ctx, /lastFight=start=.*,end=/);
});

test('a lone "review" typed in the window is the review command; other text stays a plain message', () => {
  let v = vm();
  fight(v);
  v.run('WoWAIInput:SetText("Review."); WoWAI.SendFromInput()');
  assert.equal(outbox(v).cmd, 'review');
  assert.match(outbox(v).ctx, /lastFight=start=/);

  v = vm();
  fight(v);
  v.run('WoWAIInput:SetText("review my gear"); WoWAI.SendFromInput()');
  assert.equal(outbox(v).cmd, 'nil');
  assert.equal(outbox(v).text, 'review my gear');
});

test('in combat the Review button sends nothing', () => {
  const v = vm();
  v.run('STUB.combat = true; STUB.FireEvent("PLAYER_REGEN_DISABLED"); CLICK("Review last fight")');
  assert.equal(v.get('WoWAIDB.outbox'), 'nil');
  assert.match(v.get('WoWAIDB.chats[1].history[#WoWAIDB.chats[1].history].text'), /AI paused in combat/);
});
