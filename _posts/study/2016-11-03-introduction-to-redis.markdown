---
layout: post
title: redis 소개 및 시작
date: 2016-11-03 16:25:20 +0900
description:
image:
categories: study
published: false
comments: false
tags:
  - redis
---

# redis의 데이터 타입

redis에서 사용할 수 있는 데이터 타입은 크게 5가지이다. 이것이 memcached와 가장 큰 차이점이라고 할 수 있다.

## 1. String

> 명령어는 [이 곳](http://redis.io/commands#string){:target="_blank"}을 참조한다.

String 데이터 타입은 redis의 가장 기본적인 타입이다. redis에서의 String 타입은 바이너리를 포함하기 때문에 JPEG 또는 직렬화된 Ruby 객체(serialized Ruby object) 등 어떤 데이터라도 set 시킬 수가 있다.

String 타입의 값은 최대 512메가바이트까지 저장이 가능하다.

redis string 데이터 타입에서는 아래처럼 몇 가지 재미있는 기능을 제공한다.  
- INCR(INCR, DECR, INCRBY)과 같은 명령을 통해 자동 증가 값을 사용할 수 있다.
- APPEND 명령어를 이용해서 문자열을 추가로 붙일 수 있다.
- GETRANGE와 SETRANGE를 이용해서 해당 범위의 문자열을 리턴할 수 있다. (마치 substring 처럼)
- Encode a lot of data in little space, or create a Redis backed Bloom Filter using GETBIT and SETBIT. (번역점)

## 2. List

> 명령어는 [이 곳](http://redis.io/commands#list){:target="_blank"}을 참조한다.

redis의 list는 string의 형태로 되어 있으며, 삽입 순서에 따라 정렬되어 있다. redis의 list에서는 새로운 요소가 list의 head 또는 tail에 삽입이 가능하다.

LPUSH는 새로운 요소를 list의 head에 입력시키고, RPUSH는 새로운 요소를 list의 tail에 입력시킨다. 새로운 list는 하나의 연산자로 부터 키 값에 empty list를 생성하고, 비슷한 원리로 list 연산자에 의해 list가 empty 상태가 되면 키 공간으로부터 해당 키를 제거한다. 이로인해 존재하지 않는 키를 호출하는 경우 list는 빈 공간으로 작동되기 때문에 매우 편리하다.

아래 간단한 list 연산자 사용의 예가 있다.

```
LPUSH mylist a   # now the list is "a"
LPUSH mylist b   # now the list is "b","a"
RPUSH mylist c   # now the list is "b","a","c" (RPUSH was used this time)
```

list는 개당 최대 2^32-1(4,294,967,295)개의 요소값을 가질 수 있다.

list의 주요특징으로 수백만건의 삽입과 삭제가 head와 tail에 일어나더라도 일정한 시간복잡도를 제공한다. head와 tail 근처의 요소에는 매우 빠른 속도로 접근되지만, 매우 큰 list의 중간 지점을 접근하게 되면 O(N)의 연산이기 때문에 느리다.

redis list 데이터 타입에서는 아래처럼 몇 가지 재미있는 기능을 제공한다.  
- 소셜 미디어의 타임라인 모델인 경우, LPUSH를 이용하여 새로운 요소를 입력하고, LRANGE를 이용하여 최근 입력된 요소를을 가져올 수 있다.
- LPUSH와 함께 LTRIM을 사용하여 특정 갯수를 초과하지 않는 list를 만들 수 있지만, but just remembers the latest N elements.
- list는 메세지 전달 요소(message passing primitive)로 사용될 수 있다. 유명한 Ruby library인 [Resque](https://github.com/resque/resque)가 백그라운드 작업 생성 과정을 사례로 볼 수 있다.
- 많은 것을 list 데이터 타입과 함께 작업할 수 있으며, list 데이터 타입 역시 많은 명령어와 BLPOP 같은 블럭 명령어를 지원한다.

## 3. Set

redis의 set는 정렬되지 않은 string의 집합이다. 멤버의 추가와 제거가 가능하며 set 안의 멤버(구성원)들의 존재 여부를 O(1)의 시간복잡도로 확인이 가능하다. (set 안의 멤버의 숫자에 관계없이 일정)

redis의 set은 중복된 이름을 허용하지 않는다. set 데이터 타입에 같은 멤버를 여러번 추가시키면 결국 하나의 멤버만 남는다. 사실상 멤버 추가 연산에는 추가되는 멤버의 존재 여부 검사가 필요 없다는 의미이다.

redis set의 흥미로운 점은 서버사이드에서 set과 set 사이에 집합연산이 가능하다는 점이다. set들의 합집합, 교집합, 차집합을 짧은 시간에 구할 수 있다.

set은 최대 2^32-1(4,294,967,295)개의 멤버를 가질 수 있다.

## 4. Hashes

## 5. List

# 원문

[redis(Data types)](http://redis.io/topics/data-types){:target="_blank"}