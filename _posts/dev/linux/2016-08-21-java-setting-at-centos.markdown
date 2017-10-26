---
layout: post
title: centos에서 java version관리 (alternatives 사용)
date: 2016-08-21 11:09:55 +0900
description: 
image: 
categories: dev/linux
published: true
comments: true
tags: linux
---

# 개요

일반적으로 리눅스에서 자바를 셋팅하고 사용하다보면 버젼관리를 해야하는 경우가 반드시 생긴다. path 경로는 일반적으로 os가 부팅될때에 실행되는 파일들을 가지고 있다. 일반적으로 java를 설치했다면 `/usr/bin/`의 경로에 java가 실행파일로 운영이되고 있을 것이다. 이런경우 버젼을 올리거나 내리는 것이 매우 힘드므로 심볼릭 형태로 운영하도록 하자.

# 설치

## java 7 & 8

모든 사용자를 위한 java를 설치할 예정이니, root 계정으로 로그인한다.

```
$ su -
```

### java 8 다운로드 및 설치

```
# wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-linux-x64.rpm"
# yum localinstall jdk-8u60-linux-x64.rpm
```

다운로드 및 설치가 끝났으니 설치 내용을 확인해보도록 하자.

```
# which java
/usr/bin/java
# cd /usr/bin/
# ls -al | grep java
lrwxrwxrwx    1 root root        22  8월 21 11:30 java -> /etc/alternatives/java
lrwxrwxrwx    1 root root        30  8월 21 11:30 java-rmi.cgi -> /etc/alternatives/java-rmi.cgi
lrwxrwxrwx    1 root root        23  8월 21 11:30 javac -> /etc/alternatives/javac
lrwxrwxrwx    1 root root        25  8월 21 11:30 javadoc -> /etc/alternatives/javadoc
lrwxrwxrwx    1 root root        32  8월 21 11:30 javafxpackager -> /etc/alternatives/javafxpackager
lrwxrwxrwx    1 root root        23  8월 21 11:30 javah -> /etc/alternatives/javah
lrwxrwxrwx    1 root root        23  8월 21 11:30 javap -> /etc/alternatives/javap
lrwxrwxrwx    1 root root        30  8월 21 11:30 javapackager -> /etc/alternatives/javapackager
lrwxrwxrwx    1 root root        24  8월 21 11:30 javaws -> /etc/alternatives/javaws
```

위에서 보다시피 `yum localinstall`을 이용하게 되면 `/etc/alternatives/` 폴더 안에 실행파일이 들어가게 된다. 왜 `alternatives` 이 폴더에 들어가는지는 조금 있다가 설명하도록 한다.

### java 7 다운로드 및 설치

```
# wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jre-7u79-linux-x64.rpm"
# yum localinstall jdk-7u79-linux-x64.rpm
```

java 7을 설치했으니 역시 확인해보도록 하자.

```
# which java
/usr/bin/java
# cd /usr/bin/
# ls -al | grep java
lrwxrwxrwx    1 root root        22  8월 21 11:30 java -> /etc/alternatives/java
lrwxrwxrwx    1 root root        30  8월 21 11:30 java-rmi.cgi -> /etc/alternatives/java-rmi.cgi
lrwxrwxrwx    1 root root        23  8월 21 11:30 javac -> /etc/alternatives/javac
lrwxrwxrwx    1 root root        25  8월 21 11:30 javadoc -> /etc/alternatives/javadoc
lrwxrwxrwx    1 root root        32  8월 21 11:30 javafxpackager -> /etc/alternatives/javafxpackager
lrwxrwxrwx    1 root root        23  8월 21 11:30 javah -> /etc/alternatives/javah
lrwxrwxrwx    1 root root        23  8월 21 11:30 javap -> /etc/alternatives/javap
lrwxrwxrwx    1 root root        30  8월 21 11:30 javapackager -> /etc/alternatives/javapackager
lrwxrwxrwx    1 root root        24  8월 21 11:30 javaws -> /etc/alternatives/javaws
```

역시나 `alternatives` 폴더에 실행파일들이 있다. 후에 `java -version`을 한번 입력해보자.

```
# java -version
java version "1.8.0_60"
Java(TM) SE Runtime Environment (build 1.8.0_60-b27)
Java HotSpot(TM) 64-Bit Server VM (build 25.60-b23, mixed mode)
```

