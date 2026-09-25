# Forever extension hooks

Bridge modules live in `bridge/forever/modules/*.js`, load by filename, and can be disabled by basename in `forever.disabled`. Throwing hooks are logged and skipped. `intercept(job, ctx)` runs after dedup for ordinary jobs; a truthy result owns the job and must eventually call `ctx.finish`. `augment(job, runInfo, ctx)` is synchronous and may edit `args`, `input.stdin`, or `env`. `onRun` runs after spawn; `onFinish` runs from finish; `stop` runs on process exit.

Bridge `ctx` exposes `cfg`, `log`, `HERE`, `REPO`, `state`, `saveState`, `atomicWrite`, `submit(job)`, `finish(job,status,text)`, `publish(key,record,urgent)`, `chatKey(job)`, and `runAgentOnce({agentId,cwd,prompt,timeoutMs})`, which resolves to `{status,text}` without changing a chat transcript or session.

```js
module.exports = {
  init(ctx) { ctx.log('sample ready'); },
  intercept(job, ctx) { if (job.cmd !== 'sample') return false; ctx.finish(job, 'done', 'handled'); return true; },
  augment(job, runInfo) { if (job.cmd === 'sample') runInfo.args.push('--sample'); },
  onRun(info) { /* observe spawn */ },
  onFinish(job, status, text) { /* observe result */ },
  stop() { /* release resources */ },
};
```

Addon modules call `WoWAIForever.Register(mod)` from a file loaded after `Forever.lua`. Every field is optional: `name`, `commands[word](rest,chat)`, `blocked()` (reason to refuse sends), `context(kind)` (extra context), `onReply(chat,rec)`, `events` plus `onEvent(event,...)`, and `init()`. Errors are isolated with `pcall`. A blocked reason is also shown in chat history; the strip is hidden until unblocked.

Modules can exchange small internal notifications with `WoWAIForever.On(name, fn)` and `WoWAIForever.Fire(name, ...)`. Listener failures are isolated with `pcall`. Chat records can be inspected via the read-only accessor `WoWAIForever.GetChats()`.

```lua
WoWAIForever.Register({
  name = "sample",
  commands = { sample = function(rest, chat) print(rest) end },
  blocked = function() return nil end,
  context = function() return "Sample context" end,
  onReply = function(chat, rec) end,
  events = { PLAYER_ENTERING_WORLD = true },
  onEvent = function(event) end,
  init = function() end,
})
```

## Look and hotkeys

The optional Forever skin uses WoW's classic dialog and tooltip art. The saved
`WoWAIForeverDB.skin.enabled`, `sounds`, and `minimap` settings default to true;
`minimapAngle` stores the button position. `/ai skin on|off` changes the skin
setting and asks for a reload to apply it. `/ai minimap on|off` controls the
minimap button.

Hotkeys live in the game's own menu: Options > Keybindings > AddOns > WoW AI
(from `Bindings.xml`). The addon never binds keys itself. On first login it
prints the suggested keys and says which are free: Ctrl+Shift+A (window),
Ctrl+Shift+M (mentor), Ctrl+Shift+R (review), Ctrl+Shift+D (death),
Ctrl+Shift+L (screen question), Ctrl+Shift+X (AI switch); focus and send have no
suggestion. `/ai keys` lists the current bindings and repeats the suggestion.
Up/Down recall recent messages in the input; Tab and
Shift+Tab switch chats.
