---
layout: post
title: java 코딩 테스트 준비
date: 2017-12-03 10:37:02 +0900
description: 
image: 
categories: dev/etc
published: false
comments: false
tags:
---

요즘 신입이고 경력직이고 코딩테스트가 필수인 시대가 되었다.ㅠㅠ 그나마 다행인것은 알고리즘의 실제 구현을 요구하는 곳도 있었지만 대다수는 알고리즘의 난이도보다는 언어 자체를 어떻게 사용하는지에 대한 초첨이 맞춰진 경우가 많은것 같다. 

그러나 java를 안한지 1.5년 정도 되어서..... 머리에서 생각한 것들이 자연스럽게 코딩으로 나오지 않아 문제를 풀면서 매우 당황했었다. 이에 코딩 테스트를 위한 java 문법 정리를 해야겠다는 생각이 들었다. 숙련되어 자연스럽게 사용하면 최선이긴 한데, 지금다니는 회사가 java를 사용하고 있지 않아 외워도 다음날이면 까먹는 기적을 맛보고 있다.

카테고리는 크게 `수학`, `선언`, `변환`, `비교`, `정렬`, `컬렉션`, `연산`, `체크`로 나누었고 틈틈히 추가해볼 생각이다. 코딩 테스트 하면서 이 페이지만 열면 좀 더 쉽게 풀 수 있도록. 그리고 누군가에게 도움이 될 수 있도록.

# 연습사이트

