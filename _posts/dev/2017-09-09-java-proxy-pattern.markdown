---
title: java proxy pattern (프록시 패턴)
date: 2017-09-09 10:30:01 +0900
description: 
image: 
categories: dev
history: false
published: true
comments: true
tags:
 - java
---

프록시는 실제로 액션을 취하는 객체를 대신해서 대리자 역활을 해준다. 프록시 패턴을 사용하게 되면 프록시 단계에서 권한을 부여할 수 있는 이점이 생기고 필요에 따라 객체를 생성시키거나 사용하기 때문에 메모리를 절약할 수 있는 이점도 생긴다. 프록시 패턴이 하는 일은 한마디로 자신이 보호하고 있는 객체에 대한 액세스 권한을 제어하는 것이다.

# example

간단한 예제를 통해 좀 더 알아보도록 하자. 이 예제에서는 프록시를 사용함으로써 실제 인스턴스 사용 과정을 관여하고 메모리를 절약하는 방법을 예제로 나타내고 있다.

## main class

실질적으로 사용되는 핵심 코드는 아래의 2가지이다. 하나는 인터페이스고 하나는 인터페이스를 상속받은 클래스이다. 이 상태에서 일반적으로 코딩을 하게 되면 무조건 CommandExcutorImpl를 호출하여 객체를 생성시키는데 이렇게 하면 높은 cost 작업으로 인해 메모리 낭비가 예상된다.

```java
public interface CommandExecutor {
    public void runCommand(String cmd) throws Exception ;
}
```

```java
public class CommandExcutorImpl implements CommandExecutor {
    @Override
    public void runCommand(String cmd) throws IOException {
        // 뭔가 높은 cost의 작업이 필요함.
        Runtime.getRuntime().exec(cmd);
        System.out.println("cmd: " + cmd);
    }
}
```

## proxy class

위의 단점을 보완하기 위에 프록시 클래스를 작성하였다. 일단 똑같은 인터페이스를 상속받음으로 인터페이스의 일관성을 유지한다. 그리고 생성자에서 CommandExcutorImpl 클래스를 인스턴화 시키고, 인스턴스화 된 executor 객체의 runCommand 메소드를 프록시 클래스의 runCommand 메소드에서 액세스를 결정한다.

```java
public class CommandExecutorProxy implements CommandExcutor {
    private boolean isAdmin;
    private CommandExecutor executor;

    public CommandExecutorProxy(String user, String pwd) {
        if ( "seotory".equals(user) && "pw".equels(pwd) ) {
            isAdmin = true;
        }
        executor = new CommandExcutorImpl();
    }

    @Override
    public void runCommand(String cmd) throws Exception {
        if (isAdmin) {
            executor.runCommand(cmd);
        } else {
            if (cmd.trim().startsWith("rm")) {
                throw new Exception("rm is only admin");
            } else {
                executor.runCommand(cmd);
            }
        }
    }
}
```

# test

```java
public class ProxyPatternTest {
    public static void main(String[] args) {
        CommandExcutor executor = new CommandExecutorProxy("seotory", "is_not_pw");
        try {
            executor.runCommand("ls -al");
            executor.runCommand("rm -rf *"); // proxy 클래스에 의해 에러가 날 것이다.
        } catch (e) {
            System.out.println("Exception Message: " + e.getMessage());
        }
    }
}
```

## 결과 output

```
cmd: ls -al
cmd: rm -rf *
Exception Message: rm is only admin
```

즉 위와 같이 프록시를 작성하면 인터페이스를 일관성있게 유지시키면서 액세스 권한을 부여할 수 있고 더불어 메모리 절약을 할 수 있게 된다.

# 적용 포인트

- **가상 프록시**  
    높은 cost 객체 대신 스켈레톤 객체(인터페이스만 존재하고 실제로 인스턴스를 생성하지 않는 객체)를 사용하여 실질적으로 객체가 필요할때까지 높은 cost의 객체 생성을 지연시켜 메모리를 절약할 수 있다.
- **원격 프록시**  
    서로 다른 머신에 있는 객체에 대해 제공할 수 있다(또는 객체를 사용할 수 있다). 일반적인 예는 JAVA의 RMI이다.
    - http://www.informit.com/articles/article.aspx?p=1398608&seqNum=3
- **보호 프록시**  
    객체에 대해 액세스 할 수있는 권한을 부여할 수 있다.
- **정교한 참조**  
    프록시 객체에 정교한 작업을 부여할 수 있다. 예를들어 객체를 생성할 때 카운팅 기능을 추가적으로 작업할 수 있다.

# 패턴 비교

- **어뎁터 패턴**  
    어뎁터 패턴은 실제 오브젝트와 다른 인터페이스를 제공하여 실제 오브젝트를 사용할 수 있도록 도와준다. 그러나 프록시 패턴은 실제 오브젝트와 동일한 인터페이스를 제공한다.
- **데코레이터 패턴**  
    데코레이터 패턴은 런타임에 실제 객체에 동작을 추가한다. 그러나 프록시는 동작을 제어하지 않고 동작을 변경하지 않는다.