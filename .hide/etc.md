# 부하테스트.

https://www.google.co.kr/search?q=ngrinder&oq=nglin&aqs=chrome.1.69i57j0l5.9350j0j1&sourceid=chrome&ie=UTF-8

# javascript es6 mix-ins.

`Mix-ins`
추상 서브 클래스 또는 믹스-인은 클래스를 위한 템플릿입니다. ECMAScript 클래스는 하나의 단일 슈퍼클래스만을 가질 수 있으며, 예를 들어 툴링 클래스로부터의 다중 상속은 불가능합니다. 기능은 반드시 슈퍼클래스에서 제공되어야 합니다.

슈퍼클래스를 인자로 받고 이 슈퍼클래스를 확장하는 서브클래스를 생성하여 반환하는 함수를 사용하여 ECMAScript에서 믹스-인을 구현할 수 있습니다:

아래는 두 함수는 어떤 클래스를 인자로 받고 그 클래스를 상속한 새로운 익명 클래스를 리턴하는 arrow function 입니다.

```
var calculatorMixin = Base => class extends Base {
  calc() { }
};

var randomizerMixin = Base => class extends Base {
  randomize() { }
};
```

위 믹스-인을 사용하는 클래스는 다음과 같이 작성할 수 있습니다:

```
class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
```

# mix-ins 꼼수

Improving the Syntax

I find applying mixins as functions to be both elegantly simple - describing exactly what's going on, but a little bit ugly at the same time. My biggest concern is that this construction isn't optimized for readers unfamiliar with this pattern.

I'd like a syntax that was easier on the eyes and at least that gave new readers something to search for to explain what's going on, like the Dart syntax. I'd also like to add some more features like memoizing the mixin applications and automatically implementing instanceof support.

For that we can write a simple helper which applies a list of mixins to a superclass, in a fluent-like API:

```
class MyClass extends mix(MyBaseClass).with(Mixin1, Mixin2) {  
  /* ... */
}
```
Here's the code:

```
let mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {  
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) { 
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}
```
That's it! It's still extremely simple for the features and nice syntax it enables.