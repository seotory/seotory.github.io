---
title: 한번에 개구리 강 건너기 알고리즘
date: 2018-11-12  9:43:15 +0900
description: 
image: 
categories: dev/study
history: false
published: true
comments: false
tags:
---
# 1. 문제

개구리가 X 크기의 강을 건너려고 한다. 1초마다 X의 특정 위치에 나뭇잎이 떨어지는데, 몇 초를 기다리면 개구리는 강을 건널 수 있을까?

**예**

강의 크기가 5이고 아래처럼 나뭇잎이 떨어진다고 가정하면 개구리는 6초만에 강을 건널 수 있다.

```
A[0] = 1
A[1] = 3
A[2] = 1
A[3] = 4
A[4] = 2
A[5] = 3
A[6] = 5
A[7] = 4
```

# 2. 풀이

저번주 문제와 상당히 겹쳐서 어렵진 않았다. A배열과 똑같은 크기의 tmp배열을 만들고 A배열을 for문으로 순회하면서 tmp배열에 값을 체킹해나가며 시간을 계산하였다. 이 문제에서 함정은 개구리가 강을 건너지 못하는 케이스도 있다는 점이 함정인 것 같다.

# 3. 링크

- [문제풀이](https://github.com/seotory/algoStudy/blob/master/src/main/codility/lesson/lesson4/FrogRiverOne.java){:target="_blank"}