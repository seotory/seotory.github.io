---
title: 유용한 git 명령어
date: 2017-10-27 10:13:49 +0900
description: 
image: 
categories: dev/git
history: false
published: false
comments: false
tags:
---

<!-- | header  |   |   |   |   |
|---|---|---|---|---|
|  1 |   |   |   |   |
| 2  |   |   |   |   |
| 3  |   |   |   |   | -->

cmd 환경의 git에 잘 적응하고, 유용하게 사용하기 위해 포스팅한다.

<!-- # 여긴 어디, 나는 누구? -->

**git branch**
```
$ git branch
  gh-pages
* master
  new
```

# stage 확인

git에서 add 명령어를 실행시키면 stage 공간으로 파일이 넘어가게 된다.

**git diff --cached**  
tets

**git diff --staged**  
test

**git diff --name-only --cached**  
test22

# 로깅

**git log -p --word-diff**  
줄단위 비교 대신에 워드 단위로 표현

**git log --stat**  
변경사항의 파일별 통계

**git log --oneline --graph**  
**git log --since="2017-10-10" --until="2017-10-20"**  
**git log --after="2017-10-10" --before="2017-10-20"**  

**git log --author="seotory"**  
원래 코드를 작성한 사람

**git log --committer="seotory"**  
커밋을 남긴 사람

두 가지를 사용해서 로깅해야 하는 경우는 git 프로젝트에 fetch 기능을 사용할때이다. 일반적인 상황에서는 사용할 필요가 없다.

git commit을 이용하면 author가 committer 이다.
git format-path 를 이용하면 패치 적용을 "요청"할 수 있고 이 패치를 받아들이면 요청을 한 사람은 author가 되고, 받아들인 사람은 committer가 된다. 보통 github에서 발생한다.
git commit --amend, git rebase, git filter-branch 이런 명령어들은 전형적인 git 히스토리 조작 명령어이며 원본 커밋의 커밋자는 author가 되고, 조작한 사람은 committer가 된다.

위와 같은 이유로 log 검색에 2가지 옵션이 있는것이다.

## 파일 단위 로깅

git log -- [filename]
git log --oneline -- [filename]
git log --follow --oneline -- [filename] 
git log -p -- [filename]
git log --follow -p -- file -> 이름이 변경되더라도 추적해서 log 확인 시켜줌