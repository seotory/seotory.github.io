---
layout: post
title: java factory pattern (팩토리 패턴)
date: 2016-08-28 16:23:51 +0900
description:
image:
categories: dev
published: true
comments: true
tags:
 - java
 - pattern
---

`factory pattern`은 유명한 디자인 패턴 중 하나이다. 이것 역시 JDK 및 우리가 잘 알고 있는 Spring, Struts 프레임워크에 많이 사용되고 있다.

super class와 여러개의 sub class가 있는 상황에서 input이 발생하면 하나의 sub class를 반환해야 할때 `factory pattern`이 사용된다. factory class는 client class로 부터 인스턴스를 생성하는 책임을 가져온다.

# 슈퍼 클래스

factory pattern에서 super class는 interface, abstract class 또는 일반적인 java class가 될 수 있다. 예제에서 super class 로 abstract class를 사용하는데, 테스팅을 위해 toString() method를 오버라이드 하기로 한다.

```java
public abstract class Product {
    public abstract String getName();
    public abstract int getPrice();

    @Override
    public String toString() {
        return "product name : " + getName() + ", price :" + getPrice();
    }
}
```
# 서브 클래스

Product class를 상속받은 Computer와 Ticket class를 구현한다. 아래의 클래스들은 super class 하위의 sub class를 정의 한 것이다.

```java
public class Computer extends Product {
    private String name;
    private int price;

    public Computer (String name, int price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String getName() {
        return this.name;
    }
    @Override
    public int getPrice() {
        return this.price;
    }

    public void toStrig () {
        System.out.println("항목 :: " + this.name + ", 가격 :: "+ this.price);
    }
}
```

```java
public class Ticket extends Product {
    private String name;
    private int price;

    public Ticket (String name, int price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String getName() {
        return this.name;
    }
    @Override
    public int getPrice () {
        return this.price;
    }

    public void toStrig () {
        System.out.println("항목 :: " + this.name + ", 가격 :: "+ this.price);
    }

}
```

# 팩토리 클래스

이제 우리는 super class와 sub class를 사용할 준비가 되었다. factory class를 작성해보자.

```java
public class ProductFactory {
    public static Product getProduct(String type, String name, int price) {
        if ( "ticket".equals(type) )
            return new Ticket(name, price);
        else if ( "computer".equals(type) )
            return new Computer(name, price);
        return null;
    }
}
```

- factory class를 static으로 선언함으로써 singleton을 유지할 수가 있다.
- input 파라메터에 의해 sub class 가 생성되어 리턴된다.

아래는 factory pattern을 활용한 테스트 코드이다.

```java
public class main {
    public static void main(String[] args) {

        Product t1 = ProductFactory.getProduct("ticket", "한국여행", 300000);
        Product c1 = ProductFactory.getProduct("computer", "pc", 1500000);

        System.out.println(t1.toString());
        System.out.println(c1.toString());

    }
}
```
- Factory pattern은 구현체 보다는 인터페이스 코드 접근에 좀더 용의하게 해준다.
- Factory pattern은 클라이언트 클래스로부터 인스턴스를 구현하는 코드를 떼어내서, 코드를 더욱 탄탄하게 하고 결합도를 낮춘다.
- Factory pattern은 구현과 클라이언트 클래스들의 상속을 통해 추상적인 개념을 제공한다.
