---
title: webpack으로 nodejs 서버사이드 개발시 옵션
date: 2017-08-18 11:00:08 +0900
description: 
image: 
categories: dev/javascript
history: false
published: true
comments: true
tags: 
 - webpack
 - nodejs
---

webpack으로 nodejs server-side를 작성하려고 하니까 모듈 exports나 기타 모듈 관계 생성이 잘 동작하지 않는다. webpack의 기본 옵션은 front-side로 맞춰져 있기 때문이다. server-side에서 바로 시작할 수 있게끔 webpack의 가장 중요한 옵션을 정리해본다.

# config file 수정

아래를 참고해서 3부분을 수정하면 바로 server-side용으로 webpack을 이용할 수 있다.

> 옵션 설명 기준은 webpack2 이다.

1. target: 'node'

    기본 값은 `web`이다. 꼭 변경해야한다.  


2. externals: [nodeExternals()]

    여기서 `nodeExternals`을 사용하기 위해서는 추가 npm설치가 필요하다. 아래의 명령어를 입력해서 설치한 후 사용한다. 이 모듈의 도움을 받으면 node_modules 하위에 설치 되어 있는 모든 라이브러리들을 자동으로 입력해준다.

    **설치**
    ```sh
    npm i --save-dev webpack-node-externals
    ```

    **사용**
    ```javascript
    const nodeExternals = require("webpack-node-externals");
    ```

3. output.libraryTarget: 'commonjs2'

    사용중인 라이브러리를 어떻게 exports 시킬지 정하는 옵션이다. 기본으로 `var`가 선택되어 있다. 이 옵션을 `commonjs2`로 사용하면 bundle.js에 아래와 같이 적힌다.

    ```javascript
    /* 1 */
    /***/ (function(module, exports) {

    module.exports = require("socket.io");

    /***/ })
    ```

4.  node 값 추가

    ```js
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        global: true
    }
    ```