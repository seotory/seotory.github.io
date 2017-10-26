---
title: java builder pattern (빌더 패턴)
date: 2017-09-03 18:11:59 +0900
description: 
image: 
categories: dev/java
history: false
published: true
comments: true
tags:
 - java
---
bulider pattern은 창조적 디자인 패턴이며 이것은 factory pattern 또는 abstract factory pattern과 매우 비슷하다. 이 패턴에 들어가기 전에 factory pattern과 abstract factory pattern들의 문제점(수 많은 attributes을 사용해야 패턴을 사용할 수 있는 점)에 대해 먼저 알아보자.

factory pattern과 abstract factory pattern에는 3가지 중대한 문제점이 있다.

- 수 많은 파라메터들이 클라이언트 클래스로 부터 전달 되는데 이것은 에러를 발생시키는 경우가 많다. 왜냐하면 거의 대부분의 경우 argument(인자)들의 type이 같고 클라이언트 쪽에서는 인자들을 정확히 유지시키기 어렵기 때문이다.
- 몇몇의 파라메터들은 값을 보낼때 선택적인데 factory pattern에서는 모든 인자를 전송해야 한다. 그리고 선택적인 파라메터들은 꼭 null을 입력해서 보내야한다.
- 만약 생성시키는 object가 무거운 경우(파라메터가 많은 경우) 만들기가 매우 복잡해지며, 이런 factory pattern의 복잡성으로 인해 결국 혼란스럽게 된다.

우리는 이런 문제점을 생성자(constructor)의 인자 갯수를 바꿈으로 해결할 수 있다. 하지만 이런 방식의 문제점은 모든 attribute들이 명시적으로 set 되지 않는 한 object의 상태는 일괄성이 없어지게될 것이다.

builder pattern은 선택적인 파라메터가 많을 경우 제공 상태를 일관성 있게 해주고, object를 생성시킬때 step-by-step으로 만들 수 있도록 제공해주며 최종에는 만들어진 object를 리턴한다.

# 작업순서

- class 안에 중첩 static class를 생성시키고, 바깥쪽 class의 argument들을 안쪽 static class(builder class)로 옮긴다. 바깥쪽 class의 생성자는 private로 선언해서 직접적인 생성을 막는다.
- builder class의 생성자를 public static으로 선언하고 필요한 파라메터들을 요청한다.
- builder class에는 선택적 파라메터에 대한 setter method가 있어야한다. 그리고 선택적 인자를 설정한 후에도 같은 builder object를 리턴해야한다.
- 마지막으로로 클라이언트 프로그램이 요청하는 object를 받을 수 있도록 build method를 만드는데, build method에서는 바깥쪽 class의 생성자가 builder 클래스의 인자를 받을 수 있도록 제공한다.

아래가 builder class의 예제이다.

```java
public class Product {

    // parameters..
    private String name;
    private int price;

    // optional parameter
    private boolean isSell;

    public String getName() {
        return this.name;
    }

    public int getPrice() {
        return this.price;
    }

    public boolean isSellEnabled() {
        return isSell;
    }

    // argument -> ProductBuilder instance.
    private Product(ProductBuilder builder) {
        this.name = builder.name;
        this.price = builder.price;
        this.isSell = builder.isSell;
    }

    public static class ProductBuilder {
        private String name;
        private int price;
        private boolean isSell;

        public ProductBuilder(String name, int price) {
            this.name = name;
            this.price = price;
        }

        public ProductBuilder setIsSellEnabled(boolean isSell) {
            this.isSell = isSell;
            return this;
        }

        public Product build() {
            return new Product(this);
        }

    }
}
```

# 사용 예제

```java
public class main {
    public static void main (String[] args) {
        Product p1 = new Product.ProductBuilder("test상품", 10000).setIsSellEnabled(true).build();
    }
}
```

ProductBuilder가 중접 클래스로 부터 나온 생성자임에 주목하자.