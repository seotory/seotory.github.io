---
title: 개구리 점프 알고리즘 문제
date: 2018-10-21  2:02:18 +0900
description: 
image: 
categories: dev/study
history: false
published: true
comments: false
tags:
---

> 알고리즘 스터디에서 진행 중인 내용입니다.

# 1. 문제

개구리가 X 지점부터 Y 지점까지 이동할 때, D의 거리만큼 이동이 가능하다. 이때 최소 점프수를 구하라.

```java
class Solution { public int solution(int X, int Y, int D); }
```

# 2. 풀이

`Y`에서 `X`거리를 빼고, `D`로 나눈 수의 올림값을 구하면 간단히 해결될 것 같다.
단지 이 문제에서의 함정은 int로 계산하는 것이 아닌 double형으로 계산해야 한다는 점이다.

```java
class Solution {
    public int solution(int X, int Y, int D) {
        return (int)(Math.ceil(((double)Y-(double)X)/(double)D));
    }
}
```

# 3. 링크

- [소스 확인](https://github.com/seotory/algoStudy/blob/master/src/main/codility/lesson/lesson3/FrogJump.java){:target="_blank"}