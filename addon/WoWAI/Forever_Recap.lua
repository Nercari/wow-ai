-- Session recap offer: once a fight has ended and the player has stayed out of
-- combat for a while, one chat line offers "recap this session". Clicking it puts
-- the question in the box; the player still presses Enter. At most one offer per
-- hour, only after a fight, never in combat, and not while the AI is off.
local WAIT, GAP = 300, 3600
local fights, offeredFights, lastOffer, token = 0, 0, nil, 0

local function Offer(mine)
	if mine ~= token then return end
	if fights == offeredFights then return end
	if WoWAIForever.Locked and WoWAIForever.Locked() then return end
	if WoWAIForeverDB and WoWAIForeverDB.off then return end
	local now = type(GetTime) == "function" and GetTime() or 0
	if lastOffer and now - lastOffer < GAP then return end
	local c = WoWAI and WoWAI.internal and WoWAI.internal.ActiveChat()
	if not c then return end
	offeredFights, lastOffer = fights, now
	WoWAI.askText = "Give me a short recap of this session."
	print("|cff7ec8ff[WoW AI]|r Done for now? |Hwowai:ask:" .. c.id .. "|h|cff55ff55[recap this session]|r|h")
end

WoWAIForever.On("LOCKOUT_CHANGED", function(locked)
	token = token + 1
	if locked then fights = fights + 1; return end
	local mine = token
	if C_Timer and C_Timer.After then C_Timer.After(WAIT, function() Offer(mine) end) end
end)
