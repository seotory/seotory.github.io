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

자바스크립트에선 스코프와 컨텍스트가 동일하지 않다. 용어 때문에 헷갈리는 분들도 많이 있었다.

Every function invocation has both a scope and a context associated with it. Fundamentally, scope is function-based while context is object-based. In other words, scope pertains to the variable access of a function when it is invoked and is unique to each invocation. Context is always the value of the this keyword which is a reference to the object that “owns” the currently executing code.


정리할 첫 번째 중요한 점은 컨텍스트와 범위가 동일하지 않다는 것입니다. 나는 수년에 걸쳐 많은 개발자들이 종종 두 가지 용어 (혼자 포함)를 혼동하여 다른 것을 잘못 설명한다는 것을 알아 챘다. 공정하게 말하면, 용어는 수년에 걸쳐 상당히 혼란스러워졌습니다.

모든 함수 호출에는 범위와 연관된 컨텍스트가 있습니다. 기본적으로 컨텍스트는 객체 기반이지만 범위는 함수 기반입니다. 즉, 범위는 호출 될 때 함수의 변수 액세스와 관련이 있으며 각 호출마다 고유합니다. 컨텍스트는 항상 this현재 실행중인 코드를 "소유"하는 개체에 대한 참조 인 키워드 값입니다 .

- this 컨텍스트
- 실행 컨텍스트
JavaScript는 단일 스레드 언어이므로 한 번에 하나의 작업 만 실행할 수 있습니다. JavaScript 인터프리터는 처음에 코드를 실행할 때 기본적으로 전역 실행 컨텍스트로 먼저 들어갑니다. 이 지점에서 함수를 호출 할 때마다 새로운 실행 컨텍스트가 작성됩니다.

이것은 혼동이 종종 발생하는 곳이며, "실행 컨텍스트"라는 용어는 실제로 앞에서 논의한 것처럼 컨텍스트가 아닌 범위를 더 많이 참조하는 모든 의도와 목적을위한 용어입니다. 불행한 이름 지정 규칙이지만 ECMAScript 사양에 정의 된 용어이므로 해당 항목에 다소의 차이가 있습니다.

새 실행 컨텍스트가 만들어 질 때마다 실행 스택 의 맨 위에 추가됩니다 . 브라우저는 항상 실행 스택의 상단에있는 현재 실행 컨텍스트를 실행합니다. 완료되면 스택 맨 위에서 제거되고 컨트롤은 실행 컨텍스트로 되돌아갑니다.

실행 컨텍스트는 생성 및 실행 단계로 나눌 수 있습니다. 생성 단계에서 인터프리터는 먼저 실행 컨텍스트 내에 정의 된 모든 변수, 함수 선언 및 인수로 구성된 변수 객체 ( 활성화 객체 라고도 함 )를 만듭니다 . 여기에서 스코프 체인 이 다음에 초기화되고의 값이 this마지막으로 결정됩니다. 그런 다음 실행 단계에서 코드가 해석되고 실행됩니다.



- 스코프 체인
각 실행 컨텍스트에는 스코프 체인이 결합되어 있습니다. 범위 체인은 실행 스택의 모든 실행 컨텍스트에 대한 변수 개체를 포함합니다. 변수 액세스 및 식별자 확인을 결정하는 데 사용됩니다.

서로 다른 실행 컨텍스트 간의 변수 간의 이름 충돌은 전역 적으로 로컬로 이동하여 범위 체인을 등반하여 해결됩니다. 즉, 범위 체인보다 높은 변수와 같은 이름의 로컬 변수가 우선합니다.

간단히 말하면, 함수의 실행 컨텍스트 내에서 변수에 액세스하려고 할 때마다 룩업 프로세스는 항상 자체 변수 객체로 시작됩니다. 식별자가 변수 객체에서 발견되지 않으면 검색은 범위 체인으로 계속됩니다. 변수 이름과 일치하는 모든 실행 컨텍스트의 변수 객체를 검사하는 범위 체인을 올라갈 것입니다.

# 스트림

http://blog.jeonghwan.net/node/2017/07/03/node-stream-you-need-to-know.html


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

```js
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
```



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


# test~!

https://raygun.com/blog/performance-testing-nodejs-api/

ab 키워드 이용

Usage: ab [options] [http[s]://]hostname[:port]/path
Options are:
    -n requests     Number of requests to perform
    -c concurrency  Number of multiple requests to make at a time
    -t timelimit    Seconds to max. to spend on benchmarking
                    This implies -n 50000
    -s timeout      Seconds to max. wait for each response
                    Default is 30 seconds
    -b windowsize   Size of TCP send/receive buffer, in bytes
    -B address      Address to bind to when making outgoing connections
    -p postfile     File containing data to POST. Remember also to set -T
    -u putfile      File containing data to PUT. Remember also to set -T
    -T content-type Content-type header to use for POST/PUT data, eg.
                    'application/x-www-form-urlencoded'
                    Default is 'text/plain'
    -v verbosity    How much troubleshooting info to print
    -w              Print out results in HTML tables
    -i              Use HEAD instead of GET
    -x attributes   String to insert as table attributes
    -y attributes   String to insert as tr attributes
    -z attributes   String to insert as td or th attributes
    -C attribute    Add cookie, eg. 'Apache=1234'. (repeatable)
    -H attribute    Add Arbitrary header line, eg. 'Accept-Encoding: gzip'
                    Inserted after all normal header lines. (repeatable)
    -A attribute    Add Basic WWW Authentication, the attributes
                    are a colon separated username and password.
    -P attribute    Add Basic Proxy Authentication, the attributes
                    are a colon separated username and password.
    -X proxy:port   Proxyserver and port number to use
    -V              Print version number and exit
    -k              Use HTTP KeepAlive feature
    -d              Do not show percentiles served table.
    -S              Do not show confidence estimators and warnings.
    -q              Do not show progress when doing more than 150 requests
    -l              Accept variable document length (use this for dynamic pages)
    -g filename     Output collected data to gnuplot format file.
    -e filename     Output CSV file with percentages served
    -r              Don't exit on socket receive errors.
    -m method       Method name
    -h              Display usage information (this message)
    -Z ciphersuite  Specify SSL/TLS cipher suite (See openssl ciphers)
    -f protocol     Specify SSL/TLS protocol
                    (SSL3, TLS1, TLS1.1, TLS1.2 or ALL)

## 시스템 체크

https://blog.outsider.ne.kr/1238

https://nodejs.org/en/docs/guides/simple-profiling/

http://themainframe.ca/install-htop-on-mac-os-x-with-homebrew/
https://artillery.io/
https://medium.com/techracers/load-testing-a-nodejs-socket-io-application-with-artillery-916275003e0f