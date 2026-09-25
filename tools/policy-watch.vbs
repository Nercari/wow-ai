Option Explicit

Dim fso, shell, repo, command
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")
repo = fso.GetParentFolderName(WScript.ScriptFullName)
command = "node """ & repo & "\policy-watch.js"""
shell.CurrentDirectory = repo
shell.Run command, 0, False
