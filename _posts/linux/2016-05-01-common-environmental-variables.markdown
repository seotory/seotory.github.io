---
layout: post
title: GNU/Linux의 일반적인 환경변수
date: 2016-05-01 12:01:18 +0900
description: 
image: 
categories: linux
published: true
comments: true
tags:
---

GNU/Linux의 일반적인 환경변수들을 한 번 알아보자.

# 환경변수 확인

환경변수 확인에는 `set`, `printenv`, `env`와 같은 3가지 정도의 명령어가 있다.  

1. set

       $ set

2. printenv

       $ printenv
    
    `printenv`는 뒤에 옵션을 줄 수 있으나, `env`는 옵션을 줄 수가 없다.

       printenv [OPTION]... [VARIABLE]...

3. env
       
       $ env

# 자주 사용되는 환경변수

- SHELL: 커맨드쉘 프로그램의 경로, 기본으로 bash shell을 이용한다 (/bin/bash)

- TERM: 현재 터미널 프로그램의 정보

- USER: 사용자의 이름

- UID: 현재 사용자의 UID

- LS_COLORS: 색 코드를 이용하여 커맨드 창에 색깔을 나타내는 환경변수이다.

- MAIL: 사용자의 메일이 저장되는 위치

- PATH: 프로그램을 실행시킬 때, 실질적으로 프로그램이 위치하고 있는 장소들을 모은 환경 변수

- PWD: 현재 작업 디렉토리

- LANG: 언어 설정을 위한 환경변수

- HOME: 현재 사용자의 홈 디렉토리

- OLDPWD: 이전 작업 디렉토리

- PS1: 쉘 세션의 모양을 정의한다.

- PS2: 명령어가 여러줄에 걸져 있을 경우 모양을 정의한다.

- \_: 가장 최근에 실행한 명령어

- OSTYPE: os의 타입 (centos는 linux-gnu)

- HISTFILESIZE: 히스토리 기록의 최대 라인 수

# 특정 프로세스의 환경 변수 확인법

특정 프로세스의 환경 번수를 확인하고 싶다면 다음과 같이 입력하면된다. `cat /proc/프로세스번호/environ` 여기서 특정 프로세스의 번호를 알고 싶다면 `ps`, `pstree`등의 명령을 사용하여 확인할 수 있고 `/proc/`폴더의 하위폴더 중 숫자번호로 이루어진 폴더 역시 프로세스의 번호이다.

```shell
$ pstree -pa 1472
bash,1472
  └─pstree,1782 -pa 1472

$ cat /proc/1472/environ
TERM=xterm-colorHOME=/rootSHELL=/bin/bashUSER=rootLOGNAME=rootPATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/binXDG_SESSION_ID=2n
```

