---
title: jekyll 개발모드로 사용 및 빌드하기
date: 2017-08-10 13:13:02 +0900
description: 
image: 
categories: dev/jekyll
history: false
published: true
comments: true
tags:
 - jekyll
 - env
---

`jekyll`로 블로그를 하다보니 운영빌드와 개발빌드를 나눠서 하고 싶은 마음이 생겼다. 이전까지는 귀찮아서 그냥 사용했는데 디스커스(댓글) 어드민에서 댓글의 url을 확인했더니 blog.seotory.com 도메인과, localhost 도메인으로 분할되는 것을 보고 제대로 작업하기로 했다.

`jekyll` [공식문서](https://jekyllrb.com/docs/configuration/#specifying-a-jekyll-environment-at-build-time){:target="_blank"}에 가보면 환경변수(env)를 통해 빌드시 선택적으로 빌드할 수 있도록 지원해주고 있다. `jekyll`에서는 공식적으로 `JEKYLL_ENV`이라는 명칭으로 사용한다. `JEKYLL_ENV` 환경변수에 운영이면 `production`를 입력하고 개발이면 `development`를 입력한다. 이렇게 작성된 환경변수를 `jekyll`에서 사용한다.

이번 포스팅을 간략하게 정리하면 아래와 같은 내용이다.

- 환경변수를 다양하게 등록하고 사용하는 법
- `jekyll`에서 환경변수를 사용하는 법
- `_config.yml`을 개발모드로 사용하는 법
- 기타 팁

# 환경변수 설정 및 사용

환경변수를 셋팅하는 방법에는 매우 다양한 방법이 있다. 작업중인 노트북은 맥북임으로 맥 기준으로 설명하도록 하겠다. 

## export 사용

기본적으로는 터미널에서 `export` 명령어를 이용해 아래와 같이 환경변수 셋팅이 가능하다.

```sh
export JEKYLL_ENV=development
```

하지만 보통은 위와 같이 환경변수를 고정하여 사용하지 않고 필요시에만 잠깐 등록했다가 없애는 방법으로 사용을 한다. 위와 같은 방식으로 개발을 하다보면 나중에는 환경변수가 많아져서 관리가 너무 어려워지기 때문이다.

## .bash_proflie 등록

다음으로 고려해봐야할 방법은 `.bash_profile`에 등록하는 방법이다. 이 파일은 터미널이 열리는 시점에 자동으로 읽히게 된다. 

```sh
echo 'export JEKYLL_ENV=development' >> ~/.bash_profile
```

하지만 이 방법 또한 명확한 방법은 아니기 때문에 환경변수가 기억나지 않으면 다시 파일을 열어서 찾아봐야 한다는 단점이 있다.

## 프롬프트를 이용하여 사용

가장 추천하는 방식은 아래와 같은 방법이다. 

```sh 
JEKYLL_ENV=development jekyll serve
```

위와 같이 터미널에 입력하게 되면 자체적으로 `JEKYLL_ENV` 환경변수에 `development` 문자열을 입력하고 `jekyll`이라는 실행파일에 환경변수를 넣어서 실행시켜준다. 따로 os에 셋팅이나 기록을 하지 않아도 된다는 장점이 있어서 주로 이렇게 사용을 한다.

이 방법의 단점은 window에서는 작동하지 않는다는 점이다. window에서 사용하고 싶다면 npm의 [cross-env](https://www.npmjs.com/package/cross-env){:target="_blank"} 라이브러리를 글로벌로 설치해서 아래와 같이 사용하거나 비슷한 프로그램을 찾아서 이용하면 된다.

```sh
cross-env JEKYLL_ENV=development jekyll serve
```

## direnv 이용

오늘 아웃사이더님의 블로그를 보니, 폴더별로 환경변수 관리를 해줄 수 있는 프로그램을 사용하고 있었다. [direnv](https://direnv.net/){:target="_blank"} 사이트를 참고해서 환경변수를 셋팅한다.

# jekyll에서 환경변수 사용하기

이제는 셋팅된 환경변수를 `jekyll`에서 사용해본다. 간단하게 아래와 같이 사용하면 된다.

{% raw %}
```html
{% if jekyll.environment == "production" %}
    <!-- 만약 운영 환경에서만 필요한 부분이라면.... -->
{% endif %}
```
{% endraw %}

`jekyll`로 만들어진 사이트는 대부분 github에 올라간다. 빌드를 아예 진행해서 올리면 상관없지만 빌드과정을 github에 위임했다면 github 내부적으로 `JEKYLL_ENV` 환경변수가 `production`로 셋팅되어 있음을 알아두는 편이 좋다.

# _config.yml 개발모드 적용하기

개발빌드와 운영빌드시 `_config.yml`의 내용을 바꿔가며 빌드해야하는 경우가 생길것이다. 예를 들어 아래와 같이 `_config.yml`에 셋팅했다고 하자.

```yml
title: Seotory
# title: Seotory_test
```

그런데 개발빌드를 진행할 때에 Seotory_test를 title에 넣고 싶다면 아랫 줄의 주석을 풀고 빌드를 진행해야 한다. 그리고 나서 다시 운영에 올릴땐 역으로 주석을 처리해야한다. 매우 비효율적이다. 이런 문제들까지도 이미 `jekyll`에 고려가 되어 있다.

```
jekyll serve --config _config.yml,_config.dev.yml
```

jekyll을 빌드하여 올릴때 config 옵션을 사용할수 있는데 독특한 점은 여러 개의 config파일을 넣을 수 있다는 점이다. `_config.dev.yml` 파일을 동일 위치에 만들고 위와 같이 실행시키면 `_config.yml`파일 내용을 `_config.dev.yml`가 덮어씌운다. 이렇게 하면 `_config.yml`에 불필요한 데이터를 입력하지 않아도 된다.

# 기타 팁

마지막으로 위의 내용을 정리해서 사용할 수 있는 팁이 있다. 만약 ruby의 rake를 사용하고 있다면 아래와 같이 등록하고 `jekyll`의 길어지는 명령어를 짧게 관리할 수 있다.

```ruby
namespace "build" do
  task :dev do
    system "cross-env JEKYLL_ENV=development jekyll serve --config _config.yml,_config.dev.yml --unpublished -t";
  end
  task :real do
    system "cross-env JEKYLL_ENV=production jekyll serve --config _config.yml -t";
  end
end
```

실행은 아래와 같이 하면 된다.

```sh
rake build:dev
rake build:real
```