---
title: 익스플로러 브라우저 close event 감지
date: 2017-10-16 16:31:58 +0900
description: 
image: 
categories: dev/javascript
history: false
published: true
comments: true
tags:
- nodejs
- socket.io
- javascript
---

요즘 socket.io를 이용해서 웹 채팅 화면을 구현중이다. ie 요구사항은 9 버젼부터이다. ie9는 웹소켓을 사용할 수 없어서 폴링방식을 이용하여 통신하는데 아래과 같은 close 상황일 때에 문제가 발생하였다.

- 탭 창이 닫힌 경우
- F5를 눌러서 새로고침 한 경우
- ctrl + r을 눌러서 새로고침 한 경우

당연히 폴링방식이기 때문에 위와 같은 상황에서 제대로 close가 되지않는다. 폴링 방식에서는 클라이언트가 죽었는지 살았는지 http를 통해 체크하기 때문에 즉시 close가 안된다.

일단은 아래와 같이 `window.onunload` 이벤트를 이용해서 작업하였다.

```js
function close () {
    // socket.io close....
}

window.onunload = function () {
    close();
}
```

위와 같이 작성하고 테스트를 해보니 `탭 닫기`, `창 닫기`인 경우에 socket close를 하고 정상 종료되었다. 하지만 F5, ctrl + r 를 눌렀을 때에는 여전히 close가 안되었는데 아래와 같이 꼼수로 해결하였다. (꼼수를 쓰지 않으려면 flash를 이용하는 방법이 있다.)

```js
document.onkeydown = function ( event ) {
    if ( event.keyCode == 116  // F5
        || event.ctrlKey == true && (event.keyCode == 82) // ctrl + r
    ) {
        //접속 강제 종료
        close();
        // keyevent
        event.cancelBubble = true; 
        event.returnValue = false; 
        setTimeout(() => {
            window.location.reload();
        }, 100);
        return false;
    }
}
```