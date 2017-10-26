---
layout: post
title: window에서 headless 프로젝트 시작하기
date: 2016-10-24 18:25:20 +0900
description:
image:
categories: dev/etc
published: true
comments: true
tags:
  - phantomjs
  - nodejs
---

이 글까지 찾아왔다면,  설치나 셋팅 문제로 고생을 많이하고 왔을꺼라는 추측이든다. 후.. 나 역시 이 글을 적기까지 꽤 많은 삽질(대략 4일 정도... 아마도 배경지식의 부족)을 했다. 이제 막 window에서 headless project를 시작해 보려 하는 분들을 위해 삽질의 결과물을 글로 써본다.

# 프로젝트 도입 배경

회사 홈페이지에 모니터링 시스템이 필요하게 되었다. 흔히 생각하는 서버 모니터링이 아니다. 서버에 톰켓 인스턴스가 떠있는 상황인데 만약 페이지가 아무것도 출력이 안되는 상황이라고 가정해보자. 서버 모니터링 시스템에서는 인스턴스를 체크하기 때문에 정상이라고 출력 되겠지만 유저 입장에서는 명백한 오류 페이지이다. 이런 페이지들을 빠르게 catch 해서 담당자들에게 알려주는 시스템이 있으면 좋을 것 같다는 아이디어에서 출발하였다.

프로젝트는 시작되었으나 무엇을 어떻게 어디서부터 시작해야 할지 몰랐기 때문에 일단은 구글링을 했다. 처음엔 모니터링이라는 검색어로 검색을 했더니 서버단 모니터링만 주구장창 나와서 한참을 고생을 했다. 그러다가 한줄기 빛 같은 글을 발견! Phantomjs Preview IntroductionTop (Nanha Park님에게 무한한 감사를 드린다.)

phantomjs 와 headless 라는 두 가지 키워드를 알게 되었다. phantomjs 는 webkit engine(qt)를 사용해서 가상의 브라우져를 실행시키게끔 도와준다. 여기서 headless 란 머리가 없는 뜻으로 화면이 없는 즉 화면 없이 테스트 할 수 있는 브라우져라고 생각하면 된다. 구글링을 해보니 보통 headless test 라고 불리는 것 같다.

얼핏 보기에 nodejs 와 비슷한 것 같아서 nodejs headless 를 찾아보니 수많은 정보가 쏟아져 나왔다. 그 중 zombiejs 는 웹킷이 아닌 것 같아 샘플 코드 테스트 중에 중단하고 phantomjs 를 사용하기로 결정했다.

# 설치 및 시작하기

이제 무엇을 사용해서 진행할지가 정해졌으니, 설치를 해보도록 하자. 설치 과정에서 꼬박 2틀 정도가 날라갔다. (역시 배경 지식의 부족) 이 포스팅에서 설치하는 환경은 window7 기준이다.

## 1. nodejs 설치

nodejs 에 접속해서 최신버젼으로 받자. 32bit, 64bit 상관 없으나 32bit 에서 뼈아픈 경험을 했다. (그 이야긴 나중에) 설치 완료가 되면 cmd 창을 띄워서 node와 npm 명령어가 잘 되는지 테스트를 해보자.

```
node --help
npm --help
```

npm은 'node package manager' 의 약자로 의존성에 쥐약인 node의 패키지 문제를 어느정도 해결해주며 javascript 의 생산성을 크게 높인다. npm install 을 이용하여 수많은 모듈을 설치 할 수 있고, node 안에서 해당 모듈들은 require() 함수를 이용하여 사용할 수 있다.

npm은 nodejs 설치시 같이 설치가 되므로 window 에서 따로 설치할 필요는 없다.

## 2. 환경변수 셋팅

제대로 설치가 되었는지 확인이 끝났다면 아래의 정보를 시스템 환경 변수에 추가해야 한다.

변수 이름 - NODE_PATH  
값 - %AppData%\npm\node_modules

환경변수 셋팅을 해주는 이유가 있다. npm install <모듈> 시에 옵션 '-g'를 붙이면 글로벌 모듈이 되어 설치가 되는데, 그 경로는 아래와 같다.

```
C:\Users\{USER}\AppData\Roaming\npm
```

commend line 에서 정상 작동이 되고 node 에서 사용을 할 수 있을려면 위와 같은 셋팅이 필요하다.

## 3. phantomjs 설치

여기서부터 본격적으로 삽질을 한 것 같다. 이유가 있는데 phantomjs 를 nodejs의 모듈이라고 생각하고 작업을 했기때문이다. (역시 무엇을 하든 발상이 중요하다.)

> phantomjs 는 절대 nodejs의 모듈이 아니다!

window에서 phantomjs 설치 방법은 여러가지가 있다.  첫 번째로는 phantomjs 홈페이지로 들어가서 바이너리 파일 (.exe) 파일을 받아다가 특정 위치에 옮겨놓고 환경변수 path 에 등록하는 방법. 두 번째는 git 을 통해 clone 을 받는 방법. 세 번째는 npm이용해서 설치하는 방법이다. 우리는 npm을 이용해서 phantomjs 를 설치하도록 하자. 아래와 같은 명령어를 cmd 창에 입력한다.

