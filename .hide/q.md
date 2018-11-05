# 원시 타입

- 몇 가지 자바 원시 타입의 이름을 지정하고 이 타입이 JVM에서 어떻게 처리되는지 설명하라.

    int(0), char(0), double(0.0), boolean(false), float(0.0), byte(0), long(0), short(0) 8가지로 JVM 자료구조라고도 부른다. 원시타입은 항상 null이 될 수 없다. 초기값을 가지고 있기 때문이다.
    
- 왜 Integer.MIN_VALUE에 대응하는 양수(MAX_VALUE + 1)가 없는가?
    
    2의 보수 때문에 음수가 되어버림 `MIN_VALUE`의 절대값은 없다.

# 객체 이용하기
- 자버에서 객체란 무엇인가?

    위의 원시 타입 이외의 모든 타입(객체)는 참조 객체로 사용된다. 객체는 `상태`와 `동작`으로 구성된다. 개념적으로는 실제 객체와 크게 다르지 않다. 객체는 동작을 통해 상호간에 커뮤니케이션을 하며 필드를 통해 상태를 나타낸다. 이렇게 나타낸 프로그래밍적 문법을 클래스라고 하며 이 클래스는 인스턴스를 통해 객체로 표현할 수 있다.

- final 키워드는 객체 참조에 어떤 영향을 미치는가?

    final 키워드를 선언하면 메모리에 단 한번 할당할 수 있게 된다. 즉 값을 고정시켜 버리는 효과가 있다. 주의할 것은 `List`같은 객체형은 list 안의 값을 고정시키는 것이 아니라 list의 자체 인스턴스의 메모리 주소값을 고정시키는 것이다. 그러므로 객체 참조를 변경할 수 없다. 오해하지 말것.

- 객체의 가시성 수정자(접근제어자)는 어떻게 작동하는가?

    클래스의 캡슐화된 상태와 인스턴스 행동을 조정하는 메소드의 접근을 제어하는 것

    - public: 어디에서든지 접근 가능
    - protected: 메소드는 동일 패키지내의 클래스 또는 해당 클래스를 상속받은 외부 패키지의 클래스
    - none(default): 같은 클래스, 동일 패키지
    - private: 같은 클래스의 모든 인스턴스만 접근 가능

- 메서드와 변수에 사용되는 static 키워드의 역화은 무엇인가?

    static을 선언하게 되면 객체 인스턴스의 맴버가 아니라 클래스의 멤버로써 사용이 된다. 클래스의 이름을 통해 정적 메서드와 정적 변수에 접근한다.

- 다형성과 상속이란 무엇인가?

    다형성: 행동의 특정 타입에 대한 정의를 만들 수 있게 하고, 행동을 구현하는 수많은 다른 클래스들을 갖게 함(상속, Interface, 구현)

    상속: 
    - extends : 부모에서 선언/정의를 모두 하며 자식은 메소드/변수를 그대로 사용할 수 있음
    - implements (interface 구현) : 부모 객체는 선언만 하며 정의(내용)은 자식에서 오버라이딩 해야 함
    - abstract : extends와 interface 혼합. extends하되 몇 개는 추상 메소드로 구현되있음

    현대의 golang 같은 경우에는 is-a, has-a 관계의 문제점을 파악하고 확장타입(kind-of)으로 구성한다. 자바도 요즘은 상속이라고 하지 않고 확장(extands)이라고 한다.

- 객체의 일부 메서드가 오버라이드되었을 때 어떻게 사용되는지 설명하라.

    A -> B B는 A를 상속 받음 
    A a = new B();
    위와 같이 사용하는 이유는 A의 다형성을 살리기 위함이다.

# 자바 배열
- 자바에서는 배열을 어떻게 표현하는가?

    `{""}` <- 이렇게 표현하고 중요한 점은 배열을 객체로 취급한다. 객체이기 때문에 toString()을 호출 할 수 있다. 배열이 객체이기 때문에 참조로 전달된다. (call by ref)

- String은 메모리에 어떻게 저장되는가?

    String은 객체로 표현되는 값 -> char 타입의 배열이다. 또한 변경불가한 객체이다. heap에 저장됨.
    StringBuffer 메소드 마다 sync 키워드가 있어서 스레드에 안전하나 퍼포먼스 안좋음
    StringBuilder buffer와 같지만 

    StringBuffer sb = new StringBuffer();

    sb.append("test"); -> ['t','e','s','t']; -> 

    - header -> (String)주소값
    - body


