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