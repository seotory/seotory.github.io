---
layout: post
title: docker 컨테이너 내의 locale(로케일) 에러 해결
date: 2017-02-28 10:37:02 +0900
description: 
image: 
categories: 
published: true
comments: true
tags:
---

특정 docker image를 컨테이너로 만들고 접속해보니 아래와 같은 `locale` 에러 메세지가 발생했다. 무시하고 작업을 해도 되지만 매우 거슬려서 아래와 같이 추가 설정을 하였다.

```
bash: warning: setlocale: LC_CTYPE: cannot change locale (en_US.UTF-8): No such file or directory
bash: warning: setlocale: LC_COLLATE: cannot change locale (en_US.UTF-8): No such file or directory
bash: warning: setlocale: LC_MESSAGES: cannot change locale (en_US.UTF-8): No such file or directory
bash: warning: setlocale: LC_NUMERIC: cannot change locale (en_US.UTF-8): No such file or directory
bash: warning: setlocale: LC_TIME: cannot change locale (en_US.UTF-8): No such file or directory
```

`locale` 커멘드를 이용해서 현재 시스템에서 사용중인 로케일을 확인해본다.

```
[root@7b3a3ede1d74 /]# locale
locale: Cannot set LC_CTYPE to default locale: No such file or directory
locale: Cannot set LC_MESSAGES to default locale: No such file or directory
locale: Cannot set LC_ALL to default locale: No such file or directory
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

`locale -a` 명령어를 사용해서 현재 시스템에서 사용가능한 로케일을 확인한다. 

```
[root@7b3a3ede1d74 /]# locale -a
locale: Cannot set LC_CTYPE to default locale: No such file or directory
locale: Cannot set LC_MESSAGES to default locale: No such file or directory
locale: Cannot set LC_COLLATE to default locale: No such file or directory
C
POSIX
```

이 정보는 `/usr/lib/locale/locale-archive`에 있는 정보이다. 위와 비교해보니 `en_US.UTF-8` 로케일이 없는 것이 문제 상황으로 파악됬다.

로케일을 정의한 파일들은 `/usr/share/i18n/locales` 폴더 아래에 있고, charmap(캐릭터맵)에 대한 정보는 `/usr/share/i18n/charmaps` 폴더 아래에 있다. 이 두가지 정보가 `localedef`의 명령어로 컴파일 되며 컴파일 된 내용은 위에서 보았던 `/usr/lib/locale/locale-archive` 파일안으로 들어가게 된다. 

> Centos/Fedora에는 **locale-gen**가 없다. 대신에 **localedef**를 사용하면 된다.

아래와 같이 입력해서 필요한 로케일을 컴파일 시킨다.

```
localedef -v -c -i en_US -f UTF-8 en_US.UTF-8
```

**option 설명**
- v: 일반적으로 무시되는 오류에 대한 추가 경고를 생성
- c: 경고가 발생하더라도 출력 파일을 작성
- i: 로케일의 정의 파일
- f: charmap(캐릭터맵) 정의

중요한 옵션은 `i`, `f` 두 가지이다. 이 두개의 옵션으로 로케일 및 캐릭터 맵을 지정한다. 즉 이 두개가 합쳐져서 `en_US.UTF-8`이 되는 것이다. 다시 아래와 같이 `locale -a`를 입력한다.

```
[root@7b3a3ede1d74 /]# locale -a
C
en_US.utf8
POSIX
```

`en_US.utf8`이 추가되었고 에러도 사라졌다.

만약 `localedef` 명령어가 없다면 아래와 같이 설치한다.

```
yum reinstall glibc-common
```