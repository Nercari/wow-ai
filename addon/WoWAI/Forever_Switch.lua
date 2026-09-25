local off = false
local function SetOff(value)
	off = value
	WoWAIForeverDB = WoWAIForeverDB or {}
	WoWAIForeverDB.off = off
	WoWAIForever.Fire("SWITCH", off)
end

WoWAIForever.Register({
	name = "switch",
	blocked = function() return off and "AI is off (/wowai on)" or nil end,
	events = { PLAYER_LOGIN = true },
	init = function()
		WoWAIForever.On("SWITCH", function(value)
			if WoWAI and type(WoWAI.Toggle) == "function" then WoWAI.Toggle(not value) end
		end)
		if WoWAIForeverDB and WoWAIForeverDB.off then
			off = true
			print("AI is off (/wowai on)")
			WoWAIForever.Fire("SWITCH", true)
		end
	end,
	commands = {
		off = function()
			WoWAI.Send("off", nil, { cmd = "off", force = true })
			SetOff(true)
		end,
		on = function()
			SetOff(false)
			WoWAI.Send("on", nil, { cmd = "on", force = true })
		end,
	},
})
