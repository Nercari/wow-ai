BINDING_HEADER_WOWAI = "WoW AI"
local actions = {
	toggle = { "Open or close the AI window", "CTRL-SHIFT-A" },
	mentor = { "Talk to the mentor", "CTRL-SHIFT-M" }, focus = { "Type to the AI", nil },
	review = { "Review my last fight", "CTRL-SHIFT-R" }, death = { "Why did I die?", "CTRL-SHIFT-D" },
	look = { "Ask about my screen", "CTRL-SHIFT-L" }, switch = { "Turn the AI off / on", "CTRL-SHIFT-X" },
	send = { "Send / refresh a pending message", nil },
}
for name, spec in pairs(actions) do _G["BINDING_NAME_WOWAI_" .. name:upper()] = spec[1] end
WoWAIForeverKeys = {}
local function DB()
	WoWAIForeverDB = WoWAIForeverDB or {}
	WoWAIForeverDB.keys = WoWAIForeverDB.keys or {}
	return WoWAIForeverDB.keys
end
local function Chat()
	return WoWAI and WoWAI.internal and WoWAI.internal.ActiveChat()
end
local function Focus()
	WoWAI.Toggle(true)
	if type(WoWAIInput) == "table" then WoWAIInput:SetFocus() end
end
local function RunCommand(command, rest)
	for _, mod in ipairs(WoWAIForever.modules or {}) do
		local fn = mod.commands and mod.commands[command]
		if type(fn) == "function" then fn(rest or "", Chat()); return true end
	end
	return false
end
function WoWAIForeverKeys.Run(action)
	if action == "toggle" then WoWAI.Toggle()
	elseif action == "mentor" then
		for _, c in ipairs(WoWAI.internal.Chats()) do
			if c.name:lower() == "mentor" then
				WoWAI.internal.SwitchChat(c.id)
				break
			end
		end
		Focus()
	elseif action == "focus" then Focus()
	elseif action == "send" then if WoWAI.refreshAction then WoWAI.refreshAction() end
	elseif action == "review" or action == "death" then RunCommand(action, "")
	elseif action == "look" then
		Focus(); WoWAIForeverKeys.lookInput = true
		WoWAIInput:SetText("/ai look "); WoWAIInput:SetCursorPosition(9)
	elseif action == "switch" then
		local command = WoWAIForeverDB and WoWAIForeverDB.off and "on" or "off"
		RunCommand(command, "")
	end
end

-- The addon never binds keys itself (safety CI forbids SetBinding outside upstream code):
-- Bindings.xml lists the actions under Key Bindings > AddOns > WoW AI, and this suggests free keys.
local order = { "toggle", "mentor", "review", "death", "look", "switch", "focus", "send" }
local function Hint()
	local free, taken = {}, {}
	for _, action in ipairs(order) do
		local key = actions[action][2]
		local current = key and type(GetBindingAction) == "function" and GetBindingAction(key) or ""
		if key and current ~= "WOWAI_" .. action:upper() then
			local label = key:gsub("CTRL%-", "Ctrl+"):gsub("SHIFT%-", "Shift+") .. " " .. actions[action][1]
			table.insert((current == "" or current == nil) and free or taken, label)
		end
	end
	if #free + #taken == 0 then return end
	local message = "WoW AI hotkeys: bind them in Options > Keybindings > AddOns > WoW AI."
	if #free > 0 then message = message .. " Suggested (free): " .. table.concat(free, ", ") .. "." end
	if #taken > 0 then message = message .. " Already in use: " .. table.concat(taken, ", ") .. "." end
	print(message)
end

local function HistoryInput(parts)
	local input = parts.input
	if not input then return end
	if input.SetAltArrowKeyMode then input:SetAltArrowKeyMode(false) end
	local oldUp = input:GetScript("OnArrowPressed")
	local oldEnter = input:GetScript("OnEnterPressed")
	local oldTab = input:GetScript("OnTabPressed")
	local cursor = 0
	input:SetScript("OnArrowPressed", function(self, key)
		local c = Chat()
		local text = self:GetText() or ""
		local pos = self.GetCursorPosition and self:GetCursorPosition() or 0
		if (text == "" or pos == 0) and (key == "UP" or key == "DOWN") and c then
			local list = c.keyHistory or {}; c.keyHistory = list
			if key == "UP" then cursor = math.min(#list, cursor + 1)
			else cursor = math.max(0, cursor - 1) end
			self:SetText(cursor > 0 and (list[#list - cursor + 1] or "") or "")
			self:SetCursorPosition(0)
		elseif oldUp then oldUp(self, key) end
	end)
	input:SetScript("OnEnterPressed", function(self, ...)
		local c = Chat(); local text = self:GetText() or ""
		if text ~= "" and c then
			c.keyHistory = c.keyHistory or {}
			table.insert(c.keyHistory, text)
			while #c.keyHistory > 20 do table.remove(c.keyHistory, 1) end
		end
		cursor = 0
		if WoWAIForeverKeys.lookInput then
			WoWAIForeverKeys.lookInput = nil
			RunCommand("look", text:gsub("^/ai%s+look%s*", ""))
			self:SetText(""); self:ClearFocus()
			return
		end
		if oldEnter then oldEnter(self, ...) end
	end)
	input:SetScript("OnTabPressed", function(self)
		local list = WoWAI.internal.Chats()
		if #list == 0 then return end
		local current = WoWAI.internal.ActiveChat()
		local index = 1
		for i, c in ipairs(list) do if current and c.id == current.id then index = i end end
		local reverse = type(IsShiftKeyDown) == "function" and IsShiftKeyDown()
		index = ((index - 1 + (reverse and -1 or 1)) % #list) + 1
		WoWAI.internal.SwitchChat(list[index].id)
		if oldTab then oldTab(self) end
	end)
end

WoWAIForever.On("UI_BUILT", HistoryInput)
WoWAIForever.Register({ name = "keys", events = { PLAYER_LOGIN = true },
	init = function()
		if DB().hinted then return end
		DB().hinted = 1
		Hint()
	end,
	commands = { keys = function()
		for _, action in ipairs(order) do
			local keys = {}
			if type(GetBindingKey) == "function" then keys = { GetBindingKey("WOWAI_" .. action:upper()) } end
			print(actions[action][1] .. ": " .. (#keys > 0 and table.concat(keys, ", ") or "unbound"))
		end
		Hint()
	end } })
