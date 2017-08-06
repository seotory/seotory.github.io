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