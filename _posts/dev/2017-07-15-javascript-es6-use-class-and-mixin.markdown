---
layout: post
title: javascript es6 class 및 mixin 사용해보기
date: 2017-07-15 22:25:59 +0900
description: 
image: 
categories: dev
history: false
published: false
comments: false
tags:
---

es6가 나온지도 꽤 되었다. 많은 스펙들이 추가가 되었지만 가장 중요한 class에 대해서 정리를 해보자. 예전부터 느낀거지만 es5보다 편한 부분도 있고 불편한 부분도 있다. 중요한 점은 es6 또한 **prototype 기반**이며 단지 문법상의 변화만 있다는 점이다. 즉 이전 자바스크립트에서 prototype을 사용함으로 얻는 이점을 그대로 가지고있다.

# class 기초 사용해보기

문법변화 차이를 느껴보기 위해 es5, es6 두 스펙으로 작성하였다.

## 기본 문법

```javascript
// es5
function TestClass () {}
TestClass.prototype.print = function () {
    console.log('TestClass instance print method');
}

// es6
class TestClass {
    print () {
        console.log('TestClass instance print method');
    }
}

// test
var tc = new TestClass();
tc.print();
```

es6 class를 사용함으로써 가지는 이점을 가장 잘 나타내는 부분이 위의 코드이다.

- class를 정확히 명시함으로 오해를 줄일 수 있다.
- prototype에 대해 잘 몰라도 다른 언어처럼 작성이 가능하다.

## 생성자 (constructor)

```javascript
// es5
function TestClass () {
    this.val = '값';
}

// es6
class TestClass {
    constructor() {
        this.val = '값';
    }
}

// test
var tc = new TestClass();
tc.val; // 값
```
es5에서는 함수 자체가 생성자 역활을 한다.

## 복합사용

위의 기본문법과 생성자를 묶어서 사용하면 아래와 같은 형태가 된다.

```javascript
// es5
function Job(name) {
    this.name = name;
}
Job.prototype.work = function () {
    console.log(this.name + ' 일을 합니다.');
}

// es6
class Job {
    constructor (name) {
        this.name = name;
    }

    work () {
        console.log(this.name + ' 일을 합니다.');
    }
}

// test
var newJob = new Job('프로그래머');
newJob.work(); // 프로그래머 일을 합니다.
```

## 상속

일단 아래의 코드를 보고 이야기 해보자.

```javascript
// es5
function Job(name) {
    this.name = name;
}
Job.prototype.work = function () {
    console.log(this.name + ' 일을 합니다.');
}

function Developer() {
    Job.call(this, '프로그래머');
}
Developer.prototype = Object.create(Job.prototype);
Developer.prototype.constructor = Developer;
Developer.prototype.coding = function () {
    console.log('코딩을 합니다.');
}

// es6
class Job {
    constructor (name) {
        this.name = name;
    }

    work () {
        console.log(this.name + ' 일을 합니다.');
    }
}
class Developer extends Job {
    constructor () {
        super('개발자');
    }
    coding () {
        console.log('코딩을 합니다.');
    }
}

// test
var itJob = new Developer();
itJob.work();
itJob.coding();

console.log(itJob instanceof Developer); // true
console.log(itJob instanceof Job); // true

```

> es5 문법이 이해가 잘 안된다면 prototype에 대해 공부가 필요하다.

es5에서 상속은 prototype 이해없이 보기에 매우 어렵다. es5는 원래 class를 지원하지 않기 때문에 this, prototype, scope 특성을 이용하여 강제로 상속관계를 만들어준다. Job이라는 클래스를 Developer라는 클래스에서 상속 받기 위한 불친절한 코딩들이 들어간다.


이런 어려운 점이 많기 때문에 es6 class 문법이 빛을 발하는 순간이 바로 상속을 구현하는 경우이다. es5에서는 상속을 구현하기 위해서는 prototype 및 javascript의 특성을 정확히 알아야 제대로 구현할 수 있었다. 이 부분이 javascript를 익히는데 가장 큰 걸림돌이 되었다. es6에서는 다른 언어를 사용했던 개발자라면 바로 작업이 가능하게끔 문법적으로 정리가 되어있음을 확인할 수 있다.

역으로 prototype 언어 열성팬에게는 class 문법에 대한 불만들이 있다. es5에서는 여러가지 재료를 나두고 나만의 레시피를 만드는 느낌이라면 es6에서는 정해진 레시피로만 요리를 하는 느낌이다. es6의 class 문법에 대한 판단은 각자하면 되지만 개인적으로는 사용하기 좋은 문법으로 잘 정되었다는 점에서 후한 점수를 주고 싶다.

# class mixin

javascript es6 class는 다중 extends를 지원하지 않는다. 대신 mixin 패턴을 이용해서 다중 extends를 흉내 낼 수 있다. 이 방법은 MDN(Mozilla Developer Network) 사이트에 나와 있는 방법이기도 하다.


