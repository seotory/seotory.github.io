---
title: java composite pattern (컴포지트 패턴)
date: 2017-09-09  8:58:43 +0900
description: 
image: 
categories: dev
history: false
published: true
comments: true
tags:
 - java
---

컴포지트 패턴이란 클래스의 구조적 디자인 패턴으로 단일 객체와 복합 객체를 동일하게 컨트롤 할 수 있게끔 도와주는 패턴이다. 컴포지트 패턴은 아래와 같이 3가지의 요소에 의해 이루어진다.

- **base component**  
    base component는 composition(구성자)을 위한 인터페이스로 구성된다. 클라이언트 클래스에서는 base component의 인터페이스를 사용하여 작업하게 된다. interface 또는 abstract class 그리고 모든 클래스를 위한 약간의 공통 메소드 역시 포함된다.
- **leaf**  
    base component를 구현하는 클래스요소로 이 클래스들을 쌓아올려 하나의 구성물을 만들게 된다. leaf 클래스에서는 base component 외에는 다른 컴포넌트를 섞지 않는다.
- **composite**  
    다수의 leaf 클래스를 컨트롤 할 수 있는 클래스로 인터페이스는 base component부터 얻어 공통된 인터페이스로 작업을 할 수 있는 클래스이다.

# example

간단히 삼각형, 원, 선의 객체 오브젝트를 생성하고 이 모든 객체를 빨강색으로 칠하는 작업을 컴포지트 패턴을 통해서 해보도록 한다.

## base component

뼈대가 되는 클래스로 아래와 같이 draw 메소드를 가지는 인터페이스로 구성되었다. 컴포지트 패턴을 사용하기 위해서는 아래의 클래스를 구현하는 방법으로 진행된다.

```java
public interface Shape {
    public void draw(String color);
}
```

## leaf

위의 base component를 구현하여 만들어진 클래스들이다. leaf로 구성된 클래스를 이용하여 다수의 객체를 생성할 수 있다. 위에서 설명했듯이 base component 외에는 다른 메소드를 사용할 수 없다.

```java
// 삼각형
public class Triangle implements Shape {
    @Override
    public void draw(String color) {
        System.out.print("triangle color: " + color);
    }
}

// 원
public class Circle implements Shape {
    @Override
    public void draw(String color) {
        System.out.print("circle color: " + color);
    }
}

// 라인
public class Line implements Shape {
    @Override
    public void draw(String color) {
        System.out.print("line color: " + color);
    }
}
```

## composite

composite 클래스는 leaf의 객체 그룹을 컨트롤 하는 역활을 한다.

```java
public class Drawing implements Shape {
    private List<Shape> shapes = new ArrayList<Shape>();

    @Override
    public void draw(String color) {
        for (Shape sh : shapes) {
            sh.draw(color);
        }
    }

    // 아래서부터는 헬퍼 성격의 메소드이다. 추가/제거/전체제거
    public void add (Shape s) {
        this.shapes.add(s);
    }

    public void remove (Shape s) {
        this.shapes.remove(s);
    }

    public void clear () {
        this.shapes.clear();
    }
}
```

중요한 점은 composite 클래스 역시 base component를 구현하여 interface를 leaf과 똑같이 한다는 점이다.

# testing

이제 위의 클래스들을 이용하여 컴포지트 패턴을 사용해보고 이해해보도록 하자.

```java
public class Test {
    public static void main(String[] args) {
        Shape t1 = new Triangel();
        Shape t2 = new Triangel();
        Shape c1 = new Circle();
        Shape l1 = new Line();

        Drawing drawing = new Drawing();
        drawing.add(t1);
        drawing.add(t2);
        drawing.add(c1);
        drawing.add(l1);
        drawing.draw("red");

        drawing.clear();

        drawing.add(t2);
        drawing.add(c1);
        drawing.draw("blue");
    }
}
```

## 결과 output

```
triangle color: red
triangle color: red
circle color: red
line color: red
triangle color: blue
circle color: blue
```

# 적용 포인트

- 컴포지트 패턴은 트리 같은 구조가 필요할 때 사용할 수 있다. 
    - 경험상 트리메뉴를 컴포지트 패턴을 이용해서 구성해 보는 것이 도움이 많이된다.
- 컴포지트 패턴은 단일 객체처럼 행동하는 다수의 객체(인터페이스가 똑같거나, 비슷한 객체)가 있는 경우 적용시킬 수 있다.