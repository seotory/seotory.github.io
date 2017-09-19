# 웹어셈블리 시작하기

http://thecodebarbarian.com/getting-started-with-webassembly-in-node.js.html

# webpack 시작하기

https://hyunseob.github.io/2017/03/21/webpack2-beginners-guide/

# promise 체이닝

http://solutionoptimist.com/2013/12/27/javascript-promise-chains-2/

# json demo server가 필요할때..

https://github.com/typicode/json-server

# javascript, node event queue, test queue

http://meetup.toast.com/posts/89
http://asfirstalways.tistory.com/362

# javascript queue

http://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript

# scope, context

Every function invocation has both a scope and a context associated with it. Fundamentally, scope is function-based while context is object-based. In other words, scope pertains to the variable access of a function when it is invoked and is unique to each invocation. Context is always the value of the this keyword which is a reference to the object that “owns” the currently executing code.

# node fs

```js
const fs = require('fs');
const path = require('path');
const allFilesSync = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file)
            fileList.push(
                fs.statSync(filePath).isDirectory()
                ? {[file]: allFilesSync(filePath)}
                : file
            )
        })
    return fileList;
}
```
```js
const fs = require('fs');
const path = require('path');
const allFilesSync = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            allFilesSync(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    })
    return fileList;
}
```

# promise utils
```js
Promise.serialize = function(arr, func){
    let result = [];
    let s = Promise.resolve();
    arr.forEach((item)=>{
        s = s.then(func.bind(this, item)).then((res)=>{
            result.push(res);
            return result;
        });
    });
    return s;
};

if ( !Promise.prototype.sleep ) {
    Promise.prototype.sleep = function (n) {
        return this.then(function (res) {
            return new Promise(function (s,f) {
                setTimeout(function() { s(res); }, n);
            });
        });
    };
}

if ( !Promise.prototype.spread ) {
    Promise.prototype.spread = function (fn) {
        return this.then(function (args) {
            return Promise.all(args); // wait for all
        }).then(function (args) {
         //this is always undefined in A+ complaint, but just in case
            return fn.apply(this, args); 
        });

    };
}
```

# 간단한 이벤트 어뎁터.

```javascript
let Event = new class {
    constructor () {
        this.vue = new Vue({});
    }

    fire (event, data = null) {
        this.vue.$emit(event, data);
    }

    listen (event, callback) {
        this.vue.$on(event, callback);
    }
}

let eventBus = new Event();
eventBus.fire('click', {data: 'test'})
eventBus.listen('click', ()=>{
    console.log('click');    
});

```


# 클러스터링 예제

https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917


# cluster~

```javascript 
import os from "os";
import net from "net";
import cluster from "cluster";
import farmhash from "farmhash";

// node socket.io 를 cluster로 띄우면 handshake를 못함.....
// 이유는 socket.io는 http 프로토콜이기 때문.
// 해결하기 위해서는 공식적으로 https://socket.io/docs/using-multiple-nodes/ 이 문서를 참조 하지만 
// 이것 또한 우리 서버에는 사용할 수 없다.
// 그냥 직접 구현함.
export function use ( http, option ) {
    if ( cluster.isMaster ) {
        console.log(`master: ${process.pid} started`);

        let workers = [];
        let spawn = function ( i ) {
            workers[i] = cluster.fork();
            // 워커가 죽으면 다시 살림 - 작동안해서 주석
            // if ( option.workerReSpawn ) {
            //     cluster.on('exit', function ( worker, code, signal ) {
            //         console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
            //         spawn(i);
            //         if ( onWarkerReCreatedFunc ) {
            //             onWarkerReCreatedFunc(i, workers[i]);
            //         }
            //     });
            // }
        }

        for ( let i = 0 ; i < option.workerCnt ; i++ ) {
            spawn(i);
        }
        
        // ip를 기반으로 분배시키는 로직
        let worker_index = function ( ip, len ) {
            return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
        };
        
        net.createServer({ pauseOnConnect: true }, function ( connection ) {
            let idx = worker_index(connection.remoteAddress, option.workerCnt);
            console.log(`attected socket idx: ${idx}/${workers.length-1}, ${connection.remoteAddress}`);

            let worker = workers[idx];
            worker.send('sticky-session:connection', connection);
        }).listen(option.port);
        
        // cluster.on('exit', (worker, code, signal) => {
        //     console.log(`worker ${worker.process.pid} died`);
        // });

        if ( onMasterCreatedFunc ) {
            onMasterCreatedFunc(workers);
        }

    } else {
        console.log(`Worker ${process.pid} started`);
        process.on('message', function ( message, socket ) {
            if ( message !== 'sticky-session:connection' ) {
                return;
            }
            
            if ( socket ) {
                // master -> worker 데이터 전송
                http.emit('connection', socket);
                socket.resume();
            }
        });

        if ( onWarkerCreatedFunc ) {
            onWarkerCreatedFunc(cluster.worker);
        }
    }
}

// 추가작업을 위한 이벤트 함수
let onMasterCreatedFunc, onWarkerCreatedFunc, onWarkerReCreatedFunc;

export function onMasterCreated (func) {
    onMasterCreatedFunc = func;
}

export function onWarkerCreated (func) {
    onWarkerCreatedFunc = func;
}

export function onWarkerReCreated (func) {
    onWarkerReCreatedFunc = func;
}
```




