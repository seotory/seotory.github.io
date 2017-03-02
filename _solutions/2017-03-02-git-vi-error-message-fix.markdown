---
layout: post
title: git에서 vi 에러 메세지 해결하기
date: 2017-03-02 13:39:26 +0900
description: 
image: 
categories: 
published: true
comments: true
tags:
---

git 사용중에 아래와 같은 vi 관련 에러 메시지가 발생했다.

```
error: There was a problem with the editor 'vi'.
Please supply the message using either -m or -F option.
```

다음과 같이 글로벌 옵션을 주어서 에러 메세지를 해결했다.

```
git config --global core.editor $(which vim)
```

참고로 관련 내용을 찾아보니 vim의 버그라는 이야기가 있었고, 또다른 해결책으로 vim을 재설치하는 방법이 있었다..