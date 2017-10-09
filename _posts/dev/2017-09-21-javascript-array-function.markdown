---
title: 자바스크립트 화살표 함수 (array function)
date: 2017-09-21 10:56:01 +0900
description: 
image: 
categories: dev
history: false
published: true
comments: true
tags:
---

`array func`은 아래와 같은 간단한 형태를 보면 매우 간단하나, 복잡한 구문을 보면 매우 어렵게 느껴진다. 쉬운 `array func` 부터 복잡한 `array func`까지 절차적으로 밟아보자.

<!-- # 람다. -->
<!-- https://ko.wikipedia.org/wiki/%EB%9E%8C%EB%8B%A4_%EB%8C%80%EC%88%98 -->

# array func

array func의 특징을 정리해보자면 아래와 같이 간략하게 정리할 수 있다.

- function에 비해 구문이 짧다.
- 항상 익명이다.
- this, arguments, super, new target을 바인딩하지 않는다.
- 생성자로 사용할 수 없다.

## 문법

`array func`은 비슷비슷 하지만 결과가 다른 부분이 많기 때문에 간단한 라인이라도 처음에는 꼼꼼하게 보는 것이 좋다.

- 기본 문법

  여기서 리턴이 필요하면 명시적으로 return을 선언한다.

  ```javascript
  // 문법
  (매개변수1, 매개변수2, 매개변수3, 매개변수n) => { 구문 }

  // 리턴이 없는 예
  let test = (a) => { console.log(a) }
  let testVal = test(1); //console.log -> 1
  console.log(testVal) // undefined

  // 리턴이 있는 예
  let test = (a, b, c) => { return a + b + c }
  let testVal = test(1,2,3);
  console.log(testVal) // 6
  ```

- 간결한 리턴 문법

  오른쪽 구문에서 중괄호를 생략하면 `array func`에서는 자동으로 표현식을 리턴한다. 즉 return 생략이 가능하다.

  ```js
  // 문법
  (매개변수1, 매개변수2, 매개변수3, 매개변수n) => 표현식

  // 예
  let test = (a, b, c) => a + b + c
  let testVal = test(1,2,3);
  console.log(testVal) // 6
  ```

- 매개변수가 하나인 경우 좌측 괄호 생략이 가능

  ```js
  // 문법
  매개변수1 => 표현식
  매개변수1 => { 구문 }

  // 예
  let test = a => a + 10
  let testVal = test(1);
  console.log(testVal) // 11

  let test = a => { return a + 10 }
  let testVal = test(1);
  console.log(testVal) // 11
  ```

- 객체 리터럴을 반환하는 식에는 우측에 괄호를 감쌈

  ```js
  // 문법
  매개변수1 => ({name: 매개변수1})

  // 예
  let test = a => ({aVal: a})
  let testVal = test('에이');
  console.log(testVal) // {aVal: "에이"}
  ```

- 매개변수에 기본값 셋팅이 가능

  ```js
  // 문법
  (매개변수1 = 'default', 매개변수2) => { 표현식 }

  // 예
  let test = (a=10, b) => { return a + b }
  let testVal = test(undefined, 5);
  console.log(testVal); // 15

  // 주의: undefined 대신 null을 입력하면 기본값을 넣지 않는다.
  let testVal = test(null, 5);
  console.log(testVal); // 5
  ```

- 매개변수는 펼침 연산자 사용 가능

  ```js
  // 문법
  (...매개변수n) => { 표현식 }

  // 예
  let test = (...args) => { console.log(args) }
  test(1,2,3,4,5) // console.log -> [1,2,3,4,5], return -> undefined
  ```

- 매개변수에 비구조화된 매개변수 또한 사용 가능

  ```js
  var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
  // 중간과정 해석
  // ([a, b] = [1, 2])  >>  a = 1, b = 2 할당
  // {x: c} = {x: a + b}  >> a+b 를 선 계산 후 오른쪽 x 에 할당, 할당된 x 는 다시 왼쪽 x에 할당되면서 c = 3이 할당
  // 즉 a=1, b=2, c=3 이 됨.
  f();  // 6
  ```

## function과 다른 점

가장 중요한 특징은 this, arguments가 자동으로 바인딩이 되지 않는다는 것이다. 보통 일반 func 같은 경우는 아래와 같다.

