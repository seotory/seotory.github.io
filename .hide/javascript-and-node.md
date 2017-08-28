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

Promise.prototype.sleep = function(n){
    return this.then(function(res){
        return new Promise(function(s,f){
            setTimeout(function(){s(res);}, n);
        });
    });
};

if (!Promise.prototype.spread) {
    Promise.prototype.spread = function (fn) {
        return this.then(function (args) {
            return Promise.all(args); // wait for all
        }).then(function(args){
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

# cluster global val

```javascript
import cluster from "cluster";

let globalData = {};

export function get ( name: string ) {
    return globalData[name];
}

// 1. 수정 요청 보냄
export function set ( name: string, val: any ) {
    globalData[name] = val;

    // 1-1. 워커인 경우 요청을 마스터로 보냄
    if ( cluster.isWorker ) {
        process.send({
            cmd: 'val:edit-request', 
            data: globalData
        });
    // 1-2. 마스터인 경우 바로 브로드캐스트. -> 3. 단계로 넘어감
    } else {
        broadcast(globalData);
    }
}

// 3. 데이터 전파
function broadcast ( data ) {
    for (const id in cluster.workers) {
        let worker = cluster.workers[id];
        worker.send({
            cmd: 'val:edit',
            data: data
        });
    }
}

if ( cluster.isMaster ) {
    cluster.on('message', (worker, message) => {
        // 2. 수정 요청 받음
        if ( message.cmd === 'val:edit-request' ) {
            globalData = message.data;
            broadcast(message.data);
        }
    });
} else {
    process.on('message', function (message) {
        // 4. 전파 받은 후 데이터 수정
        if ( message.cmd === 'val:edit' ) {
            globalData = message.data;
            console.log(`[${process.pid}:globalData:edit] ${JSON.stringify(globalData)}`);
        }
    });
}
```