- String 객체의 값을 변경할 수 있는가?

    아니요.

- 인터닝이란 무엇인가?

    보류

# 제네릭 이행하기
- 컬렉션 API에서 제네릭을 어떻게 사용하는지 설명하라.

    제네릭이란 객체타입정의(매개변수화된 타입)이다. 컬렉션 클래스에서 제네릭을 사용했을 때 컴파일러는 특정 타입반 표함될 수 있게 컬렉션을 제한한다.

    자동 캐스팅이되기 때문에 형 조작을 위한 별도의 작업은 필요하지 않다.

- 주어진 Stack 클래스의 API가 제네릭을 사용하도록 수정하라.

    패스

- 타입의 변화는 제네릭에 어떻게 영향을 미치는가?

    class A {}
    class B extends A {}

    B는 A의 하위타입이다. 그러나 List\<A> List\<B>는 하위타입이 아니다. 이런 경우 제네릭을 사용하려면 아래와 같이 사용한다.

    public static GenericStack\<A> pushAll(final List<? extends A> listOfA){}

- 구상화한다는 건 어떤 의미인가?

    컴파일 시킬때 제네릭형을 참고하여 형을 변환 시킴

# 오토박싱과 언박싱 이해하기

> 오토박싱: int 등등의 원시타입들을 참조객체로 바꾸는 것.  
> 박싱: 참조타입을 원시타입으로 바꾸는 것.

- NullPointerException이 발생하였을 때 원시 타입에 접근할 수 있는가?

    아니요. 원시타입은 null값을 할당할 수 없기 때문에 때문이다.

- 어노테이션을 사용하는 예를 들어라.

    패스

- @Override 어노테이션은 어떤 역활을 하는가?

    컴파일시에 @Override 메소의 존재 여부를 확인 할 수 있다.

# 명명 규칙 이해하기

# 예외 처리하기
- 자바의 예외 처리 구조를 이루는 주요 클래스를 설명하라.

    암기

- 런타임 예외와 확인해야 하는 예외 중 어느 것이 더 좋은가?

    확인해야하는 예외 -> 코드를 보면서 예외를 확인하는것 throws Exception 같은...    
    런타임 예외 -> 실행 중 예외상황 (try/catch/finally)

- 연쇄 예외란 무엇인가?

    장점은 에러의 정확한 의미 전달 및 많은 에러 관련 정보 제공

    아래 코드 참조

    ```
    try {
        // error!
    }catch(IllegalArgroumentException e) {
        throw new IlleaglStateException("Unable to add numbers together", e);
    }
    ```

- try-with-resources문은 무엇인가?

    ```
    try(final FileReader reader = new FileReader("/tmp/dataFile")) {
        final char[] buffer = new char[128];
        reader.read(buffer);
    } catch (IOException) {
        // 
    }
    ```

# 표준 자바 라이브러리 사용하기

- 왜 private인 필드가 변하지 않도록 하기 위해 final 키워드를 선언해야 하는가?

    클래스 안에서 접근이 가능하며 값 변경이 가능하기 때문에 final 키워드를 사용해야 한다. 또한 리플랙션을 사용하면 모든 필드에 접근하고 변경이 가능하기 때문이다.

- 다른 모든 컬렉션 API에서 상속되는 클래스는 어떤 것인가?

    암기

- LinkedHashMap 클래스란 무엇인가?

    맵 데이터의 삽입 순서를 보장한다.

- Hashtable 클래스가 이미 존재하는데 왜 HashMap 클래스를 추가하는가?

    Hashtable은 동기화 할 수 있으며 병렬 처리에 효율적이지만 성능이 저하된다.

# 자바 8
- 자바 8에서 예상되는 새 기능은 무엇인가?

    패스


# 가비지 컬렉션

## 메모리는 어떻게 할당하는가? (구조?)

힙 영역에 메모리를 할당한다.

## 가비지 컬렉션이란 무엇인가?



## 스택과 힙의 차이는 무엇인가?

## JVM의 힙 크기는 어떻게 지정할 수 있는가?

## 자바에서 메모리 누수가 발생할 수 있는가?

# JVM과 자바 사이의 상호작용

## 

# 프레임워크

## spring 3대 요소

1. Ioc/DI(제어관계역전, 의존성주입)
2. AOP(관점지향프로그래밍)
3. Portable Service Abstraction(PSA-포터블서비스추상화)