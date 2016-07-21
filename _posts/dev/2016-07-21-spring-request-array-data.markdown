---
layout: post
title:  스프링, request array data 처리하기
date:   2016-07-21 16:04:16
categories: dev
published: false
comments: false
tags: 
- java
- spring
---

회사의 프레임워크가 매우 오래되어서 최근 신규 프레임워크로 작업을 진행 중에 있다. 작업을 하다보니 spring에서 불편한 점이 몇가지 있었는데, 그중 한 가지가 request로 array data가 넘어온 경우 처리하는 방법이다. 이상하게도 이 부분만큼은 스프링이 너무도 불편하게 되어 있다.

# 기존 방법

일반적으로 해결하는 방법에는 2가지가 있다.

## 단일 데이터

```html
<input type="text" name="name" value="이름1"/>
<input type="text" name="name" value="이름2"/>
```

```java
@RequestMapping(value = "test", method = RequestMethod.GET)
public Map<String, Object> test (String[] name) throws Exception {
	for (String str : name) {
		System.out.println(str);
	}
	return null;
}
```

단일 데이터는 정말 어렵지 않다. 생각했던 그대로 데이터가 나온다.

## parameter 가 2가지 이상일 때 기본 전달 방법

```html
<input type="text" name="name" value="이름1"/>
<input type="text" name="name" value="이름2"/>
<input type="text" name="phone" value="010"/>
<input type="text" name="phone" value="011"/>
```

```java
@RequestMapping(value = "test", method = RequestMethod.GET)
public Map<String, Object> test (String[] name, String[] phone) throws Exception {
	for (int i=0 ; i<name.length ; i++) {
		System.out.println("name: "+name+", phone: "+phone);
	}
	return null;
}
```

위의 방법은 단일 데이터를 받는 방법에서 조금 더 생각하여 여러가지 파라메터를 받도록 하였다. 하지만 이 방법은 매우 좋지 않다. 일단 각각의 파라메터 배열들의 길이가 달라질 수 있고, 만약 짧은 배열을 선택하여 `for`문을 사용하게 되면 에러가 발생한다. 

정말로 이 방법이 사용하고 싶다면, 제일 먼저 가장긴 배열의 size를 체크해야하고, index의 값이 짧은 배열에서 에러가 발생하지 않도록 처리를 해야한다. 

사실상 비추천하는 방식이다.

## index를 사용하여 parameter 전달

이번에는 dto를 사용해서 바인딩을 해보자. 스프링에서는 대표적으로 이렇게 사용되고 있다. 먼저는 클라이언트 단에서 parameter를 전달할 때 인덱스 번호를 사용하여 전달 할 수 있다.

```html
<input type="text" name="name[0]" value="이름1"/>
<input type="text" name="name[1]" value="이름2"/>
```

```java

```