https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/
https://blog.coderifleman.com/2014/11/15/javascript-and-async-error/


function errorHandler (...args) {
    try {
        args[0].apply(this, args.slice(1, args.length));
    } catch ( e ) {
        let req = args[1];
        let res = args[2];
        console.error(e);
        console.error(e.stack);
        res.write('server error.');
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end();
    }
}




```js
/**
 * 간단한 http용 라우터 작성, 
 * web framework 사용안한다면 아래 코드로 충분
 */
import http from "http";
import querystring from "querystring";

let routerSet = {}

/**
 * 컨트롤러를 꺼내온다.
 * @param {string} path 
 * @returns {(req: http.IncomingMessage, res: http.ServerResponse, data) => void} 
 */
function getController ( path: string ): (req: http.IncomingMessage, res: http.ServerResponse, data?) => void|Promise<any> {
    return routerSet[path];
}

/**
 * 컨트롤러를 셋팅한다.
 * @export
 * @param {string} path 
 * @param {(req: http.IncomingMessage, res: http.ServerResponse, data) => void} func 
 */
export function addController ( path: string, func: (req: http.IncomingMessage, res: http.ServerResponse, data?) => void|Promise<any> ): void {
    console.info(`[router] add controller - ${path}`);
    routerSet[path] = func;
}

/**
 * 라우터를 설정한다.
 * @export
 * @param {(string|{})} prefix 
 * @param {{}} [controllers] 
 */
export function setRouter ( prefix: string|{}, controllers?: {} ) {
    if ( !controllers ) {
        controllers = <{}>prefix;
        prefix = '';
    }
    let funcNames = Object.keys( controllers );
    funcNames.forEach((funcName) => {
        let path = `/${prefix}` + (funcName == 'index' ? `` : `/${funcName}`);
        addController( path.replace(/\/\//ig, '/'), controllers[funcName] );
    });
}

/**
 * http.createServer 메소드의 인자로 이 router가 들어간다.
 * @export
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
export function router ( req: http.IncomingMessage, res: http.ServerResponse ): void {

    let url = req.url.length > 1 && req.url.endsWith('/') 
            ? req.url.substr(0, req.url.length-1) 
            : req.url;
    let controlFunc = getController( url ); // req.url과 100% 매칭 찾는다.

    if ( ! controlFunc || typeof controlFunc != 'function' ) {
        console.warn(`[${req.method}]${req.url} 404 not found.`);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end();
    } else {
        console.info(`[${req.method}]${req.url} found.`);
        if ( req.method == 'POST' ) {
            post( controlFunc, req, res );
        } else {
            get( controlFunc, req, res );
        }
    }
}

/**
 * req.method == post
 * @param {any} controlFunc 
 * @param {any} req 
 * @param {any} res 
 */
function post ( controlFunc, req, res ): void {
    let body = '';
    req.on('data', ( data ) => {
        body += data;
        if ( body.length > 1e6 ) {
            req.connection.destroy();
            res.writeHead(413, {'Content-Type': 'text/plain'});
            res.end();
        }
    });
    req.on('end', () => {
        errorHandler( controlFunc, req, res, querystring.parse(body) );
    });
    req.on('error', ( e ) => {
        serverError(e, req, res);
    });
}

/**
 * req.method != post
 * @param {any} controlFunc 
 * @param {any} req 
 * @param {any} res 
 */
function get ( controlFunc, req, res ): void {
    errorHandler( controlFunc, req, res, null );
}

/**
 * javascript에서 callback으로 들어가는 함수는 
 * error catch가 되지 않음으로 
 * error catch 용 강제 스코프를 만들어준다.
 * @param {any} args 
 */
function errorHandler ( ...args ): void {
    try {
        let result =  args[0].apply(this, args.slice(1, args.length));
        if ( result && result instanceof Promise ) {
            result.catch(( e ) => {
                serverError(e, args[1], args[2]);
            });
        }
    } catch ( e ) {
        serverError(e, args[1], args[2]);
    }
}

/**
 * server error.
 * @param {any} req 
 * @param {any} res 
 * @param {any} e 
 */
function serverError ( e, req, res ): void {
    console.error(e);
    console.error(e.stack);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end();
}

```




