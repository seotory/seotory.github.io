---
title: zsh, zplug과 oh-my-zsh 시작하기
date: 2017-12-19 14:19:39 +0900
description: 
image: https://lh3.googleusercontent.com/w6YVPeAd8HXeNFgGcSyyeL_qxEDNghgSc8UgI4v1iOkMQ-2anhFSReHdbY3FjJ8vbYP2CEVKgRGcwrfTN_NUeM3NKyaIkYvwWbpFQQVlOlRnRLtimIPVUO71OJVSi_2JLoF7bKATVt4nPsHw4uu6MJiZt9BWA6TzDw7GySFnRlv0YfdKgKOv2z7Go2A0yKRLJ8s37v3qcAlrAwDa18tIyuIwktibDOiC8b0t0KfR1xn7zcuAnKGRQ62HHfyg1QUfnpoF1iPNLtX-gfnz3qoXFzjIFNbJiV47TEWLmrli48aWPVsqeZRg30_1EWq5diUG_6KnJ_FkVJeB5Ty_wRpsXqFoyIug2MjFZOUBlhqCykiZMazB5GY_P-jQ4_PxB_FDYmCFTwWqCJz7obhafnIfz7Q8zjdO2K099Ajr1j1v__zUpKVEdh4Yq84EIXivkOKg07otZ2uag9gzVjY9J7SICVMe3iaSf1HPvp8yDJra5aJDFandkHhrC05IBNdmCH6wT0jCdRVyM3wxafVST1U3ocgO5G7qJCwDv_NQl0ZUcSIWVKUK2vPZAIonhqhkVxvBMnDiVQk6bSnKfnFmELFSYxxPpItGJdp-YZaNKwTSkT6eUSpLf_8NbQgLbxBKAvrlDzOde4Yz5cawp5UgQd6UoBKTLlIkQV3J=s0
categories: dev/etc
history: false
published: true
comments: true
tags:
---

# 최종 모습

