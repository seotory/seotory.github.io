---
title: 테이프 균형 알고리즘
date: 2018-10-23 20:34:11 +0900
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

숫자의 배열로 이루어진 `A`가 있고, 배열 `A`는 랜덤한 `P` 값에 의해 분리된다. `P` 값을 기점으로 `|좌측의 합 - 우측의 합|` 중 가장 작은 수를 구하라.

P의 조건
- 0 \< P \< N

# 2. 풀이

처음에는 이중 포문을 돌려야 하나 생각했는데, 2n으로 끝낼 수 있을 것 같다. `P`는 1부터 시작한다는 가정 하에 첫번째 `for`문에서 `var1`을 `A[0]`으로 두고 `var2`에는 `A[1]` ~ `A[A.length]` 까지의 합을 구한다.

두번째 `for`문에서 `var1`에는 `A[i]` 값을 더하고, `var2`에는 `A[i]` 값을 빼어, 절대값을 구한 후 가장 작은 수를 찾는다.

# 3. 링크

- [문제풀이](https://github.com/seotory/algoStudy/blob/master/src/main/codility/lesson/lesson3/TapeEquilibrium.java){:target="_blank"}