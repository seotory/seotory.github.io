---
layout: post
title: ruby에서 net/http를 이용한 json api call
date: 2016-03-23  8:59:59 +0900
categories: dev
published: false
comments: false
tags:
- ruby
---

ruby의 제공 모듈인 net/http를 이용하여 json api를 하려면 아래와 같이 작성하여 실행해보면된다. java와는 다르게 매우 쉽게 작성할 수 있다.
<!--more-->

```ruby
require 'net/http'
require 'json'

url = 'https://api.github.com/users/seotory'
uri = URI(url)
response = Net::HTTP.get(uri)

obj = JSON.parse(response)

p obj
```

위의 코드에서 url 부분을 바꾸면 테스트 해볼 수 있을 것이다. 

https 호출인 경우 window 환경이라면 아래과 같은 error가 발생한다. 

```
C:/Ruby22-x64/lib/ruby/2.2.0/net/http.rb:923:in `connect': SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (OpenSSL::SSL::SSLError)
```

이유는 ruby의 기본 라이브러리인 net/http에서 TLS handshake 시 ssl 인증서가 유효한지 체크하지 않기 때문이다. ruby는 라이브러리로 openssl을 이용하고 있으니 아래와 같이 하면 해당 error를 해결할 수 있다.

- [https://gist.github.com/fnichol/867550](https://gist.github.com/fnichol/867550){:target="_blank"}
- [http://www.rubyinside.com/how-to-cure-nethttps-risky-default-https-behavior-4010.html](http://www.rubyinside.com/how-to-cure-nethttps-risky-default-https-behavior-4010.html){:target="_blank"}


OpenSSL uses the SSL_CERT_FILE environment variable.


https://blog.udemy.com/ruby-openssl/
http://ruby-doc.org/stdlib-2.0.0/libdoc/openssl/rdoc/OpenSSL.html