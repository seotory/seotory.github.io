---
title: java adapter pattern (어뎁터 패턴)
date: 2017-09-03 18:20:43 +0900
description: 
image: 
categories: dev
history: false
published: true
comments: true
tags:
 - java
---

adapter pattern은 관계가 없는 인터페이스들이 같이 일할 수 있도록 도와주는 디자인 패턴이다. 이 두 인터페이스를 이어주는 인터페이스를 adapter라 부른다. 아래 예제를 보면서 이해해보도록하자.

# volt class

```java
public class Volt {
    private int volts;

    public Volt(int v) {
        this.volts = v;
    }

    public int getVolts() {
        return this.volts;
    }

    public void setVolts(int volts) {
        this.volts = volts;
    }
}
```

# socket class

```java
public class Socket {
    public Volt getVolt() {
        return new Volt(120);
    }
}
```

# adapter class

volt와 socket클래스를 만들었다. socket 클래스에서는 120v 만 얻을 수 있다. 실생활을 예로 들자면 120v로 부터 12v 와 3v도 얻고 싶다면 어탭터를 끼움으로 volt를 변환 할 수 있다. 마찬가지로 프로그래밍에서도 어뎁터 클래스를 통해서 원하는 volt를 얻을 수 있다. 아래와 같이 어뎁터 클래스를 작성한다.

```java
public interface SocketAdapter {
    public Volt get120Volt();
    public Volt get12Volt();
    public Volt get3Volt();
}
```

이제 위의 어뎁터 클래스를 구현하는 클래스를 작성해보자. 어뎁터 클래스를 구현하는 방법은 2가지가 있다.

# class adapter implementation

```java
public class SocketClassAdapterImpl extends Socket implements SocketAdapter {
    public Volt get120Volt() {
        return getVolt();
    }

    public Volt get12Volt() {
        Volt v = getVolt();
        return convertVolt(v, 10);
    }

    public Volt get3Volt() {
        Volt v = getVolt();
        return convertVolt(v, 40);
    }

    public Volt convertVolt(Volt v, int i) {
        return new Volt(v.getVolts()/i);
    }
}
```

기본적으로 java에서는 다중 상속을 허용하지 않는다. extends와 implements를 동시에 사용함으로써 다중 상속을 흉내내었음에 주목하자. socket을 확장함으로써 socket의 메소드를 별도의 인스턴스 생성 없이 사용할 수 있다.

# object adapter implementation

```java
public class SocketObjectAdapterImpl implements SocketAdapter {

    private Socket sock = new Socket();

    public Volt get120Volt() {
        return sock.getVolt();
    }

    public Volt get12Volt() {
        Volt v = sock.getVolt();
        return convertVolt(v, 10);
    }

    public Volt get3Volt() {
        Volt v = sock.getVolt();
        return convertVolt(v, 40);
    }

    private Volt convertVolt(Volt v, int i) {
        return new Volt(v.getVolts()/i);
    }

}
```

두 번째 방법은 object adapter implementation이다. 위에서 사용되었던 extend 대신에 클래스 내부에서 socket인스턴스를 생성한 것이 가장 큰 차이점이다.
