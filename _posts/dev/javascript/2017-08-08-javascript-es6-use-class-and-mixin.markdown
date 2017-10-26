---
layout: post
title: javascript es6 class 및 mixin 사용해보기
date: 2017-08-08 10:25:59 +0900
description: 
image: 
categories: dev/javascript
history: false
published: true
comments: true
tags:
 - javascript
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
TestClass.staticMethod = function () {
    console.log('static method');
}

// es6
class TestClass {
    print () {
        console.log('TestClass instance print method');
    }
    static staticMethod () {
        console.log('static method');
    }
}

// test
TestClass.staticMethod();
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
es5에서는 함수 자체가 생성자 역활을 한다. 사실 함수 자체가 생성자 역활을 한다는것 자체가 애매모호하기 때문에 es6에서는 class 안에 constructor를 명시하여 작성하게끔 한다.

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
        super('프로그래머');
    }
    coding () {
        console.log('코딩을 합니다.');
    }
}

// test
var itJob = new Developer();
itJob.work(); // 프로그래머 일을 합니다.
itJob.coding(); // 코딩을 합니다.

console.log(itJob instanceof Developer); // true
console.log(itJob instanceof Job); // true

```

> es5 문법이 이해가 잘 안된다면 prototype에 대해 공부가 필요하다.

위의 코드는 매우 짧지만 javascript의 거의 모든것이 포함되어 있다. 따라서 es5에서 상속은 prototype 이해없이 보기에 매우 어렵다. es5는 원래 class를 지원하지 않기 때문에 this, prototype, scope 특성을 이용하여 강제로 상속관계를 만들어준다. Job이라는 함수를 Developer라는 함수에서 상속 받기 위해 불친절한 코딩들이 들어간다.

이런 어려운점 때문에 es6 class 문법이 빛을 발하는 순간은 바로 상속을 구현하는 경우이다. es5에서는 상속을 구현하기 위해서는 prototype 및 javascript의 특성을 정확히 알아야 제대로 구현할 수 있었다. 이 부분이 javascript를 익히는데 가장 큰 걸림돌이 되었다. es6에서는 다른 언어를 사용했던 개발자라면 바로 작업이 가능하게끔 문법적으로 잘 정리가 되어있음을 확인할 수 있다.

역으로 prototype 열성팬에게는 class 문법에 대한 불만들이 있다. es5에서는 여러가지 재료를 나두고 나만의 레시피를 만드는 느낌이라면 es6에서는 정해진 레시피로만 요리를 하는 느낌이다. es6의 class 문법에 대한 판단은 각자하면 되지만 개인적으로는 사용하기 좋은 문법으로 잘 정리되었다는 점에서 후한 점수를 주고 싶다.

# class mixin (다중상속 흉내내기)

javascript es6 class에서 단일 extends는 가능하지만 다중 extends를 지원하지 않는다. 대신 mixin 패턴을 이용해서 다중 extends를 흉내 낼 수 있다. 이 방법은 MDN(Mozilla Developer Network) 사이트에 나와 있는 방법이기도 하다.

슈퍼클래스를 인자로 받아 확장하는 서브클래스를 작성하고 이 클래스를 다시 extends으로 상속하는 방법이다. 말로는 어려우니 아래 코드를 보면서 생각해보자.

```javascript
var calculatorMixin = Base => class extends Base {
  calc() { }
};

var randomizerMixin = Base => class extends Base {
  randomize() { }
};
```

위의 코드는 es6에 새롭게 추가된 array function으로 작성되었다. 코드의 내용은 Base 클래스를 인자로 받아서 Base 클래스를 extends 한 클래스를 리턴 받는 것이다. 이 코드를 익숙한 코드로 바꾸면 아래와 같다. 같은 내용이다.

```javascript
var calculatorMixin = function ( Base ) {
	return class extends Base {
  		calc() { }
	};
}

var randomizerMixin = function ( Base ) {
	return class extends Base {
  		randomize() { }
	};
}
```

이렇게 작성된 코드는 아래와 같이 사용할 수 있다.

```javascript
class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
```

코드를 보고 감이 왔는지 모르겠다. Foo 클래스가 randomizerMixin, calculatorMixin 두 개의 함수를 통과하면서 extends를 통해 함수 내의 클래스들이 상속된다.

이번에는 mixin 패턴을 쉽게 사용하기 위해 꼼수를 사용해보자. 위의 코드를 그대로 두고 아래의 MixinBuilder, mix를 작성한다.

```javascript
class MixinBuilder {  
    constructor(superclass) {
        this.superclass = superclass;
    }

    with(...mixins) { 
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
        // 위의 한줄은 아래의 코딩과 같은 내용이다.
        // return mixins.reduce(function(c, mixin){
        //     return mixin(c); // c -> this.superclass를 의미한다.
        // }, this.superclass) 
    }
}
let mix = (superclass) => new MixinBuilder(superclass);
```

작성된 코드는 아래와 같이 사용된다. 

```javascript
class Foo {}
class MyClass extends mix(Foo).with(calculatorMixin, randomizerMixin) { }
```

최초 작성했던 mixin 코드에서는 `calculatorMixin(randomizerMixin(Foo))` 이런 방식으로 작성을 해야하지만 위의 코드를 이용하면 `mix(Foo).with(calculatorMixin, randomizerMixin)`이라는 보기 좋은 형태로 mixin을 사용할 수 있다. 

MixinBuilder 클래스의 with 메소드는 함수내에서 reduce 연산을 한다. reduce는 javascript 코어 api 중에서도 조금 이해하기 어려운편이니 [이곳](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce){:target='_blank'}을 참조한다. 쉽게 누적되어 연산된다고 생각하면 될것 같다. 결국 저 코드의 내용은 `calculatorMixin(randomizerMixin(Foo))`처럼 해석되어 동작한다.

MixinBuilder 클래스는 슈가코드이니, 필요가 없다면 최초 작성했던 코드대로 사용하면되고 만약 상속받아야할 클래스가 많다면 MixinBuilder 클래스를 사용하는 편이 깔끔할것 같다. 

# class 기타사항

- es6 class에서는 호이스팅이 되지않는다.
- 표현식으로도 작성이 가능하다.