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

얼마 전에 메인 에디터를 `visual studio code`로 갈아탔다. 알려지다시피 `code`는 `electron`을 이용해서 만들어진 에디터이다. 직접 사용해보니 생각보다 매우 편했다. 특히 프로젝트 도중에 `git`을 사용하여 work flow를 보거나 특정파일만 state에 반영할 때 UI를 이용해서 매우 편리하게 사용할수 있어서 좋았다. 또한 `nodejs`나 `javascript`같은 경우에는 자동완성 기능이 지원되고 이클립스만큼은 아니여도 어느정도 메소드 추적이 가능하다.

`code`로 갈아타면서 셋팅했던 부분들을 기록으로 남겨둔다.

# settings.json

`Code > 기본 설정 > 설정`을 클릭해서 `settings.json` 파일을 아래와 같이 수정했다.

```json
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
```

# setup plugin

`sublime`과 비슷하게 `code` 역시 플러그인을 지원하는데 에디터 내에서 관련 내용 및 별점을 확인해 볼 수있어서 `sublime`보다는 직관적이였다. 사용하기 편한건 덤이다.

아래는 `code`에 설치한 플러그인의 목록이다.

- Go
- Preview
- Ayu
- HTML Class Suggestions
- HTML Snippets
- Material Icon Theme
- Sass
- Code Runner
  C, C++, Java, JavaScript, PHP, Python, Perl, Ruby, Go, Lua, Groovy, PowerShell, BAT/CMD, BASH/SH, F# Script, C# Script, VBScript, TypeScript, CoffeeScript, Scala, Swift, Julia, Crystal, OCaml Script, R, AppleScript, Elixir, Visual Basic .NET, Clojure, Haxe 등
- vscode-pandoc
- Git History
- Docker Support

