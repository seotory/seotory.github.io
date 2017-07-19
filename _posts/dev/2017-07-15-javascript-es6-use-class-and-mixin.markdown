---
layout: post
title: javascript es6에서 class 및 mixin 사용해보기
date: 2017-07-15 22:25:59 +0900
description: 
image: 
categories: dev
history: false
published: false
comments: false
tags:
---

es6가 나온지도 꽤 되었다. 많은 스펙들이 추가가 되었지만 가장 중요한 class에 대해서 정리를 해보자. 예전부터 느낀거지만 순수 es6 class 문법은 다소 불편한 부분이 있다.

# class 사용해보기

```javascript
class Man {
    
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }



}

class Coffee {

    constructor (name, price) {
        this.name = name;
        this.price = price;
    } 

    shot (count) {
        
    }

}
```

# class mixin

javascript es6 class는 다중 extends를 지원하지 않는다. 대신 mixin 패턴을 이용해서 다중 extends를 흉내 낼 수 있다. 이 방법은 MDN(Mozilla Developer Network) 사이트에 나와 있는 방법이기도 하다.


