---
layout: post
title: express, typescript, webpack setting
date: 2016-10-30 12:24:17 +0900
description:
image:
categories: dev
published: false
comments: false
tags:
---

`nodejs` 를 활용하여 사이트를 구축하기 위해 `express`, `typescript`, `webpack` 등 최신 스펙을 활용하여 셋팅을 한번 해보자.

# 1. directory setting

```
mkdir sitebone
cd sitebone
```

# 2. express setting

일단 express를 설치하도록 한다.

```
npm install express --save
```

사이트에 나와 있는 메뉴얼대로 `app.js` 파일을 만들도록 한다.

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
```

커멘드라인에서 `localhost:3000`을 입력하여 페이지가 정상 출력되는지 확인하면 1차 express 설치는 끝난것이다.

# 3. webpack

```
npm install --save-dev webpack
```




# 3. typescript setting

`typescript`는 구글에서 개발된 javascript 전처리기로써 `babel`과 비슷한 역활을 하지만 이것보다 범위가 큰 슈퍼셋의 개념이다. `typescript`는 다음과 같이 설치하도록 한다.

```
npm install --save-dev typescript
```

typescript 또한 설정파일이 필요한데 이런 설정파일을 편하게 작성하기 위해 아래와 같이 `typings` 모듈을 설치하고 init 명령어를 실행시킨다.

```
npm install -g typings
typings init
```
## 3-1 config 파일 셋팅

typescript 역시 config 파일을 셋팅하여 편하게 구동 시킬 수 있다. 자세한 내용은 [공식홈페이지](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html){:target="_blank"} 를 이용하도록 한다. 아래는 최소한의 동작을 위하여 작성한 config 파일이다.

```json

```

# 4. webpack setting

webpack은 여러가지 모듈을 하나로 묶어 주며, 다음과 같은 목표를 가지고 있는 툴입니다.

- 의존관계를 필요관계에 의한 모듈주입관계로 바꿔준다.  
  (Commonjs, AMD를 활용했다는 의미로 보인다.)
- 초기화를 낮은 시간으로 유지
- 결과물이 하나의 모듈이 될 수 있다.
- 서드파티의 라이브러리를 하나의 모듈로 활용 할 수 있는 능력
- 모듈을 통합할때 마다 커스터마이징을 할 수 있는 능력
- 대형 프로젝트에 적합  
  (대형이라고는 하나 webpack으로 하나되는 느낌)

```
npm install webpack -g
```
# 4. react

```
npm install --save react react-dom
```