- [프로그래머스](https://programmers.co.kr/learn/challenges)

# 수학

기본적으로 코딩 문제를 풀려면 문제 이해가 되어야 하는데 수학 용어들이 자주 나오므로 생각날때마다 정리하여 추가할 예정이다.

- 소수: 1과 자기 자신 외에 양의 약수가 없는, 1보다 큰 자연수이다.
    ```
50 이하의 소수
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
    ```
- 약수: 어떤 정수를 N이라고 하였을 때 N보다 작거나 같은 값으로 나눈다. 이때 나머지 값이 0인 양의 정수의 모음이다.
- 최대공약수: 두 수의 약수 중에 가장 큰 수
- 최소공배수: 두 수의 배수 중에 가장 작은 수
    ```
 G) A  B
-----------
      a  b
G -> 최대공약수
L = G * a * b -> 최소공배수
A*B = G*L 공식이 성립함
    ```
- 행렬
    - 행렬합(차): 차수가 같아야함, 같은 위치에서 + 또는 -
    - 행렬곱: A와 B 행렬이 존재하고 A의 행의 수와 B의 열의 크기가 같아야 함
        ```
1 2    2 4    1*2+2*3 1*4+2*4    8  10
3 4    3 4    3*2+4*3 3*4+4*4    18 28
        ```

# 선언

코딩 문제에서 자주쓰이는 패키지는 미리 import를 시키자.

```java
import java.util.*;
```

웹 IDE에 따라서 * 기호가 안먹는 경우가 있다. 아래꺼 복사해서 붙이자.

```java
import java.util.Scanner;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.IntStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
// 사용이 안될 수도 있음
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.ArrayUtils;
```

# 변환

## String -> char[]

```java
String text = "text";
char[] textAry = text.toCharArray();
```

## char[] -> String

```java
char[] cAry = {'t','e','x','t'};
Character.toString(cAry[i]);
// or
new String(cAry, 0, cAry.length);
```

## char -> String

```java
char c = 'c';
String.valueOf(c);
// or
Character.toString(c);
// or
new Character(c).toString();
```

## int -> String

```java
String str = String.valueOf(1000); // "1000"
```

## String -> int

```java
int int = Integer.parseInt("1000"); // 1000
```

# 비교

## 소문자, 대문자

```java
char c = "A";
Character.isLowerCase(c); // false
Character.isUpperCase(c); // true
```

## 문자열

```java
"targetText".equals("inputText"); // false
```

# 정렬

## char[] 내림차순, 오름차순, 역순정렬

```java
char[] cAry = {'t','e','x','t'};
Arrays.sort(cAry);
```

```java
char[] cAry = {'t','e','x','t'};
Arrays.sort(cAry);
new StringBuilder(new String(cAry)).reverse().toString();
```

```java
char[] cAry = {'t','e','x','t'};
new StringBuilder(new String(cAry)).reverse().toString();
```

## int[] 내림차순, 오름차순

```java
int[] iAry = {5, 6, 11, 3, 8};
Arrays.sort(iAry);
```

```java
int[] iAry = {5, 6, 11, 3, 8};
Arrays.sort(iAry, Collections.reverseOrder());
```

## String[] 내림차순, 오름차순

```java
String text = "text";
String[] sAry = new String[text.length];
for (int i=0 ; i<text.length ; i++){
    sAry[i] = String.valueOf(text.charAt(i));
}
Arrays.sort(s); // 내림차순
Arrays.sort(s, Collections.reverseOrder()); // 오름차순
```

# 컬랙션

## HashMap

```java
import java.util.HashMap;

HashMap map = new HashMap();
map.put("key", "value");
map.get("key");
map.containsKey("key");
```

## ArrayList

```java
ArrayList list = new ArrayList();
list.getLast();
```

# 연산

## 표준입출력

### 표준입력

예전엔 아래처럼..

```java
BufferedReader br = null;
String input = "";
try {
    br = new BufferedReader(new InputStreamReader(System.in));
    input = br.readLine();
} catch(Exception e) {}
```

최근엔 아래처럼..

```java
Scanner in = new Scanner(System.in);
int i = in.nextInt();  // int
double d = in.nextDouble(); // double
String s = in.nextLine(); // string
```

### 표준출력

```java
System.out.println(input);
```

## 문자열연산

### 문자열에서 특정 문자 찾기

```java
String test = "test";
String.valueOf(test.charAt(0)); // t
```

### 문자열 찾기

```java
String[] names = {"sori","nami","yoon","kim"};
Arrays.asList(seoul).indexOf("yoon"); // 3
```

### 문자열 분해 후 int array 변환

```java
String input = "1,2,3,4,5,6,7,8";
Arrays.stream(input.split(",")).mapToInt(Integer::parseInt).toArray();
```

### 문자열 join

```java
List<String> list = Arrays.asList("foo", "bar", "baz");
String joined = String.join(" and ", list); // "foo and bar and baz"
```

### 문단 엔터

```java
System.getProperty("line.separator"); // \n을 사용하는건 위험하다.
```

## 배열연산

### 배열 값에서 특정 조건으로 걸러내기

```java
int[] array = {5, 9, 7, 10};
int divisor = 5;
Arrays.stream(array).filter(value -> value % divisor == 0).toArray(); // {5, 10};
```

### 연속된 int 배열에서 특정 조건의 합

```java
int num = 40; // 40의 약수의 합 계산
IntStream.range(1, num/2+1).filter(n -> num%n == 0).sum();
```

-> 중복제거
IntStream.of(ar).distinct().toArray();

-> 인트 어레이 조인
int[] arr = new int[] {1, 2, 3, 4, 5, 6, 7};
String result = StringUtils.join(ArrayUtils.toObject(arr), " - ");


## 리스트연산

### 중복제거

HashSet을 사용하면 정렬이 흐트러지기 때문에 LinkedHashSet을 사용한다. 속도면에서 작은 수의 리스트의 경우 손해가 있지만 큰 수이면 의외로 괜찮다.

```java
List<Integer> items = new ArrayList<Integer>();
items.add(1);
items.add(2);
items.add(2);
List<Integer> uItems = new ArrayList<Integer>(new LinkedHashSet<Integer>(items));
// uItems > 1, 2
```

다른 방법으로 아래의 방법이 있다.

```java
List<String> items = new ArrayList<Integer>();
items.add("1");
items.add("2");
items.add("2");
List<String> uItems = items.stream().distinct().collect(Collectors.toList());
```

## 산술연산

### 평균값 구하기

```java
int[] iAry = {4, 2, 8, 11, 35}
Arrays.stream(iAry).average().orElse(0);
// or
IntStream.of(iAry).average();
// or
int sum = 0;
foreach(int i : iAry) {
    sum += i;
}
sum / iAry.length;
```

### 소수점 연산

```java
float f = 0.55555f
DecimalFormat format = new DecimalFormat("0.##");
String str = format.format(f); // 0.55
```

```java
float f = 0.55555f
String str = String.format("%.2f", f); // 0.56 반올림 주의
```

```java
float f = 0.55f
DecimalFormat format = new DecimalFormat("0.00000");
String str = format.format(f); // 0.55000 자리수 마춤
```

### 반올림, 반내림, 버림, 절대값, 루트

```java
Math.round(83.58); // 반올림
Math.ceil(83.58); // 올림
Math.floor(83.58); // 버림
Math.abs(-83.58); // 절대값
Math.sqrt(2); // 루트
```

## 날자연산

- [SimpleDateFormat patterns](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html){target="_blank"}

### date 포맷 변경

문자열 -> Date -> 포맷 변경 -> 문자열

```java
String OLD_FORMAT = "dd/MM/yyyy";
String NEW_FORMAT = "yyyy/MM/dd";

SimpleDateFormat sdf = new SimpleDateFormat(OLD_FORMAT);
Date d = new Date();
try {
    d = sdf.parse("12/08/2010");
} catch(Exception e) {}
sdf.applyPattern(NEW_FORMAT);
sdf.format(d);
```

Date 생성 -> 포맷 변경 -> 문자열

```java
String DATE_FORMAT = "yyyy/MM/dd";
SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
Date date = new Date();
sdf.format(date);
```

## 행렬연산

작성중

## 비트연산

### int to bit string

```java
Integer.toBinaryString(10); // "1010"
// 자릿수 맞추기
String.format("%8s", Integer.toBinaryString(10 & 0xFF)).replace(' ', '0'); // "00001010"
```

### basic

```java
int a = 10;
int b = 6;
// and
a & b; // 0010 (2),  논리곱      -> 양쪽 모두가 1이면 1, 아니면 0
// or
a | b; // 1110 (14), 논리합      -> 어느 한쪽이라도 1이면 1, 아니면 0
// xor
a ^ b; // 1100 (12), 배타적 논리합 -> 어느 한쪽이 1일때 다른 쪽이 0이면 1, 아니면 0
// not
~a;
```

```
Operator    Name         Example     Result  Description
a & b       and          3 & 5       1       1 if both bits are 1.
a | b       or           3 | 5       7       1 if either bit is 1.
a ^ b       xor          3 ^ 5       6       1 if both bits are different.
~a          not          ~3          -4      Inverts the bits.
n << p      left shift   3 << 2      12      Shifts the bits of n left p positions. Zero bits are shifted into the low-order positions.
n >> p      right shift  5 >> 2      1       Shifts the bits of n right p positions. If n is a 2's complement signed number, the sign bit is shifted into the high-order positions.
n >>> p     right shift  -4 >>> 28   15      Shifts the bits of n right p positions. Zeros are shifted into the high-order positions.
```

# 체크

## 자주쓰이는 체크문

```java
if ( args == null ) return false;
```

> 추가했으면 하는 내용이 있다면 댓글 적어주세요.