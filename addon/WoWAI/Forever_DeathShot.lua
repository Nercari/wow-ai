local button = nil
local pendingDeath = false

local function EnsureButton()
	if button then return button end
	button = CreateFrame("Button", "WoWAIDeathShotButton", UIParent, "UIPanelButtonTemplate")
	button:SetSize(130, 26)
	button:SetPoint("CENTER", UIParent, "CENTER", 0, -120)
	button:SetText("Save death shot")
	button:SetScript("OnClick", function(self)
		if type(Screenshot) == "function" then
			Screenshot()
		end
		self:Hide()
	end)
	button:Hide()
	return button
end

local function HideButton()
	if button then
		button:Hide()
	end
end

local function IsBlocked()
	if InCombatLockdown and InCombatLockdown() then
		return true
	end
	if WoWAIForever and type(WoWAIForever.Locked) == "function" and WoWAIForever.Locked() then
		return true
	end
	if WoWAIForeverDB and WoWAIForeverDB.off then
		return true
	end
	return false
end

local function ShowDeathButton()
	pendingDeath = false
	local btn = EnsureButton()
	btn:Show()
	if C_Timer and type(C_Timer.After) == "function" then
		C_Timer.After(60, HideButton)
	end
end

local function CheckPending()
	if pendingDeath and not IsBlocked() then
		ShowDeathButton()
	end
end

local function OnEvent(event)
	if event == "PLAYER_DEAD" then
		pendingDeath = true
		CheckPending()
	elseif event == "PLAYER_REGEN_ENABLED" then
		CheckPending()
	end
end

local function Init()
	WoWAIForever.On("LOCKOUT_CHANGED", function(locked)
		if not locked then
			CheckPending()
		end
	end)
end

WoWAIForever.Register({
	name = "deathshot",
	init = Init,
	events = {
		PLAYER_DEAD = true,
		PLAYER_REGEN_ENABLED = true,
	},
	onEvent = OnEvent,
})
