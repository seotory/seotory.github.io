---
title: java spring pojo
date: 2017-11-29 14:35:49 +0900
description: 
image: 
categories: dev/java
history: false
published: false
comments: false
tags:
---

Understanding POJOs

POJO means `Plain Old Java Object.` It refers to a Java object (instance of definition) that isn't bogged down by framework extensions.

POJO 란 `Plain Old Java Object.`의 약어이다. 즉 프레임워크를 사용되기 위해 확장된 object가 아닌 순수한 java object를 이야기한다.

For example, to receive messages from JMS, you need to write a class that implements the MessageListener interface.

예를들어, JMS로부터 메세지를 받는다면, MessageListener 인터페이스를 상속받아 구현하는 구현체 클래스를 아래와 같이 작성해야한다.

```java
public class ExampleListener implements MessageListener {

    public void onMessage(Message message) {
        if (message instanceof TextMessage) {
            try {
                System.out.println(((TextMessage) message).getText());
            }
            catch (JMSException ex) {
                throw new RuntimeException(ex);
            }
        }
        else {
            throw new IllegalArgumentException("Message must be of type TextMessage");
        }
    }

}
```

This ties your code to a particular solution (JMS in this example) and makes it hard to later migrate to an alternative messaging solution. If you build your application with lots of listeners, choosing AMQP or something else can become hard or impossible based on biting off this much technical debt.

위와 같이 작업하면 구현체가 특정 솔루션(위의 예제에서는 JMS)에 엮여버리게 되기 때문에 확장성 측면에서 마이그래이션 하기가 어려워진다. 많은 개발자들이 함께 프로젝트를 진행하는 경우 AMQP이나 또다른 솔루션을 선택해서 확장하는 것은 매우 어렵거나 불가능한 작업이 됩니다.

A POJO-driven approach means writing your message handling solution free of interfaces.

POJO 방법으로 개발을 하는 것은 솔루션의 인터페이스로부터 자유로운 메세지 핸들링을 하는 것입니다. 아래처럼

```java
@Component
public class ExampleListener {

    @JmsListener(destination = "myDestination")
    public void processOrder(String message) {
    	System.out.println(message);
    }
}
```

In this example, your code isn't directly tied to any interface. Instead, the responsibility of connecting it to a JMS queue is moved into annotations, which are easier to update. In this specific example, you could replace @JmsListener with @RabbitListener. In other situations, it's possible to have POJO-based solutions without ANY specific annotations.

위의 코드에서 인터페이스를 상속받아 직접적으로 구현되지 않습니다. 대신에 JMS 큐를 사용하는 것은 어노테이션이 책임지게 되었으며 이것을 변경하는 것은 쉽습니다. 예를 들어 `@JmsListener`를 `@RabbitListener`로 변경하는 것입니다. 다른 상황에서는 어떠한 어노테이션 없이 pojo 기반으로 작동해야한다.

This is just one example. It is not meant to illustrate JMS vs. RabbitMQ, but instead the value of coding without being tied to specific interfaces. By using plain old Java objects, your code can be much simpler. This lends itself to better testing, flexibility, and ability to make new decisions in the future.

The Spring Framework and its various portfolio projects are always aiming for ways to reduce coupling between your code and existing libraries. This is a principle concept of dependency injection, where the way your service is utilized should be part of wiring the application and not the service itself.




http://isstory83.tistory.com/94?category=446551