```
npm install phantomjs -g
```

phantomjs를 설치하는데 '-g' 옵션을 통해 글로벌 영역에 설치하겠다는 뜻이다. 여기서 나는 또 착각에 빠졌는데 npm을 통해서 phantomjs 를 설치 했기 때문에 nodejs 모듈이 아닌가? 라는 생각이였다. 다시 한번 말하지만

> phantomjs 는 절대 nodejs의 모듈이 아니다!

단지 글로벌 영역에 설치를 하면 commend line 에서 'phantomjs' 라는 명령어를 사용할 수 있고 설치가 간단하기 때문에 이용하는 것이다. nodejs 내에서 require() 함수로는 끌어 올 수 없다. cmd 창을 껏다가 다시 실행시켜서 phantomjs 잘 설치 되었는지 아래 명령어로 확인해보자.

```
phantomjs --help
```

## 4. python 설치

phantomjs 만으로는 충분한 브라우져 테스팅을 할 수가 없다는 문구를 발견해서 casperjs 도 설치하기로 했다. casperjs 는 phantomjs와 python에 의존성을 가지고 있음으로 python을 설치해야 한다. 주의할 점은 2.X 버젼을 설치해야 한다는 점이다.

python 역시 path 에 추가하도록 하자. (나는 2.7.9 버젼을 설치하였다.)

```
C:\Python27;
```

path가 추가되었으면 아래 명령어로 실행이 잘 되는지 확인해보자.

```
python --help
```

## 5. casperjs 설치

casperjs 는 phantomjs (또는 slimerjs:개코엔진) 를 바탕으로 더욱 쓰기 쉽게 만들어진 오픈소스이다. 문법은 역시 javascript 이다. (대세야 역시!) casperjs 는 놀라울 정도로 headless test 를 쉽게 작성할 수 있다. cmd 에서 아래 명령어로 설치하자.

```
npm install casperjs -g
```

npm을 통해 설치했기 때문에 nodejs 의 모듈이 아니냐고 물어보는 분들이 있겠지만 이것 역시 nodejs 모듈이 절대 아니다! 단지 편해서 저렇게 설치하는 것이다. 잘 설치되었는지 아래 명령어로 확인해보자.

```
casperjs --help
```

## 6. test code 작성

셋팅은 모두 완료되었으니 테스트 코드를 작성해보자. 주로 casperjs 의 함수를 사용할 것이다. cmd 창에서 아래 명령어를 입력한다.

```
cd d:
mkdir nodeTest
cd nodeTest
```

nodeTest 폴더에서 js 파일을 2개 만든다. 하나는 nodejs 실행 파일이고, 하나는 casperjs 실행 파일이다.

```javascript
var casperProcess = (process.platform === "win32" ? "casperjs.cmd" : "casperjs");
var spawn = require("child_process").spawn
var child = spawn(casperProcess, ["casper_script.js"])

child.stdout.on("data", function (data) {
	console.log(String(data));
	//console.log("spawnSTDOUT:", JSON.stringify(data))
});
child.stderr.on("data", function (data) {
	console.log("spawnSTDERR:", JSON.stringify(data))
})

child.on("exit", function (code) {
	console.log("spawnEXIT:", code)
})
```

```javascript
var links = [];
var casper = require('casper').create({
	viewportSize: {
		width: 1024,
		height: 768
	}
});

function getLinks() {
	var links = document.querySelectorAll('h3.r a');
	return Array.prototype.map.call(links, function(e) {
		return e.getAttribute('href');
	});
}

casper.start('http://google.fr/', function() {
	var fileLocate = 'screenShotTest/1.jpg';
	this.captureSelector(fileLocate, "html");
	this.fill('form[action="/search"]', { q: 'seotory' }, true);
});

casper.then(function() {
	var fileLocate = 'screenShotTest/2.jpg';
	this.captureSelector(fileLocate, "html");
	links = this.evaluate(getLinks);
	this.fill('form[action="/search"]', { q: 'wordpress' }, true);
});

casper.then(function() {
	var fileLocate = 'screenShotTest/3.jpg';
	this.captureSelector(fileLocate, "html");
	links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
	this.echo(links.length + ' links found:');
	this.echo(' - ' + links.join('\n - ')).exit();
});
```

Nanha Park님의 코드를 일부 사용하여 테스트 코드를 작성하였다. casperjs는 nodejs와는 별개이므로 nodejs의 child_process(추가설명 클릭)를 사용해서 명령을 실행시킨다. 또 한번 여기서 삽질을 했는데, nodejs를 32bit로 깔았다면casperjs가 아닌 'casperjs.cmd' 로 입력해야 실행이 된다는 점이다.(구글에서 산삼을 찾는 심정으로 검색을 했다.)

