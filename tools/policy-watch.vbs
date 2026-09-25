Option Explicit

Dim fso, shell, repo, command
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")
repo = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName))
' Run from the repo root so policy/ALERT.json lands where the bridge reads it.
command = "node """ & repo & "\tools\policy-watch.js"""
shell.CurrentDirectory = repo
shell.Run command, 0, False
