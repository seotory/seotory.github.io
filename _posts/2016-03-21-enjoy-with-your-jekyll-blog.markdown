---
layout: post
title: 당신의 jekyll blog를 더욱 즐기는 방법
date: 2016-03-21 19:11:01 +0900
categories: 
published: false
comments: false
---

문서를 작성해주세요.
<!--more-->

- 현재 글의 이전, 이후 버튼 생성하기
- 작성중인 문서 관리법
- rake를 이용해 markdown 생성하기
- disqus 댓글 카운트 노출
- post에 선택적으로 disqus 댓글 보이기
- image file 관리하기
- jekyll blog에 ssl 적용하기
- uri 전략


작성중인 문서 관리법

```shell
jekyll serve --unpublished
```

이미지 관리

https://gist.github.com/fnichol/867550

```
gem install flickraw
```

- http://blog.pixarea.com/2012/07/fetch-images-from-flickr-to-show-in-octopress-slash-jekyll/
- http://wern-ancheta.com/blog/2013/10/13/getting-started-with-flickr-api/


https://api.flickr.com/services/rest/?
method=flickr.photos.search
&api_key=56517172bcde43971b25a82a2ceaee90
&user_id=139153471@N04
&format=json
&nojsoncallback=1
&extras=url_o


https://api.flickr.com/services/rest/?
method=flickr.photos.getRecent
&api_key=56517172bcde43971b25a82a2ceaee90
&format=json
&nojsoncallback=1
&extras=url_o



https://api.flickr.com/services/rest/?
method=flickr.photos.getRecent
&api_key=56517172bcde43971b25a82a2ceaee90
&photo_id=25961264645
&format=json
&nojsoncallback=1


https://api.flickr.com/services/rest/?
method=flickr.people.getInfo
&api_key=56517172bcde43971b25a82a2ceaee90
&user_id=139153471@N04



https://www.flickr.com/photos/139153471/25961264645 

 
https://api.flickr.com/services/rest/?
method=flickr.photos.getInfo
&api_key=56517172bcde43971b25a82a2ceaee90
&photo_id=25961264645
&format=json
&nojsoncallback=1 
 