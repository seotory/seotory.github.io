---
title: MaxCounters 알고리즘 문제풀이
date: 2018-11-18 20:48:52 +0900
description: 
image: 
categories: dev/study
history: false
published: true
comments: false
tags:
---

# 1. 문제

인자 N과, int 배열 A가 주어진다. N은 새로운 int 배열의 사이즈이고 가칭 tmp 배열이라 칭한다. 배열 A의 요소들이 tmp 배열의 index가 되어 값을 1씩 증가시킨다. 

만약 A의 특정 요소가 N 사이즈보다 크다면 max counter가 발생하여 tmp 배열의 모든 요소를 tmp 배열의 요소중에서 가장 큰 값으로 변환한다.

N이 5로 주어지고, A가 아래와 같이 주어졌다면

```
A[0] = 3
A[1] = 4
A[2] = 4
A[3] = 6
A[4] = 1
A[5] = 4
A[6] = 4
```

tmp 배열은 아래와 같이 증가할 것이다.

```
(0, 0, 1, 0, 0)
(0, 0, 1, 1, 0)
(0, 0, 1, 2, 0)
(2, 2, 2, 2, 2) <- max counter
(3, 2, 2, 2, 2)
(3, 2, 2, 3, 2)
(3, 2, 2, 4, 2)
```

# 2. 풀이

처음 문제를 보고 어렵지 않게 풀기 시작했다. A의 for문 안에서 N보다 큰 요소가 있으면 중첩 for문을 통해 최대값으로 업데이트했다. 정확도는 100%가 나왔지만 퍼포먼스에서 불합격을 받았다. 

한참을 고민하다가 max counter 시점에 maxnum을 저장하고 N사이즈 만큼의 배열을 새로 만들어 0으로 리셋시켰다. 후에 tmp 배열을 loop 돌면서 tmp 배열의 마지막에 저장되어 있던 값과 maxnum을 합하여 결과 제출을 했지만 정확도는 100%, 시간은 타임오버. new int[]가 이렇게 비용이 많이드는 작업이였나 하고 다시금 생각하게되었다.

다시 생각해서 리셋 라인(new int[])을 없애고, A 배열의 loop에서 모든 값을 증가 시킨 후에 미증가분에 대해 마지막 loop에서 처리하였다.

# 3. 링크

- [문제풀이](https://github.com/seotory/algoStudy/blob/master/src/main/codility/lesson/lesson4/MaxCounters.java){:target="_blank"}