```js
let scopeTest = {
    run: function () {
        console.log(this);
        console.log(arguments);
    }
}

scopeTest.run();
// console.log -> {run: ƒ}
// console.log -> [callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

하지만 아래와 같이 `array func`을 이용하면 에러가 발생한다.

```js
let scopeTest = {
    run: () => {
        console.log(this);
        console.log(arguments);
    }
}

scopeTest.run();
// console.log -> Window {stop: ƒ, open: ƒ, alert: ƒ, confirm: ƒ, prompt: ƒ, …}
// console.log -> Uncaught ReferenceError: arguments is not defined
// console.log ->    at Object.run (<anonymous>:4:21)
// console.log ->    at <anonymous>:8:11
```

## 사용예제

위에서 간략하게 `array func`의 사용법과 특징을 배웠으니 이번에는 예제를 통해 익혀보자. 처음 접하는 문법을 빠르게 익힐때에는 쉬운 문법부터 복잡한 문법까지 절차적으로 익혀가되 해당하는 문법을 완벽하게 이해하고 넘어가야 도움이 된다.

아래는 array func과 일반 func으로 번갈아가며 비교해본다.

- 기초

  ```javascript
  // array function
  let resultlVal = () => { console.log('test'); }
  // function
  function resultVal() {
    console.log('test');
  }

  // array function
  let resultlVal = (...args) => { console.log(args); }
  // function
  function resultVal(...args) {
    console.log(args);
  }
  
  // array function
  let resultlVal = (...args) => args;
  // function
  function resultVal(...args) {
    return args;
  }
  ```

- 함수 내 함수

  1번 예제에서는 return 값이 없기 때문에 이 args.map에 대한 연산은 undefined의 배열이 된다.

  ```javascript
  // 1
  // array function
  let result = (...args) => val => args.map(a => {a + val})
  // function
  function result (...args) {
    return function(val) {
      return args.map(function(a) {
        a + val; 
      });
    }
  }

  // 2
  // array function
  let result = (...args) => val => args.map(a => a + val)
  // function
  function result (...args) {
    return function(val) {
      return args.map(function(a) {
        return a + val;
      });
    }
  }
  ```

- 기타 array func 사용법

  필자가 callback 패턴을 promise 패턴으로 바꾸는 방법 중 가장 자주 사용하는 방법은 아래와 같은 promiseWrapper함수 유틸을 만들고 사용하는 방법이다. 이 로직 역시 array func으로 아래와 같이 작성할 수 있다.

  ```js
  // array function
  function promiseWrapper (func, ...args) { 
      return new Promise(resolve => func(...args, ...returnArgs => resolve(returnArgs)));
  };
  // function
  function promiseWrapper (func, ...args) {
    return new Promise(function(resolve) {
      return func(...args, function(...returnArgs) {
        return resolve(returnArgs);
      })
    })
  }
  ```

# 커링 (currying)

<!-- https://blog.benestudio.co/currying-in-javascript-es6-540d2ad09400 -->

`array func`의 기본기를 알아보았으니 이번에는 커링도 한번 해보도록 하자. 커랑이란 간단하게 이야기하자면 함수의 인자를 고정시켜 적용하는 함수를 만드는 기법이다. 

아래는 합을 구하는데 커링 기법을 이용한 것이다.

```js
let sumCurry = fixNum => input => fixNum + input;
```

사실 위에 있는 예제들도 커링 기법이 적용된 예제들이 많다. 
<!-- 
이번에는 커링함수를 만들고 역커링 하는 방법도 함께 알아본다.
```javascript
curry = f => a => b => f(a, b)
uncurry = f => (a, b) => f(a)(b)
papply = (f, a) => b => f(a, b)

add = (a, b) => a + b
curriedAdd = a => b => a + b

add(5,6) === 11
curriedAdd(5)(6) === 11

uncurry(curry(add))(5,6) === 11
curry(uncurry(curriedAdd))(5)(6) === 11
``` -->

# 주의사항

- 줄바꿈 주의

  화살표 함수는 파라메터와 화살표 사이에 개행 문자를 포함 할 수 없다.

  ```js
  // error
  var func = ()
          => 1; // SyntaxError: expected expression, got '=>'
  ````

- 파싱순서 주의

  ```js
  let callback;

  callback = callback || function() {}; // ok
  callback = callback || () => {};      // SyntaxError: invalid arrow-function arguments
  callback = callback || (() => {});    // ok
  ```

- undefined 주의

  ```js
  let empty = () => {};
  // empty = undefined
  ```

- 매개변수가 없을 시 주의

  ```js
  // => { statements } error
  () => { statements }
  ```