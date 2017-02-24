---
layout: post
title: good alternative to many if statements
date: 2017-02-15 10:09:25 +0900
description: 
image: 
categories: dev
published: false
comments: false
tags:
---

http://stackoverflow.com/questions/6536074/is-there-such-a-thing-as-too-many-embedded-if-statements

http://softwareengineering.stackexchange.com/questions/209822/are-too-many-if-else-statements-for-validation-bad

다중 if 문 없애기

```javascript
function hell( type ) {
    if ( type === 'type1' ) {
        console.log('type1의 내용');
    } else if ( type === 'type2' ) {
        console.log('type2의 내용');
    } else if ( type === 'type3' ) {
        console.log('type3의 내용');        
    } else if ( type === 'type4' ) {
        console.log('type4의 내용');
    } else if ( type === 'type5' ) {
        console.log('type5의 내용');
    } else {
        console.log('기본 내용');
    }
}
```

위와 같은 hell 함수는 아래와 같은 map형태를 이용한 아래의 heaven 함수로 고려해본다.

```javascript
var helper = {
    default: function () {
        console.log('기본 내용');
    },
    type1: function () {
        console.log('type1의 내용');
    },
    type2: function () {
        console.log('type2의 내용');
    },
    type3: function () {
        console.log('type3의 내용');
    },
    type4: function () {
        console.log('type4의 내용');
    },
    type5: function () {
        console.log('type5의 내용');
    },
}
function heaven ( type ) {
    helper[ type || 'default' ]();
}
```

