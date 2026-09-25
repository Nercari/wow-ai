Option Explicit
Dim shell, fso, repo, script, command
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
repo = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName))
script = repo & "\tools\ptt\ptt.ps1"
command = "powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & script & """"
shell.Run command, 0, False