casperjs 는 사용자가 웹서핑을 하듯이 then을 통해 페이지 이동이 가능하다. 이동시에는 파라메터 전달도 가능하다. 테스트 코드에서는 then으로 페이지 이동을 하면서 스크린샷을 찍었다. (대박이다!)

아래 명령어로 실행시켜 본다.

```
node node_script.js
```

아래와 같은 스크린 샷을 얻었다면 모든 셋팅이 성공적으로 끝난것이다.

![sc1](https://lh3.googleusercontent.com/5rGymOB0AONtY81csAGA7ZvdaygBwR_w4X-j0nr2x7wWD11p5R6gtf9PwCxH4rdx3WYu2teiCHV-eJ-mXKEjSaxwZnLGAWKsyd7svdcUS43TMTUbRj60bpcQMICtowczb6JHaLRbvG-jfsGbCHYkT7d2gRbBtbv4bRKdr1SzVb7Q4gyoFOHN1NscZhphaF1hFRwMiO0Xs6CGqo1PDGJ5Im8a2t961E40-eo9lAtnnGgPtuE9q0iDtNUMleeBCNgkHXjdmOBsNFCL9HublSzSoEia6zRivN5_6I2hTpwUOWUvGWnxdt8tk3tdF_02ArG1-dD7iIoVQkm63vrdXSiC8n7TfR5omBLpiEDa3zg7KaJKex-ym5MvCG29CLrzFtNhTk2vKk03tobn07Pw69cPbHJszvicpfog48Emcp7MKf0t71SxCpE3SzHL1fW_7d9rLjjbAIbVufvzKl1hqcEW5fRbJrBf0eC66ZX01dM4_UsY9iAkfUEfYAbaclysBtoP7VJqzuVgzZzWxAPt_e-7HsKO9RxSwaj6huEOG3shz4XwioaZTTHePWyInOed8iUhFbwLKpFeon5CVt7z_9KHCemhvIbLI5Ra7nekWz1VUTJ6iq0a=s0)

![sc2](https://lh3.googleusercontent.com/WdLCE44dYxgeivGyu-NpEppdrNmo9B2l1ZTSpMrseFL3MqoOhkV7cp5KOR2sECXKJfeFtRaLROLv42zyplC7UVTU9bAhSs3zCzsKIsTWWL7vt_sLEbT2HPm1L0QCMLqRIAOCOiK0EPNicpeQiImRkzqnwfE-vGpPdu1ZGJekEF41SdJ5_f03h4ufJkTMpf6Bl4UdzTHXscJE5Q1cUOGgvVOvibkhw6v-gKb3RXcEhlNeOd2P7gj83M438PF-xKfJ58KVd1e32B__NHjhXsR0iS2GTzKBQQtzazJX9Zx72NCp96HZ8oyAO1Aj_7DKPBMRIe_13XRlzgz5QvVAZsWKZJBA_KWOUlq3Q26sIVDAWKUeDgos1czDqZ1YmA3-ov_Ps9_MXrFdYiIJfIQUgPwtkWkUp0xnsNXmPzjtfdhxnSTGtDhd-ArtpCw6VvsQLQxLePR8p-gemoEJ9olansEja2de1bKLt3SLGc5A6M-rJ76V8vXM-3wijurgQjFQ0Gj9Quva200PyC2EHbUwON659g6V6DmpbfnJe0668UBRYy9HDcNe44Jw0pVZjeHWURH-Cm9u3StqBJ-DpXbSCVrLhUWmXniIQHLmqQqJ2Sf-R7PABPtE=s0)

![sc3](https://lh3.googleusercontent.com/DEyexIya3Few61U0VRADAjy8rxh_sJcQkBvfh9VffXkVwvGJQy-Mrcb2WEtiYAg6XFlV44CqD0IjQq8DraLuubQ_S1WbFTM_M_Ii64yYDQD41F9GXFIsqr81p-iQwVQBBul-pDR8SOJn5-tvAYRJLkJGV2BTC7iMW_4oMfF4S6zTfjweyMhg5lGSzA2x_hjVIA107dhhnBoUI-1lX3a_hleyDXN8ndJ761OACiL6AxKhLN6ENnI230PiSBUzG2DMDsCkBeogetNTvPfYzzxnHupaRJZk4qOA5d3gCGwijufBiBiOrnkLMDY6GvhVq-rObkQAi6m98Vtff1Dt2bjTnR4avHp2zmrtvhED00JMA0ZT54m6SbIBl3iXSxcxC32jIiILOM5zFKoozb3ao23kAStm6hIfxtyI8B9FH3reXsXS47lJGbc7FkupfUOOpNr0SynrfNlbOLOA7kGRVrNkTDF8xMUdtzQylXxPCqflLLSi3oMLVPyMWAH1oWu6HXmMA5Uu1iIgxI7OPR4XV6Es93CC_Q8eELalzA_je0fs6XUkyJCn3rePJ-kKfceh2WDWDMgZg12aCvDjBdFO-QxN3UtUvDeqpZDXV_vynVxaN8QgROJy=s0)

# 모니터링. headless. 성공적.