```javascript
//simple ajax
function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
```


https://taegon.kim/archives/2535



```javascript
const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const emitter = new Emitter();
const logger = console;

/**
 * Add Error listener
 */
emitter.on('error', (err) => {
    logger.error('Unexpected error on emitter', err);
});

// test the emitter
emitter.emit('error', new Error('Whoops!'));
// Unexpected error on emitter Error: Whoops!
```


# class contructor 에 return promise는 나쁜것인가? 나쁨 매우 나쁨

https://stackoverflow.com/questions/24398699/is-it-bad-practice-to-have-a-constructor-function-return-a-promise

쓸려면 아래와 같이 async-await + promise 조합. 굳.

The beauty of async/await is that errors bubble up implicitly

class MyClass {
  async doEverything() {
    const sumOfItAll = await http.scrapeTheInternet() +
      await new Promise((resolve, reject) =>
        http.asyncCallback((e, result) => !e ? resolve(result) : reject(e)))
    return this.resp = sumOfItAll
  }
}
If limited to ECMAScript 2015 and no async, return promise values:

class ES2015 {
  fetch(url) {
    return new Promise((resolve, reject) =>
      http.get(url, resolve).on('error', reject))
      .then(resp => this.resp = resp) // plain ECMAScript stores result
      .catch(e => { // optional internal error handler
        console.error(e.message)
        throw e // if errors should propagate
      })
  }
}


http://meetup.toast.com/posts/109
javascript aop


https://javascript.info/ 
모던 스크립트.

https://medium.com/@samerbuna/coding-tip-try-to-code-without-if-statements-d06799eed231
if 문 없애기


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
연산자 순서.

array func은 아래와 같은 간단한 형태를 보면 매우 간단하나, 복잡한 구문을 보면 매우 어렵게 느껴진다. 쉬운 array func 부터 복잡한 array func까지 절차적으로 밟아보자.

# 람다.

https://ko.wikipedia.org/wiki/%EB%9E%8C%EB%8B%A4_%EB%8C%80%EC%88%98

# array func

- function에 비해 구문이 짧다.
- 항상 익명이다.
- this, arguments, super, new target을 바인딩하지 않는다.
- 생성자로 사용할 수 없다.

## 문법

array func은 비슷비슷 하지만 결과가 다른 부분이 많기 때문에 간단한 라인이라도 처음에는 꼼꼼하게 보는 것이 좋다.

- 기본 문법

    여기서 리턴이 필요하면 명시적으로 return을 선언한다.

    ```javascript
    // 문법
    (매개변수1, 매개변수2, 매개변수3, 매개변수n) => { 구문 }

    // 리턴이 없는 예
    let test = (a) => { console.log(a) }
    let testVal = test(1); //console.log -> 1
    console.log(testVal) // undefined

    // 리턴이 있는 예
    let test = (a, b, c) => { return a + b + c }
    let testVal = test(1,2,3);
    console.log(testVal) // 6
    ```