명령어를 입력해보면 java는 아직 이전에 설치했던 8 버젼을 가르키고 있다.

# alternatives 명령어

위에서 이야기했던 `/usr/bin/java`가 `/etc/alternatives/....`를 가르키던 이유는, centos의 yum을 통해 java를 install하게 되면 버젼관리 대상으로 들어가기 때문이다. 그리고 centos는 버젼관리를 위한 명령어를 제공하는데 그것이 바로 `alternatives`라는 명령어이다. 

명령어를 살펴보기 전에 `/usr/bin/java`의 심볼릭링크를 추적해보자.

```
# cd /usr/bin/
# ls -al | grep java
lrwxrwxrwx    1 root root        22  8월 21 11:30 java -> /etc/alternatives/java

# cd /etc/alternatives/
$ ls -al | grep java
lrwxrwxrwx   1 root root   34  8월 21 11:45 java -> /usr/java/jdk1.8.0_60/jre/bin/java

# cd /usr/java/
# ls -al
합계 12
drwxr-xr-x   4 root root   69  8월 21 11:39 .
drwxr-xr-x. 14 root root 4096  4월 11  2015 ..
lrwxrwxrwx   1 root root   16  8월 21 11:30 default -> /usr/java/latest
drwxr-xr-x   8 root root 4096  8월 21 11:39 jdk1.7.0_79
drwxr-xr-x   9 root root 4096  8월 21 11:29 jdk1.8.0_60
lrwxrwxrwx   1 root root   21  8월 21 11:30 latest -> /usr/java/jdk1.8.0_60
```

마지막까지 추적해서 들어가보면 `/usr/java/` 폴더에 우리가 설치했던 java 7, 8 버젼이 설치되어 있음을 확인할 수 있다. 그렇다면 `alternatives` 명령어를 입력해서 뭔가 java 버젼을 바꿀 수 있을것 같다. 일단은 `--help`옵션을 줘서 내용을 살펴본다.

```
# alternatives --help
대체 버전 1.3.61 - Copyright (C) 2001 Red Hat, Inc.
GNU Public License하에서 이 프로그램을
자유롭게 재배포 할 수 있습니다.
사용법: alternatives --install <링크> <이름> <경로> <우선순위>
                    [--initscript <서비스>]
                    [--slave <링크> <이름> <경로>]*
       alternatives --remove <이름> <경로>
       alternatives --auto <이름>
       alternatives --config <이름>
       alternatives --display <이름>
       alternatives --set <이름> <경로>
       alternatives --list
```

`--config` 옵션을 활용해보도록 하자.

```
# alternatives --config java

2 개의 프로그램이 'java'를 제공합니다.

  선택    명령
-----------------------------------------------
*+ 1           /usr/java/jdk1.8.0_60/jre/bin/java

현재 선택[+]을 유지하려면 엔터키를 누르고, 아니면 선택 번호를 입력하십시오:
```

이상하게 jdk1.8 버젼만 나오고, jdk1.7버젼이 나오지 않는다. 이유는 `alternatives`에 java란 이름에 7버젼이 추가되어 있지 않기 때문이다. (`yum localinstall`을 이용하면 자동으로 추가가 될거라 생각했는데 되지 않았다.) 아래와 같이 `--install` 옵션을 이용해서 java의 이름으로 1.7버젼을 추가하도록 한다.

```
# alternatives --install /usr/bin/java java /usr/java/jdk1.7.0_79/jre/bin/java 100
```

다시 `--config` 옵션을 이용해서 확인해보자.

```
# alternatives --config java

2 개의 프로그램이 'java'를 제공합니다.

  선택    명령
-----------------------------------------------
*+ 1           /usr/java/jdk1.8.0_60/jre/bin/java
   2           /usr/java/jdk1.7.0_79/jre/bin/java

현재 선택[+]을 유지하려면 엔터키를 누르고, 아니면 선택 번호를 입력하십시오:
```

이제야 제대로 7, 8 두 버젼이 모두 보인다. 숫자키 2를 누르고 엔터를 친다음 `java -version`을 확인하면 정상적으로 java의 버젼이 바뀐 것을 확인 할 수있다.

```
# java -version
java version "1.7.0_79"
Java(TM) SE Runtime Environment (build 1.7.0_79-b15)
Java HotSpot(TM) 64-Bit Server VM (build 24.79-b02, mixed mode)
```