![스크린샷](https://lh3.googleusercontent.com/w6YVPeAd8HXeNFgGcSyyeL_qxEDNghgSc8UgI4v1iOkMQ-2anhFSReHdbY3FjJ8vbYP2CEVKgRGcwrfTN_NUeM3NKyaIkYvwWbpFQQVlOlRnRLtimIPVUO71OJVSi_2JLoF7bKATVt4nPsHw4uu6MJiZt9BWA6TzDw7GySFnRlv0YfdKgKOv2z7Go2A0yKRLJ8s37v3qcAlrAwDa18tIyuIwktibDOiC8b0t0KfR1xn7zcuAnKGRQ62HHfyg1QUfnpoF1iPNLtX-gfnz3qoXFzjIFNbJiV47TEWLmrli48aWPVsqeZRg30_1EWq5diUG_6KnJ_FkVJeB5Ty_wRpsXqFoyIug2MjFZOUBlhqCykiZMazB5GY_P-jQ4_PxB_FDYmCFTwWqCJz7obhafnIfz7Q8zjdO2K099Ajr1j1v__zUpKVEdh4Yq84EIXivkOKg07otZ2uag9gzVjY9J7SICVMe3iaSf1HPvp8yDJra5aJDFandkHhrC05IBNdmCH6wT0jCdRVyM3wxafVST1U3ocgO5G7qJCwDv_NQl0ZUcSIWVKUK2vPZAIonhqhkVxvBMnDiVQk6bSnKfnFmELFSYxxPpItGJdp-YZaNKwTSkT6eUSpLf_8NbQgLbxBKAvrlDzOde4Yz5cawp5UgQd6UoBKTLlIkQV3J=s0)

# zsh을 사용하게 된 계기

- bash sh을 아주 잘쓰고 있었음
- 실수로 `rm -rf ~`를 입력
- 혼돈의 카오스
- 닷으로 시작하는 설정 파일들이 날라감 (.bash* 등등)
- **이렇게 된 이상 그 좋다던 zsh을 사용해보자.**

# 셋업 환경

- mac
- iTerm2

# zsh 설치하기

mac은 기본적으로 zsh이 깔린 듯 하다. 아래를 실행시켜 확인해본다.

```
zsh --version
```

만약 없다면 아래의 커맨드를 실행시켜 설치한다.

```
brew install zsh
```

설치가 끝났다면 `chsh`을 사용해서 기본 쉘을 바꾼다.

```
chsh -s `which zsh`
```

# oh my zsh 설치하기

[홈페이지](http://ohmyz.sh/){:target="_blank"}에 나와 있는 방법대로 아래의 2가지 중 한 가지 방법으로 설치한다.

**wget**

```
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

**curl**

```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

위의 sh를 실행시키면 git에서 `oh my zsh` 저장소를 `~/.oh-my-zsh` 경로에 clone을 한다. 그리고 `vi ~/.zshrc`에 기본 셋팅을 자동으로 해준다. 여기까지는 `oh my zsh` 사용법이다.

# zplug 설치하기

일반적으로는 위의 방법까지 진행하면 크게 사용하는 데에는 지장이 없을 것이다. 개인적으로 `oh my zsh`을 커버할 수 있는 프레임워크를 원했고 찾아보니 일본 냄새 풀풀 나는 [zplug](https://github.com/zplug/zplug){:target="_blank"}이라는게 있었다.

사실 이것 말고도 여러 가지가 있었으나 범용성이 떨어졌다. `oh my zsh`에 너무 의존적이거나 사용하기 불편하거나 느리거나 세 가지 중 하나여서 모든 zsh의 라이브러리를 커버할 수 있으면서 속도도 괜찮은 `zplug`를 선택하였다. `zplug`에서는 아래 목록을 사용할 수 있다. (사실상 거의 모든 것)

- Zsh plugins/UNIX commands on GitHub and Bitbucket
- Gist files (gist.github.com)
- Externally managed plugins e.g., oh-my-zsh and prezto plugins/themes
- Binary artifacts on GitHub Releases
- Local plugins
- etc. (you can add your own sources!)

그럼 이제 `zplug`을 설치해보자.

```
export ZPLUG_HOME=~/.zplug
git clone https://github.com/zplug/zplug $ZPLUG_HOME
```

설치는 끝났고 사용하는 법만 남았다. 기본적으로 `oh my zsh`에서 사용 가능한 플러그인과 테마가 모두 사용이 가능하다. 또한 외부테마도 사용할 수 있다. 필자는 [spaceship](https://github.com/denysdovhan/spaceship-zsh-theme){:target="_blank"}이라는 어여쁜 외부 테마를 사용할 예정이다. 

기존에 `oh my zsh`에서 자동으로 작성해준 `.zshrc`의 모든 내용을 지우고 아래의 내용으로 교체한다.

```
##################
# VAL SET
##################
export ZSH=~/.oh-my-zsh

##################
# ZPLUG LOAD
##################
source ~/.zplug/init.zsh

##################
# ZPLUG START
##################
zplug "zsh-users/zsh-completions"
zplug "zsh-users/zsh-history-substring-search"
zplug "zsh-users/zsh-syntax-highlighting"
zplug "robbyrussell/oh-my-zsh", use:"lib/*.zsh"
zplug "plugins/git", from:oh-my-zsh
zplug "plugins/osx", from:oh-my-zsh, if:"[[ $OSTYPE == *darwin* ]]"
zplug "plugins/zsh_reload", from:oh-my-zsh
zplug "plugins/colorize", from:oh-my-zsh
zplug "plugins/docker", from:oh-my-zsh
zplug "robbyrussell/oh-my-zsh", use:"lib/*.zsh"
# zplug "themes/robbyrussell", from:oh-my-zsh

# theme
zplug "denysdovhan/spaceship-zsh-theme", use:spaceship.zsh, from:github, as:theme

# install & load
zplug check || zplug install
zplug load
```

아래 커맨드로 적용시킨다.

```
source ~/.zshrc
```

`zplug`를 통해 `oh my zsh`의 플러그인과 github에 있는 외부테마가 콜라보를 이루며 잘 적용된다.

> 자세한 사용법은 [zplug](https://github.com/zplug/zplug){:target="_blank"}를 참조하는게 좋을것 같다. (아직 필자도 잘 모르기 때문에..)

# 폰트 깨짐 해결

막상 spaceship theme를 적용하면 터미널 내에서 폰트가 깨진다. [https://github.com/powerline/fonts](https://github.com/powerline/fonts){:target="_blank"}에 가면 터미널을 위한 특수 폰트가 준비되어 있다. 설치한다.

```
# clone
git clone https://github.com/powerline/fonts.git --depth=1
# install
cd fonts
./install.sh
# clean-up a bit
cd ..
rm -rf fonts
```

- `iTerm2 > Preferences > Profiles > Text` 설정에 들어간다.
- `Font`부분에서 `Use a different for non-ASCII text`에 체크한다.
- `Non-ASCII Font`에서 `Change Font`를 클릭하고 `Roboto Mono for Powerline`을 선택한다.

해결완료.

# iTerm2 꾸미기

[http://iterm2colorschemes.com/](http://iterm2colorschemes.com/){:target="_blank"}, 감사하게도 이 사이트에 iTerm에 관련된 테마가 준비되어 있다. 다운 받고 압축을 풀면 `schemes` 폴더에 수많은 테마들이 존재하고 `import`를 통해 적용시키기만 하면 된다.

- `iTerm2 > Preferences > Profiles > Colors` 설정에 들어간다.
- 우측 하단 `Color Presets...` 클릭
- `Imports...` 클릭
- `schemes > ayu` 테마 적용

적용완료.

**모든 설정이 끝났다. 이제 zsh로 즐거운 터미널 생활을 해보자.**