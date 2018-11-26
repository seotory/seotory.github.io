---
title: MissingInteger 알고리즘 문제풀이
date: 2018-11-26 22:39:02 +0900
description: 
image: 
categories: dev/study
history: false
published: ture
comments: false
tags:
---

# 1. 문제

말 그대로 빠진 숫자를 찾는 알고리즘이다. 아래와 같은 함수가 있는데 N 개의 정수 중 A 배열이 주어진다면, A에서 발생하지 않는 가장 작은 양의 정수 (0보다 큼)를 반환한다.

```java
class Solution { public int solution(int[] A); }
```

아래의 경우 결과값은 5이다.

```
A = [1, 3, 6, 4, 1, 2]
```

또 다른 예로 아래의 같은 경우에는 연속된 숫자의 최대값에서 +1 인 4가 된다.

```
A = [1, 2, 3]
```

다른 예로 음수인 경우 양수의 최저값인 1이 결과값이 된다.

```
A = [-1, -3]
```


# 2. 풀이

먼저 A배열을 순회하며 A[idx] 값을 map에 담았다. 그중에서 제일 큰 값을 max 값으로 담았다. 두 번째 순회에서는 max 사이즈만큼 순회하면되고, 순회중에 빠진 숫자가 나온다면 해당 숫자를 리턴하고, 만약 순회의 idx 값이 max 값과 같다면 +1하여 값을 반환하면 해결된다.

# 3. 링크

- [문제풀이](https://github.com/seotory/algoStudy/blob/master/src/main/codility/lesson/lesson4/MissingInteger.java){:target="_blank"}
