---
title: nodejs cluster 프로세스에서 데이터 공유하기
date: 2017-08-29 17:17:54 +0900
description: 
image: 
categories: dev/javascript
history: false
published: true
comments: true
tags:
---

nodejs의 cluster는 기본적으로 child_process의 기능을 바탕으로 만들어졌다. master process와 worker process는 프로세스간 통신할때 일반적으로 사용되는 `IPC`를 사용하여 서로 통신한다. 또한 cluster 모듈을 사용할 때 공식적으로 프로세스간에 공유하는 메모리는 없다. 따라서 같은 메모리 주소값을 참조해서 데이터를 사용하는 방법 역시 없다.

하지만 nodejs cluster로 서비스를 실제 운영하다보면, 프로세스간의 데이터 공유가 필요한 상황이 자주 찾아오게 된다. 일반적으로 해결하는 방법은 공용으로 쓸 수 있는 redis 같은 in memory db를 사용하는 방법이 있다. 

일반적이진 않지만 지금부터 적어볼 `IPC`를 이용한 공유 방법도 있다. 이번에 프로젝트를 하면서 이 방법을 사용해 봤는데 소규모 프로젝트에서는 나쁘지 않은것 같다. 어려운 코드는 아니니 직접 작성해 보도록 한다.

# how to work?

<pre>
┌────────────┐       ┌────────────┐
│   Master   │   ↔   │   worker   │
└────────────┘       └────────────┘
</pre>

위와 같이 clustering이 된 프로세스들이 있다고 가정해본다. 일단 위에서 말한데로 공유 메모리를 통해서 데이터를 받을 수는 없다. 그러나 아래와 같은 과정으로 코드를 작성하면 `IPC` 채널을 이용해서 각각의 프로세스에 같은 데이터를 전달시킬 수 있다.

1. 공유가 필요한 데이터 setting 요청
2. master process로 해당 데이터 전송
3. master process에 데이터 저장
4. master process에서 모든 worker process로 데이터를 broadcast 시킴
5. broadcast로 데이터를 받은 worker process는 해당 데이터를 저장
6. 각 프로세스 내에서 전달받은 데이터 사용

# interface

나는 프로그래밍을 시작할 때 인터페이스를 습관적으로 제일 먼저 고려하는 편이다. 이유는 인터페이스가 잘 설계되면 나중에 프로그램의 크기가 커져도 코드의 내용은 얼마든지 바꿀 수 있기 때문이다. 이번에는 아래의 인터페이스를 목표로 코딩을 한다. 인터페이스의 내용은 매우 간단하다. set, get으로 데이터를 넣고 빼는 역활만 한다.

```javascript
// 데이터 셋팅
globalVal.set('greeting', 'Hi!, from seotory');

// 데이터 사용
globalVal.get('greeting'); // Hi!, from seotory

// 필요에 따라 브로드캐스팅
globalVal.broadcast();
```

# code

아래서부터는 위에서 적었던 방법과 interface 대로 구현한 코드이다. typescript로 작성되었다.

```javascript
// globalVal.ts
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
        broadcast();
    }
}

// 3. 데이터 전파
export function broadcast () {
    if ( cluster.isMaster ) {
        for (const id in cluster.workers) {
            let worker = cluster.workers[id];
            worker.send({
                cmd: 'val:edit',
                data: globalData
            });
        }
    } else {
        process.send({
            cmd: 'val:broadcast'
        });
    }
}

if ( cluster.isMaster ) {
    cluster.on('message', (worker, message) => {
        // 2. 수정 요청 받음
        if ( message.cmd === 'val:edit-request' ) {
            let keys = Object.keys( message.data );
            keys.forEach((key) => {
                globalData[key] = message.data[key];
            });
            broadcast();
        } else if ( message.cmd === 'val:broadcast' ) {
            broadcast();
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

**globalVal.get()**

이 메소드는 일반적으로 getter 역활을 하고 있다.

**globalVal.set()**

데이터 저장 및 동기화 요청을 하는 역활을 한다.

- 12라인에서 데이터 저장
- worker process인 경우 16라인에서 master process로 데이터 전송
- 46라인에서 데이터 받음
- 48라인에서 모든 worker process에 데이터 전송
- 56라인에서 worker process가 데이터 받음
- 57라인에서 데이터 저장

# warning

위의 globalVal.ts를 사용하기 전, 주의사항이 있다.

- worker process 들의 globalData가 항상 같다는 보장은 없다. 동시에 set이 여러번 요청된 경우 `IPC` 채널의 속도에 따라 프로세스간 데이터가 틀어질 수 있다.
- globalData 객체가 전파되는 것임으로 객체 사이즈가 커지면 채널통신 비용이 급격히 커진다.

적절한 사용처를 찾아보자면, 프로세스간에 공유가 필요한 환경변수 같은 데이터들을 set하고 특정 프로세스에서 환경변수가 변경되었을 경우 모든 프로세스의 환경변수를 바꾸는 등의 사용이 적절하다.