---
layout: post
title: mac에 pyenv를 이용해 python 설치하기
date: 2017-03-05 11:10:36 +0900
description: 
image: 
categories: dev
published: true
comments: true
tags: 
- python
---

mac에 `python`을 설치해본다. `python`의 공식 홈페이지에서 패키지를 다운받아서 설치하는 방법이 있겠으나, 매우 비추천하는 방식이다. 특히나 `python`은 2.X 대와 3.X 대의 라이브러리나 문법이 서로 호환이 안되므로 `python` 버젼관리를 도와주는 `pyenv`를 설치하여 관리하도록 한다.

# homebrew 설치

`homebrow`를 우선 설치해서 `pyenv`의 설치를 돕도록 한다.

```shell
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)”
```

# pyenv 설치

`homebrow`를 설치했다면 아래의 명령어로 `pyenv`를 설치한다.

```
brew install pyenv
```

# python 설치

아래의 명령어를 입력하면 설치가 가능한 목록이 출력된다.

```
$ pyenv install -l
Available versions:
  2.1.3
  2.2.3
  2.3.7
  2.4
  2.4.1
  2.4.2
  2.4.3
  2.4.4
  2.4.5
  2.4.6
  2.5
  2.5.1
  2.5.2
  2.5.3
  ...
  3.6.0
```

원하는 버젼을 선택해서 설치한다.

```
pyenv install 2.7.12
```

# pyenv global 셋팅

`python` 버젼을 전역(global)로 셋팅한다.

```
pyenv global 2.7.12
```

# pyenv 적용

위의 셋팅을 하고나면 시스템에 적용을 해야하는데 이때는 아래와 같은 명령어를 이용한다.

```
eval "$(pyenv init -)"
```

해당 내용은 아래와 같은 sh을 실행시킨다.

```shell
export PATH="/Users/seotory/.pyenv/shims:${PATH}"
export PYENV_SHELL=bash
source '/usr/local/Cellar/pyenv/1.0.7/libexec/../completions/pyenv.bash'
command pyenv rehash 2>/dev/null
pyenv() {
  local command
  command="$1"
  if [ "$#" -gt 0 ]; then
    shift
  fi

  case "$command" in
  rehash|shell)
    eval "$(pyenv "sh-$command" "$@")";;
  *)
    command pyenv "$command" "$@";;
  esac
}
```

매번 위의 명령어를 적용시키고 싶지 않다면 아래와 같이 `.bash_profile`에 아예 등록을 시켜두도록 한다.

```
echo 'eval "$(pyenv init -)"' >> ~/.bash_profil
```

후에 `.bash_profile`을 실행시켜 시스템에 적용한다

```
. ~/.bash_profile
```

# pyenv local 셋팅

`pyenv`를 이용하면 `python`의 전역 버젼 뿐만 아니라 특정 폴더에서 로컬 version을 가지고 실행이 가능하다. 테스트를 위해 3.6.0 버젼을 설치하여 아래와 같이 실행해본다.

```
mkdir python-test
cd python-test

pyenv install 3.6.0
pyenv versions
  system
* 2.7.12 (set by /Users/seotory/.pyenv/version)
  3.6.0

pyenv local 3.6.0
python -V
Python 3.6.0

cd ..
python -V
Python 2.7.12
```

python-test라는 폴더를 만들고 해당 폴더에는 3.6.0 버젼의 `python`을 사용하도록 했다. `cd`명령어를 사용해서 상위폴더와 비교해보니 python-test에서만 3.6.0 버젼이 사용됨을 확인되었다.

`local` 명령어를 사용할 경우 `.python-version`이라는 파일이 생기고 `python`이 실행될 때에 해당 파일의 내용을 확인하여 `python`의 실행 버젼이 변경된다.

# pyenv 명령어 목록

`pyenv`에서는 아래와 같은 커맨드를 사용할 수 있다.

```
commands
completions
exec
global
help
hooks
init
install
local
prefix
rehash
root
shell
shims
uninstall
version
version-file
version-file-read
version-file-write
version-name
version-origin
versions
whence
which
```
