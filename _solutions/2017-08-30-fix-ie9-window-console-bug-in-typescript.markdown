---
layout: post
title:  typescript에서 ie9 window.console bug 수정하기
date: 2017-08-30 17:37:25 +0900
description: 
image: 
categories: 
history: false
published: true
comments: true
tags:
---
ie와의 지독한 싸움이 아직도 끝나지 않았다. 

예전에 ie9에서 작업할 때 꼭 디버깅 창을 열어야 javascript 소스가 실행되는 현상이 있었다. 알고보니 **ie9 버그**로써 디버그 창을 열어야 `console`을 인식하고, 디버그 창을 열지 않으면 `console`이라는 문자열이 js에 찍히는 순간 javascript가 에러나서 종료되는 현상이였다.

> 웹 개발자의 최대 적 IE.

그때는 아래와 같이 해결했다.

```javascript
if (!window.console) {
    window.console = {};
    console.log = function(){};
}
```

이번에도 어김없이 같은 bug에 직면했는데 예전과 다른 상황이 있다면 나는 현재 `typescript`로 작업을 하고 있다는 점이다. 위에 적힌 소스를 그대로 가져다가 bug를 해결하려고 했는데 아래와 같은 typescript error가 발생하였다.

> [ts] Cannot assign to 'console' because it is a constant or a read-only property.

`window.console` 프로퍼티가 ts.d 파일에 read only로 선언되어 있어서 덮어 쓸 수 없다는 문제였다. `typescript`에서는 이런 경우가 종종 있어 java의 casting(캐스팅)과 비슷한 `type assertions`라는게 존재한다. `type assertions`은 컴파일시에 타입을 바꿔주는 역활을 한다.

이제 `type assertions`을 이용해 기존 버그를 수정해보자. 아래의 코드를 적절한 곳에 넣어주면 bug는 해결된다.

```javascript
if (typeof window.console === "undefined") {
    (<any>window).console = <Console>({
        debug: (message ?: string, ...optionalParams: any[]) => {},
        error: (message?: any, ...optionalParams: any[]) => {},
        info: (message ?: any, ...optionalParams: any[]) => {},
        log: (message?: any, ...optionalParams: any[]) => {},
        warn: (message?: any, ...optionalParams: any[]) => {}
    });
}
```