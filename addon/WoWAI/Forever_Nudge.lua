-- Level-up nudge: after the player levels up, one chat line offers the question
-- "what changes at this level?". Clicking it opens the window with the question
-- typed in the box; the player still presses Enter. It waits until the lockout
-- (combat, encounter, challenge run) is over, and says nothing while the AI is off.
local pending

local function Offer()
	if not pending then return end
	if WoWAIForever.Locked and WoWAIForever.Locked() then return end
	local level = pending
	pending = nil
	if WoWAIForeverDB and WoWAIForeverDB.off then return end
	local c = WoWAI and WoWAI.internal and WoWAI.internal.ActiveChat()
	if not c then return end
	WoWAI.askText = "I just reached level " .. level .. ". What changes at this level?"
	print("|cff7ec8ff[WoW AI]|r Level " .. level .. "! |Hwowai:ask:" .. c.id .. "|h|cff55ff55[what changes at this level?]|r|h")
end

WoWAIForever.On("LOCKOUT_CHANGED", function(locked) if not locked then Offer() end end)

WoWAIForever.Register({
	name = "nudge",
	events = { PLAYER_LEVEL_UP = true },
	onEvent = function(_, level)
		pending = tonumber(level) or (type(UnitLevel) == "function" and UnitLevel("player")) or nil
		Offer()
	end,
})