- 간결한 리턴 문법

    오른쪽 구문에서 중괄호를 생략하면 array func에서는 자동으로 표현식을 리턴한다. 즉 return 생략이 가능하다.

    ```js
    // 문법
    (매개변수1, 매개변수2, 매개변수3, 매개변수n) => 표현식

    // 예
    let test = (a, b, c) => a + b + c
    let testVal = test(1,2,3);
    console.log(testVal) // 6
    ```

- 매개변수가 하나인 경우 좌측 괄호 생략이 가능

    ```js
    // 문법
    매개변수1 => 표현식
    매개변수1 => { 구문 }

    // 예
    let test = a => a + 10
    let testVal = test(1);
    console.log(testVal) // 11

    let test = a => { return a + 10 }
    let testVal = test(1);
    console.log(testVal) // 11
    ```

- 객체 리터럴을 반환하는 식에는 우측에 괄호를 감쌈

    ```js
    // 문법
    매개변수1 => ({name: 매개변수1})

    // 예
    let test = a => ({aVal: a})
    let testVal = test('에이');
    console.log(testVal) // {aVal: "에이"}
    ```

- 매개변수에 기본값 셋팅이 가능

    ```js
    // 문법
    (매개변수1 = 'default', 매개변수2) => { 표현식 }

    // 예
    let test = (a=10, b) => { return a + b }
    let testVal = test(undefined, 5);
    console.log(testVal); // 15

    // 주의: undefined 대신 null을 입력하면 기본값을 넣지 않는다.
    let testVal = test(null, 5);
    console.log(testVal); // 5
    ```

- 매개변수는 펼침 연산자 사용 가능

    ```js
    // 문법
    (...매개변수n) => { 표현식 }

    // 예
    let test = (...args) => { console.log(args) }
    test(1,2,3,4,5) // console.log -> [1,2,3,4,5]
    ```

- 매개변수에 비구조화된 매개변수 또한 사용 가능

    ```js
    var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
    // 중간과정 해석
    // ([a, b] = [1, 2])  >>  a = 1, b = 2 할당
    // {x: c} = {x: a + b}  >> a+b 를 선 계산 후 오른쪽 x 에 할당, 할당된 x 는 다시 왼쪽 x에 할당되면서 c = 3이 할당
    // 즉 a=1, b=2, c=3 이 됨.
    f();  // 6
    ```

## 특징

가장 중요한 특징은 this, arguments가 자동으로 바인딩이 되지 않는다는 것이다. 보통 일반 func 같은 경우는 아래와 같다.

let scopeTest = {
    run: function () {
        console.log(this);
        console.log(arguments);
    }
}

scopeTest.run();
// {run: ƒ}
// [callee: ƒ, Symbol(Symbol.iterator): ƒ]

하지만 아래와 같이 array func을 이용하면 에러가 발생한다.

let scopeTest = {
    run: () => {
        console.log(this);
        console.log(arguments);
    }
}

scopeTest.run();


let aa = () => { console.log('test'); }

var aa = (...args) => { console.log(args); }

var aa = (...args) => args.map((a)=>console.log(a))

var aa = (...args) => val => args.map((a)=>{console.log(a + val)})
var b = aa(1,2,3,4,5)
b(4)

// 사소하게 다르다!!
var aa = (...args) => val => args.map((a) => {a})
var aa = (...args) => val => args.map((a) => a)


## 주의사항

- 줄바꿈 주의

    화살표 함수는  파라메터와 화살표 사이에 개행 문자를 포함 할 수 없다.
    ```
    // error
    var func = ()
           => 1; // SyntaxError: expected expression, got '=>'
    ````

- 파싱순서 주의

    ```
    let callback;

    callback = callback || function() {}; // ok
    callback = callback || () => {};      // SyntaxError: invalid arrow-function arguments
    callback = callback || (() => {});    // ok
    ```

- undefined 주의

    ```
    let empty = () => {};
    // empty = undefined
    ```

- 매개변수가 없을 시 주의

    ```
    // => { statements } error
    () => { statements }
    ```