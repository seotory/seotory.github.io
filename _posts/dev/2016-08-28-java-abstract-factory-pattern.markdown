---
layout: post
title: java abstract factory pattern (추상 팩토리 패턴)
date: 2016-08-28 16:41:37 +0900
description:
image:
categories: dev
published: true
comments: true
tags:
 - java
 - pattern
---

abstract factory pattern은 생산적인 디자인 패턴 중 하나로써 좀 더 factory를 좀 더 생산적으로 만들어 낼 수 있다는 점외에는 factory pattern과 매우 비슷하다.

여러분이 java의 factory design pattern에 익숙하다면, 보통은 어떠한 인풋에 대해 factory class안에서 if-else로 다른 sub-class를 반환하는 일련의 과정을 통해 목적을 달성할 것이다.

abstract factory pattern에서는 if-else 구문을 없애고, sub-class마다 factory class를 가지게 하고 Abstract Factory에서는 input factory class를 통해 해당 sub-class를 반환한다. 처음보기에는 factory pattern 과 혼동되지만, 구현된 것을 보면 정말 쉽게 factory pattern과 abstract factory pattern의 차이점을 할 수 있을것이다.

# 슈퍼 클래스와 서브 클래스

이번 포스트에서 전에 사용했던 product, ticket, computer 클래스를 똑같이 사용한다.

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
}
```

# 팩토리 클랙스마다 각각의 서브 클래스

먼저 abstract factory interface(또는 abstract)가 필요하다.

```java
public interface ProductAbstractFactory {
    public Product createProduct();
}
```

createProduct() method 는 super class 격인 Product 인스턴스를 반환한다. 이제 ProductAbstractFactory 인터페이스와 각각의 sub-class를 구현해보자.

sub-class를 위한 factory class를 아래와 같이 비슷하게 만들것이다.

```java
public class ComputerFactory implements ProductAbstractFactory {
    private String name;
    private int price;
    public ComputerFactory(String name, int price) {
        this.name = name;
        this.price = price;
    }
    public Product createProduct() {
        return new Computer(name, price);
    }
}
```

각각의 sub-class는 비슷한 구조를 가진다.

```java
public class TicketFactory implements ProductAbstractFactory {
    private String name;
    private int price;

    public TicketFactory (String name, int price) {
        this.name = name;
        this.price = price;
    }

    public Product createProduct() {
        return new Ticket(name, price);
    }
}
```

# 사용 클래스

이제 클라이언트 클래스에서 sub-class 생성 시점을 제공해주는 사용 클래스를 만들어보자.

```java
public class ProductFactory {
    public static Product getProduct(ProductAbstractFactory product) {
        return product.createProduct();
    }
}
```

위의 클래스는 간단한 클래스이다. getComputer method는 인자로 Computer AbstractFactory를 받고 Product object 를 반환한다. 바로 이곳이 object 구현을 매우 깔끔하게 하는 중요한 포인트지점이다.

# 테스트 클래스

이제 테스트를 위한 class를 아래와 같이이 만들어보자.

```java
public class main {
    public static void main(String[] args) {
        Product com = ProductFactory.getProduct(new ComputerFactory("com1", 2000));
        Product tk = ProductFactory.getProduct(new TicketFactory("공연", 100000));
        System.out.println( com.toString() );
        System.out.println( tk.toString() );
    }
}
```

# abstract factory pattern 사용 장점

- 추상 팩토리 클래스 패턴은 인터페이스 보다는 구조체에 접근할 수 있는 코드를 제공한다.
- 추상 팩토리 클래스 패턴은 확장에 매우 용의한 패턴으로 쉽게 다른 서브 클래스들을 확장할 수 있다.
- 추상 팩토리 클래스 패턴은 기존 팩토리 패턴의 if-else 로직에서 벗어날 수 있게 해준다.

# UML - class 다이어그램

위의 클래스들을 보기 쉽게 UML로 그려보면 아래와 같을 것이다.

![UML](https://lh3.googleusercontent.com/uOLAqhglXbV9pRqKuIhpm2G1oiATCVipse1NNrVFqjqW4Wt5XCRuSn_s1RPUhWBfdUiQeS2NLLNVf0fbsNu7z4_96Q18ZVGi3zUuJfrJWl_UGYM4wuGPSBTmOxqPJCnTaVWkpeXbJj2Gh9mOzZgS7HIReNkLrYokGlOPUa-G1tdAHxBDpNbOhDjMTVHbOCnscQ9hdrhOX4jIIxkOwESsz93ypeN4uQnSGO8xBNC850fk1A5_EMFe7eWSLf8jjnbGe7Xu-VNHnqdxZJN9gxD2LX0UgCtWhBAZEAz7igNLOZmmSnursv2AQfB9ssofa5UA72AIm5KEknAyGq0f4zs7g6QWRv-7XYRNeq2Dqhon-nTiuOrwoKkKZUPr6_SaW0hEWymtG8m_5HseExvt6GDCv6XN-945b3d0ON9SbQ-8ld7_k-qL2EbashpSPGnTHnxL_7_R7oPPKzjOi_SEbQxim0xDSFCTuBedsIWg78l3UQQTeI1u9pklgc1mNslAMQr-zzmqn4BeoNjzKoqDNxfxXBkuYJQWIM66HetmEcMABJbdwQhonSHRpCyhNTN931tu6abfPANheLDMApM51kLVtscu6whljI9Jl0sLyt_CU9873hhp=s0)
