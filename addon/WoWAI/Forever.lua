-- Extension registry. Modules are deliberately featureless in this package.
WoWAIForever = WoWAIForever or { modules = {} }
WoWAIForever.modules = WoWAIForever.modules or {}
local frame = CreateFrame("Frame")
local function WantsEvent(events, event)
	if type(events) ~= "table" then return false end
	if events[event] then return true end
	for _, name in ipairs(events) do if name == event then return true end end
	return false
end
function WoWAIForever.Register(mod)
	if type(mod) ~= "table" then return end
	table.insert(WoWAIForever.modules, mod)
	for key, value in pairs(mod.events or {}) do frame:RegisterEvent(type(key) == "number" and value or key) end
end
frame:RegisterEvent("PLAYER_LOGIN")
frame:SetScript("OnEvent", function(_, event, ...)
	local args = { ... }
	local function dispatch()
		for _, mod in ipairs(WoWAIForever.modules) do
			if event == "PLAYER_LOGIN" and type(mod.init) == "function" then pcall(mod.init) end
			if WantsEvent(mod.events, event) and type(mod.onEvent) == "function" then pcall(mod.onEvent, event, unpack(args)) end
		end
	end
	if event == "PLAYER_LOGIN" and C_Timer and C_Timer.After then C_Timer.After(0, dispatch) else dispatch() end
end)
