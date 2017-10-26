---
layout: post
title: express의 next() 사용해보기
date: 2016-04-28 12:42:41 +0900
description: 
image: 
categories: dev/javascript
published: true
comments: true
tags: 
  - nodejs
  - express
---
express 프레임워크로 관리자 화면을 만든다고 생각해보자. 처음에는 간단히 시작할 예정이라 로그인 기능이 없었다. routes에 controler 하나로 어드민 페이지 매핑을 시키고 있었는데 이제 로그인 기능을 추가하려고 한다. `http://localhost/admin/` 이하 path에 세션 확인 로직이 필요해졌다.

제일 먼저 고려해 볼만한 것은 controler 안의 모든 function에 체크 로직을 넣는 방식이다. 하지만 이런 방법은 관리가 어렵고 추후 수정할때 분명히 문제가 생긴다. 이런 경우에 express `next()` 사용을 고려해 볼 수 있다.

애초에 어드민 페이지와 관련하여 아래와 같이 app.js 의 path가 정의되어 있었다고 생각해보자.

```javascript
app.use('/admin', admin);
```

여기에 모든 세션 체크 로직을 걸고 싶다면 아래와 같이 admin path 진입전에 `app.get()`과 `next()`를 사용하면된다.

```javascript
app.get('/admin/:path?', function(req, res, next){
	console.log('admin contected.. admin path >> ' + req.params.path);
	next(); 
});
app.use('/admin', admin);
```

`get()`에서 url 주소를 획득 및 비교를 하여 `/admin/` 이하 경로를 변수 path로 받는다. `get()`의 두번째 인자로 들어오는 펑션의 로직에 따라 `next()`를 사용해 다음 평션으로 request를 전달 할 수도 있고 특정 url에 매핑시킬 수도 있게 된다.

위의 소스를 수정했다. express-session를 npm을 이용해 설치하고 아래와 같이 router에 middleware를 구성하였다. 위에 사용됬던 `app.get()`은 모든 요청을 감지하기 위해 `app.route().all()` 로 수정되었다.

```javascript
app.route(/^\/admin(?:\/(.*))?$/).all(function(req, res, next) {
	console.log('admin contected.. admin path >> ' + req.params[0]);
	var path = req.params[0] ? req.params[0].replace(/\//ig,'') : '';

	// 로그인 시도시
	if ( path == 'logintry' || path == 'login') {
		console.log('로그인 정보 없음으로 로그인 시도');
		next();
	} else if ( req.session.user ) { // && 
		console.log('로그인 정보 남아 있음.');
		next(); 
	} else {
		console.log('로그인 정보 없음 리다이렉트');
		req.url = '/admin/login';
		next(); 
	}
});
app.use('/admin', admin);
```

참고로 url로 넘어오는 path 중에 `/admin/login`는 로그인 페이지를 띄우는 화면이고, `/admin/login/try`는 실제로 유저가 입력한 패스워드와 DB의 패스워드를 비교하는 로직을 담고 있다. 로그인 성공시에는 session에 값을 추가하게된다.

**2015.09.08 코드 수정본**

잠을 자고 일어나 코드를 살펴보니 마음에 들지 않는다. 일단 로그인 경로가 `/admin/` 경로 이하에 붙어 있다는것 부터가 세션을 체크하는 부분의 복잡성을 가중시킨다고 판단되어, app.js 에 login 만을 위한 router를 하나 더 추가하였다. admin과 login을 분리 시키니 특정 경로를 분기처리하던 로직을 심을 필요가 없어졌다. 특히나 위의 코드는 `/admin/login`은 페이지를 여는데 사용되고, `/admin/login/try`는 실제 로그인 체크로직을 담당하는데, 좀더 restful한 구성을 위해 get method를 통해 `/login/` path로 접근하면 페이지를 열어주고, post method를 통해 `/login/` path를 접근하면 로그인 체크로직을 태우도록 했다. 결과적으로 훨씬 유연해지고, url이 간결해졌다.

```javascript
app.use('/login', login);

app.route(/^\/admin(?:\/(.*))?$/).all(function(req, res, next) {
	var path = req.params[0];
	console.log(path);

	if ( req.session.user ) { 
		console.dir( req.session.user );
		console.log('로그인 정보 남아 있음.');
		next();
	} else {
		var fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
		console.log( fullUrl );
		console.log('로그인 정보 없음 리다이렉트');
		return res.redirect('http://' + req.headers.host + '/login/?redirect=' + fullUrl);
	}
});
app.use('/admin', admin);
```