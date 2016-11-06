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
  - db
--- 

# redis 소개

2010년대 이전까지 관계형 데이터베이스를 사용하여 어플리케이션을 제작한다고하면 막을 사람은 아무도 없었다. 그러나 2000년대 중반부터 몇몇 글로벌 서비스가 크게 성공하면서 관계형 데이터베이스를 사용하여 데이터를 처리할 수 없을 만큼의 데이터를 생산하게 되었다. 원인은 관계형 데이터베이스에서 주로 사용하는 B-tree 알고리즘의 한계에 기인한다. 따라서 트랜젝션을 느슨하게 하고 쓰기와 읽기의 속도를 대폭 높힌 실시간 분산 처리를 위한 논문들이 속속 발표되었고 이 노력들에 대한 결과물들이 no-sql이며, redis는 많은 no-sql 중 하나이다.

redis는 고성능 키-값 저장소로 단순히 맵 형식의 저장을 지원하는 것이 아니라 여러가지 데이터 타입을 지원하는 인메모리 데이터 저장소이다.

# redis 설치

## source를 이용하여 설치

```
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
```

위와 같이 입력한 다음 제대로 작동하는지 확인하고 싶다면 `make test`를 입력하여 확인한다. 후에 `src` 폴더에 들어가보면 아래와 같은 실행파일을 확인해볼 수 있다.

- redis-server
- redis-seninel
- redis-cli
- redis-benchmark
- redis-check-aof, redis-check-dump

위의 파일들은 아래의 커맨드를 이용해서 경로를 바꾼다.

- sudo cp src/redis-server /usr/local/bin/
- sudo cp src/redis-cli /usr/local/bin/

또는 `make install`을 이용한다.

# redis server 시작

redis 서버를 띄우려면, `/usr/local/bin/` 폴더 안에 redis-server 바이너리 파일을 옵션 없이 바로 띄울 수 있다. 만약 예를 들어 `/etc/` 폴더 안에 있는 config 파일을 이용해서 서버를 띄우려고 한다면 아래와 같이 입력한다.

```
$ redis-server /etc/redis.conf
```

데몬으로 띄우고 싶다면 아래와 같이 입력한다.

```
$ redis-server --daemonize yes
```

데몬으로 띄운 후에 아래와 같이 입력해보면 정상 작동하는지 확인 할 수 있다.

```
$ redis-cli ping
PONG
``` 

# redis의 데이터 타입

redis에서 사용할 수 있는 데이터 타입은 여러가지가 있다. 이것이 memcached와 가장 큰 차이점이라고 할 수 있다.

## 1. Strings

