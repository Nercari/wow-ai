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

local function Apply(reset)
	if InCombatLockdown() then return false end
	if type(GetBindingAction) ~= "function" or type(SetBinding) ~= "function"
		or type(SaveBindings) ~= "function" or type(GetCurrentBindingSet) ~= "function" then
		return false
	end
	local skipped, bound = {}, {}
	local labels = {
		toggle = "window", mentor = "mentor", review = "review", death = "death",
		look = "screen question", switch = "AI switch",
	}
	for action, spec in pairs(actions) do
		local key = spec[2]
		if key then
			local current = GetBindingAction(key)
			if reset then
				if current == "" or current == nil or (type(current) == "string" and current:match("^WOWAI_")) then
					SetBinding(key, "WOWAI_" .. action:upper())
					table.insert(bound, key .. " " .. labels[action])
				else
					table.insert(skipped, key)
				end
			elseif current == "" or current == nil then
				SetBinding(key, "WOWAI_" .. action:upper())
				table.insert(bound, key .. " " .. labels[action])
			else
				table.insert(skipped, key)
			end
		end
	end
	SaveBindings(GetCurrentBindingSet()); DB().applied = 1
	local names = { A = "a", D = "d", L = "l", M = "m", R = "r", X = "x" }
	for i, item in ipairs(bound) do
		local key, label = item:match("^(.-) (.+)$")
		local letter = key and key:match("%-([A-Z])$")
		if letter then bound[i] = "Ctrl+Shift+" .. (names[letter] or letter:lower()):upper() .. " " .. label end
	end
	local message = "WoW AI hotkeys: " .. table.concat(bound, ", ")
	if #skipped > 0 then message = message .. "; skipped (in use): " .. table.concat(skipped, ", ") end
	print(message)
	return true
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
WoWAIForever.Register({ name = "keys", events = { PLAYER_LOGIN = true, PLAYER_REGEN_ENABLED = true },
	init = function()
		if DB().applied then return end
		if InCombatLockdown() then DB().waiting = true else Apply(false) end
	end,
	onEvent = function(event)
		if event == "PLAYER_REGEN_ENABLED" and DB().waiting then DB().waiting = nil; Apply(false) end
	end,
	commands = { keys = function(rest)
		local keydb = DB()
		if InCombatLockdown() then print("Can't change key bindings in combat"); return end
		if rest == "clear" then
			if type(GetBindingKey) ~= "function" or type(SetBinding) ~= "function"
				or type(SaveBindings) ~= "function" or type(GetCurrentBindingSet) ~= "function" then
				return
			end
			for action in pairs(actions) do
				local keys = { GetBindingKey("WOWAI_" .. action:upper()) }
				for _, key in ipairs(keys) do SetBinding(key) end
			end
			SaveBindings(GetCurrentBindingSet())
			keydb.applied = nil
			print("WoW AI hotkeys cleared")
		elseif rest == "reset" then Apply(true)
		else
			for action in pairs(actions) do
				local keys = {}
				if type(GetBindingKey) == "function" then keys = { GetBindingKey("WOWAI_" .. action:upper()) } end
				print(action .. ": " .. (#keys > 0 and table.concat(keys, ", ") or "unbound"))
			end
		end
	end } })
