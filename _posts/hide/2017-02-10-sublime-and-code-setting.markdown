---
layout: post
title: subllime and code setting
date: 2017-02-10 13:09:06 +0900
description: 
image: 
categories: hide
published: false
comments: false
tags:
---

# sublime

```
{
	"color_scheme": "Packages/ayu/ayu-mirage.tmTheme",
	"font_size": 14,
	"ignored_packages":
	[
		"Vintage"
	],
	"save_on_focus_lost": true,
	"show_full_path": true,
	"theme": "ayu-mirage.sublime-theme"
}

```

# code

settings.json

```
// 설정을 이 파일에 넣어서 기본 설정을 덮어씁니다.
{
    "window.zoomLevel": 0,
    "editor.fontSize": 13,
    "editor.fontFamily": "Monaco, 'Courier New', monospace",
    "editor.renderIndentGuides": true,
    "code-runner.executorMap": {
        "javascript": "node",
        "python": "python",
        "ruby": "ruby",
        "go": "go run"
    },
    "terminal.external.osxExec": "iTerm.app"
}
}
```

setup plugin

- Go
- Preview
- Ayu
- HTML Class Suggestions
- HTML Snippets
- Material Icon Theme
- Sass
- Code Runner
  사용 가능언어 C, C++, Java, JavaScript, PHP, Python, Perl, Ruby, Go, Lua, Groovy, PowerShell, BAT/CMD, BASH/SH, F# Script, C# Script, VBScript, TypeScript, CoffeeScript, Scala, Swift, Julia, Crystal, OCaml Script, R, AppleScript, Elixir, Visual Basic .NET, Clojure, Haxe 등
- vscode-pandoc