> 명령어는 [이 곳](http://redis.io/commands#string){:target="_blank"}을 참조한다.

String 데이터 타입은 redis의 가장 기본적인 타입이다. redis에서의 String 타입은 바이너리를 포함하기 때문에 JPEG 또는 직렬화된 Ruby 객체(serialized Ruby object) 등 어떤 데이터라도 set 시킬 수가 있다.

String 타입의 값은 최대 512메가바이트까지 저장이 가능하다.

redis string 데이터 타입에서는 아래처럼 몇 가지 재미있는 기능을 제공한다.

- INCR(INCR, DECR, INCRBY)과 같은 명령을 통해 자동 증가 값을 사용할 수 있다.
- APPEND 명령어를 이용해서 문자열을 추가로 붙일 수 있다.
- GETRANGE와 SETRANGE를 이용해서 해당 범위의 문자열을 리턴할 수 있다. (마치 substring 처럼)
- Encode a lot of data in little space, or create a Redis backed Bloom Filter using GETBIT and SETBIT. (번역점)

## 2. Lists

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

- 소셜 미디어의 타임라인 같은 경우, LPUSH로 새로운 요소를 입력하고, LRANGE를 이용하여 최근 입력된 요소를을 가져올 수 있다.
- LPUSH와 함께 LTRIM을 사용하여 특정 갯수를 초과하지 않는 list를 만들 수 있지만, but just remembers the latest N elements.
- list는 메세지 전달 요소(message passing primitive)로 사용될 수 있다. 유명한 Ruby library인 [Resque](https://github.com/resque/resque)의 백그라운드 작업 생성 과정을 사례로 볼 수 있다.
- 많은 것을 list 데이터 타입과 함께 작업할 수 있으며, list 데이터 타입 역시 많은 명령어와 BLPOP 같은 블럭 명령어를 지원한다.

## 3. Sets

redis의 set는 정렬되지 않은 string의 집합이다. 멤버의 추가와 제거가 가능하며 set 안의 멤버(구성원)들의 존재 여부를 O(1)의 시간복잡도로 확인이 가능하다. (set 안의 멤버의 숫자에 관계없이 일정)

redis의 set은 중복된 이름을 허용하지 않는다. set 데이터 타입에 같은 멤버를 여러번 추가시키면 결국 하나의 멤버만 남는다. 사실상 멤버 추가 연산에는 추가되는 멤버의 존재 여부 검사가 필요 없다는 의미이다.

redis set의 흥미로운 점은 서버사이드에서 set과 set 사이에 집합연산이 가능하다는 점이다. set들의 합집합, 교집합, 차집합을 짧은 시간에 구할 수 있다.

set은 최대 2^32-1(4,294,967,295)개의 멤버를 가질 수 있다.

redis set 데이터 타입에서는 아래처럼 몇 가지 재미있는 기능을 제공한다.

- redis set 데이터 타입을 통해 유니크한 값을 수집할 수 있다. 예를들어 블로그 포스트에 방문하는 IP를 확인하려면 어떻게 해야할까? 간단히 SADD 명령어를 이용하여 처리할 수 있다. 반복된 IP는 입력되지 않을 것이다.
- redis set 데이터 타입을 이용하여 관계를 표현할 수 있다. 예를들어 태깅 시스템을 만든다고 해보자. SADD 명령어를 이용하여 특정 tag 이름으로 모든 ID 값을 지정 할 수 있다. 이렇게 만들어진 데이터는 SINTER 명령어를 이용하여 tag 이름과 관계가 있는 모든 ID를 조회할 수 있다.
- SPOP과 SRANDMEMBER 명령어를 이용해서 set 데이터의 랜덤 조회를 할 수 있다.

## 4. Hashes

redis hash는 문자열 키와 문자열 값으로 이루어진 맵이다. 그래서 객체를 표현할떄 최고의 데이터 타입이다.

```
@cli
HMSET user:1000 username antirez password P1pp0 age 34
HGETALL user:1000
HSET user:1000 password 12345
HGETALL user:1000
```

작은 값(수 백개)을 가지는 hash는 매우 작은 공간을 차지한다. 따라서 수백만개의 오브젝트가 있는 경우 redis hash를 이용해 객체로 쪼개서 저장할 수 있다. 

hash는 개당 최대 2^32-1(4,294,967,295)개의 키값 쌍을 가질 수 있다.

## 5. Sorted sets

redis sorted set은 set과 매우 비슷하지만, 비 문자열을 위한 컬렉션이다. 가장 큰 차이점은 sorted set은 모든 맴버가 score(점수) 값을 가지며, 낮은 점수부터 큰 점수까지 정렬을 하는데 사용할 수도 있다. 맴버는 고유값이지만, 점수는 겹칠 수 있다.

sorted set 데이터 타입은 매우 빠른 속도로 add, remove, update 작업을 할 수 있다.(in a time proportional to the logarithm of the number of elements) 정렬된 상태로 요소를 가져올 수 있기 때문에 평균 점수나 등수를 빠르게 가저올 수 있다. sorted set은 중간 요소에 접근하더라도 매우 빠르게 동작하므로, 비 선형이 아니고 빠르게 접근할 필요가 있는 모든 곳에 사용할 수 있는 좋은 데이터 타입이다.(정렬된 요소, 빠른 테스트, 중간 지점을 빠르게 조회할 때)

redis sorted set 데이터 타입에서는 아래처럼 몇 가지 재미있는 기능을 제공한다.

- 실시간으로 새로운 점수가 업데이트되는 거대한 게임의 현황판을 ZADD를 이용하여 만들 수 있다. 또한 ZRANGE를 이용하여 탑플레이어를 뽑을 수 있고, ZRANK로 플레이어의 랭크를 조회할 수도 있다. ZRANK와 ZRANGE를 함께 사용하여 점수가 비슷한 플레이어의 목록을 뽑을 수도 있다. 이 모든 것이 빠르게 연산된다.
- 종종 sorted set은 redis 안에서 정렬된 인덱스 데이터를 저장하기 위해 사용한다. 예를 들어 hash 데이터 안에 다수의 유저 정보가 있는 경우, score를 나이 score로 사용하고 유저 id 값으로 사용한 sorted set을 이용할 수 있다. 이렇게 만들어진 데이터는 ZRANGEBYSCORE 명령어를 이용하여 간단하고 빠르게 사용자들의 나이 간격을 구할 수 있다.

## 6. Bitmaps

string 데이터 타입에 기반을 둔 타입으로 SETBIT, GETBIT을 이용하여 0, 1을 입력 및 출력 받을 수 있다. 약 40억개의 데이터의 상태를 저장하는데 단 512mb 정도만 소모하기 때문에 저장 효율이 좋다.

```
> setbit key 10 1
(integer) 1
> getbit key 10
(integer) 1
> getbit key 11
(integer) 0
```

## 7. HyperLogLogs

HyperLogLog는 [이 글](http://d2.naver.com/helloworld/711301){:target="_blank"}을 한번 읽고 봐야 이해가 쉽다. 즉 약간의 오차율을 허용한다면 hash로 데이터를 처리하는 메모리보다 훨씬 작은 자원으로 키값 쌍의 데이터를 처리할 수 있다. redis에서는 HyperLogLog 알고리즘을 담은 PFADD, PFCOUNT 등의 명령어를 제공한다.

# 원문

- [redis(quickstart)](http://redis.io/topics/quickstart){:target="_blank"}
- [redis(Data types)](http://redis.io/topics/data-types){:target="_blank"}
- [redis(Data types intro)](http://redis.io/topics/data-types-intro){:target="_blank"}
