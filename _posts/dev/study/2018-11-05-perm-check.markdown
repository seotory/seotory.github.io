---
title: PermCheck 알고리즘 문제풀이
date: 2018-11-05 22:03:51 +0900
description: 
image: 
categories: dev/study
history: false
published: ture
comments: false
tags:
---

> 알고리즘 스터디에서 진행 중인 내용입니다.

# 1. 문제

랜덤 숫자로 이루어진 배열 A가 있다. 이 배열 A가 순열인지 확인하여 순열인 경우에 1을 반환하고 아닌 경우에 0을 반환하는 알고리즘을 작성하라.

```
A[0] = 4
A[1] = 1
A[2] = 3
A[3] = 2
```

위의 배열은 순열

```
A[0] = 4
A[1] = 1
A[2] = 3
```

위의 배열은 순열아님

# 2. 풀이

배열 A.length 만큼의 배열을 하나 더 생성하고(tmp), 배열 A를 순회하며 값(val)을 인덱스로 삼아 `tmp[val-1] = 1`로 저장한다. 후에 tmp 배열을 순회하며 값을 sum한다. sum한 값이 A.length와 같은지 비교하여 1 또는 0을 리턴한다.

```java
static public int solution(int[] A) {
    int[] tmp = new int[A.length];
    for (int i : A) {
        if (i <= A.length) {
            tmp[i - 1] = 1;
        }
    }
    int sum = 0;
    for (int i : tmp) {
        sum += i;
    }
    return sum == A.length ? 1 : 0;
}
```

# 3. 링크

- [문제풀이](https://github.com/seotory/algoStudy/blob/master/src/main/codility/lesson/lesson4/PermCheck.java){:target="_blank"}