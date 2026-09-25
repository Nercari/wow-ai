Option Explicit

Dim fso, shell, repo, command, i
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")
repo = fso.GetParentFolderName(WScript.ScriptFullName)
command = QuoteArgument("node") & " " & QuoteArgument(repo & "\supervisor.js")

For i = 0 To WScript.Arguments.Count - 1
  command = command & " " & QuoteArgument(WScript.Arguments(i))
Next

shell.CurrentDirectory = repo
shell.Run command, 0, False

Function QuoteArgument(value)
  Dim result, slashes, i, character
  result = """"
  slashes = 0
  For i = 1 To Len(value)
    character = Mid(value, i, 1)
    If character = Chr(92) Then
      slashes = slashes + 1
    ElseIf character = Chr(34) Then
      result = result & String(slashes * 2 + 1, Chr(92)) & Chr(34)
      slashes = 0
    Else
      result = result & String(slashes, Chr(92)) & character
      slashes = 0
    End If
  Next
  result = result & String(slashes * 2, Chr(92)) & Chr(34)
  QuoteArgument = result
End Function
