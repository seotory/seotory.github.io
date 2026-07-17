---
title: 10년 묵은 jekyll 블로그를 astro로 옮기기
date: 2026-07-17 21:30:00 +0900
description: ""
category: dev
published: true
tags:
  - astro
  - jekyll
---

이 블로그는 2016년에 `jekyll`로 만들었다. 그리고 거의 손을 대지 않았다. 오랜만에 열어보니 상태가 처참했다.

- `jekyll` 4.2.2 (최신은 4.4.1)
- `jQuery` 3.1.1 — **2016년 버전이다**
- `Bulma` 0.9.3, `FontAwesome` kit
- 구글 애널리틱스는 `analytics.js`, 즉 **2023년에 종료된 UA**

죽은 코드를 붙잡고 있었던 셈이다. 이왕 손대는 김에 `astro`로 갈아엎기로 했다.

이번 포스팅을 간략하게 정리하면 아래와 같은 내용이다.

- `jekyll`과 `astro`의 결정적인 차이
- 글과 URL을 그대로 들고 옮기는 법
- `GitHub Actions`로 자동 배포하는 법
- 그리고 삽질 기록 (이게 본편이다)

# 왜 astro인가

요즘 블로그를 만든다면 선택지는 대략 `astro`, `hugo`, `eleventy` 정도다. `gatsby`는 확실히 저물었다.

`hugo`는 빌드가 빠르고 `jekyll`과 사고방식이 비슷해서 이전이 수월하다. 하지만 `astro`를 골랐다. 기본적으로 JS를 0KB 내보내고, 마크다운 블로그에 필요한 건 다 있고, 무엇보다 컴포넌트로 쪼개진다는 점이 좋았다.

결과부터 말하면 잘한 선택이었다. 다만 **`jekyll`을 쓰던 감각으로 접근하면 반드시 헤맨다.**

# jekyll과 astro의 결정적 차이

## 카테고리 시스템이 없다

`jekyll`에서 카테고리는 **프레임워크가 주는 것**이었다. `_posts/dev/java/` 폴더에 글을 넣으면 알아서 카테고리가 잡히고, `site.categories`로 전역에서 꺼내 쓸 수 있었다.

`astro`에는 그런 게 없다. 카테고리도, 태그도, 시리즈도 없다. 대신 **Content Collections + 스키마**가 있을 뿐이다.

```ts
// src/content.config.ts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(CATEGORY_PATHS),
    tags: z.array(z.string()).default([]),
  }),
});
```

즉 **분류 체계는 네가 설계해라**가 `astro`의 입장이다. 처음엔 불친절하게 느껴졌는데, 쓰다 보니 이게 낫다. 스키마에 `z.enum`을 걸어두면 오타가 빌드에서 잡힌다.

```
category: Invalid input: expected "dev"
```

`jekyll` 시절엔 `categories: devv`라고 오타를 내도 조용히 유령 카테고리가 하나 생겼다. 실제로 이 블로그엔 **글은 있는데 메뉴엔 없는 카테고리**가 하나 있었고, 옮기면서야 발견했다.

## URL도 파일이 결정한다

`jekyll`은 `_config.yml`에 URL 템플릿을 적었다.

```yml
permalink: /post/:title
paginate_path: "/list/:num/"
```

`astro`엔 이런 설정이 아예 없다. **파일을 어디에 두느냐가 곧 URL이다.**

```
src/pages/index.astro                  →  /
src/pages/post/[slug].astro            →  /post/<slug>/
src/pages/list/[page].astro            →  /list/<n>/
src/pages/categories/[...path].astro   →  /categories/<a/b/c>/
```

대괄호가 붙으면 "틀만 있고 실제 값은 코드가 정한다"는 뜻이다. 값은 `getStaticPaths()`가 만든다.

```js
export const getStaticPaths = (async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
});
```

여기서 `post.id`는 파일명이다. 그래서 `2017-09-03-java-builder-pattern.markdown`을 **`java-builder-pattern.md`로 이름만 바꾸면** `/post/java-builder-pattern/`이 그대로 나온다. 날짜는 front matter에 있으니 파일명에 있을 이유가 없다.

페이징도 파일 하나면 된다. 글이 늘면 `/list/4/`는 알아서 생긴다. 21개였던 글을 33개로 늘려서 확인해봤는데, 정말 파일을 안 건드려도 페이지가 따라 생겼다.

# 옮기는 과정

## 글 옮기기

`_posts/**/*.markdown` 44개 중 **실제로 공개된 건 21개**였다. 나머지 23개는 `published: false`, 즉 초안이었다. 그동안 초안을 잔뜩 쌓아두고 살았다는 걸 이번에 알았다.

옮기면서 정리한 것들:

- 파일명에서 날짜 접두사 제거 (위에서 말한 이유)
- `kramdown`의 IAL 문법 제거 — `[링크](url){:target="_blank"}` 같은 것들. `astro`는 이걸 모르니 화면에 **글자 그대로 노출된다**
- `{% raw %}` 래퍼 제거

## 코드 하이라이팅

`rouge`가 `shiki`로 바뀐다. `astro`에 내장이라 설정 한 줄이면 된다.

```js
markdown: {
  shikiConfig: { theme: 'github-light' },
}
```

다만 **언어를 지정하지 않은 코드블록은 색이 안 입혀진다.** 이건 `rouge`도 마찬가지였으니 손해는 아닌데, 나중에 이것 때문에 한참 헤맨다. (후술)

# 배포

`GitHub Pages`는 `jekyll`만 자동으로 빌드해준다. `astro`는 `GitHub Actions`로 직접 빌드해서 올려야 한다.

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
        with:
          node-version: 22
  deploy:
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

그리고 **저장소 설정에서 Pages 소스를 바꿔야 한다.** `Settings > Pages > Source`를 `Deploy from a branch`에서 **`GitHub Actions`로** 변경. 이걸 안 하면 워크플로가 성공해도 사이트는 그대로다.

# 삽질 기록

여기서부터가 본편이다.

## node 버전이 안 맞는다

첫 배포가 바로 터졌다.

```
Node.js v20.20.2 is not supported by Astro!
Please upgrade Node.js to a supported version: ">=22.12.0"
```

`withastro/action`은 기본으로 `node` 20을 쓰는데, `astro`는 22.12 이상을 요구한다. 공식 액션인데 기본값이 안 맞는다. 위 워크플로에 `node-version: 22`가 들어간 이유다.

## 갑자기 블로그가 어두워졌다

`Bulma`를 0.9.3에서 1.0.4로 올렸더니 블로그가 시커멓게 변했다.

**`Bulma` 1.0부터 `prefers-color-scheme`을 자동으로 따라간다.** 0.9까지는 그런 거 없이 항상 흰 바탕이었다. OS를 다크모드로 쓰는 사람에겐 사이트가 다크모드로 나온다. 기능이지 버그가 아니다.

원래대로 흰 바탕을 고정하려면 이렇게 하면 된다.

```html
<html data-theme="light">
```

## 애드센스 광고가 사라졌다

이게 제일 재미있었다.

광고가 안 나오길래 코드부터 의심했다. 그런데 파보니 전부 멀쩡했다. 로더도 붙고, `<ins>` 태그도 있고, `push()`도 호출되고, `ads.txt`도 200으로 응답했다. 요청이 구글까지 갔는데 구글이 **`data-ad-status="unfilled"`**, 즉 "줄 광고 없다"고 답하고 있었다.

애드센스 콘솔을 열어봤다. 사이트 목록에 등록된 도메인이 `blog.seotory.com`이 아니라 **`seotory.com`**이었다. 그리고 상태는 이랬다.

```
승인 상태: 주의 필요
상태 세부정보: 사이트 소유권을 확인할 수 없음, 사이트가 다운되었거나 사용할 수 없음
Ads.txt 상태: 찾을 수 없음
```

루트 도메인이 죽어 있었던 것이다. DNS를 확인해보니 이랬다.

```sh
$ dig +short A seotory.com
192.30.252.153      # 폐기된 옛날 GitHub Pages IP
```

`http`로는 404, `https`는 아예 연결 실패. 언젠가 apex 도메인을 방치했고, 애드센스는 소유권 확인에 실패했고, **도메인 전체(하위 `blog.` 포함)에 광고가 끊긴** 것이다. 블로그 코드는 처음부터 아무 잘못이 없었다.

그럼 `blog.seotory.com`을 새로 등록하면 되지 않나 싶었는데, 안 된다.

```
URL은 올바른 최상위 도메인이어야 합니다.
```

**애드센스는 apex 도메인만 등록할 수 있다.** 하위 도메인은 apex에 딸려가는 구조다. 그러니 `seotory.com`을 살리는 것 외엔 방법이 없다.

다행히 DNS가 `cloudflare`에 있어서 호스팅 없이 해결했다.

1. DNS에서 apex `A` 레코드를 `192.0.2.1`(라우팅되지 않는 예약 IP)로 바꾸고 **프록시를 켠다**
2. `Page Rules`로 `seotory.com/*` → `https://blog.seotory.com/$1`, 301

여기서 **`$1`이 핵심**이다. 이게 없으면 전부 홈으로 가버려서 `seotory.com/ads.txt`가 블로그의 `ads.txt`에 도달하지 못한다. ads.txt 규격은 리다이렉트를 허용하기 때문에, 경로만 살아있으면 구글이 따라와서 읽는다.

```sh
$ curl -sI https://seotory.com/ads.txt | grep -i location
location: https://blog.seotory.com/ads.txt
```

그리고 애드센스에서 `Ads.txt 스니펫` 방식으로 확인을 눌렀더니 **`Ads.txt 상태: 승인됨`**으로 바뀌었다. 코드는 한 줄도 안 고쳤다.

## Tailwind Typography가 백틱을 붙인다

`Bulma`가 자꾸 발목을 잡길래 결국 `tailwind`로 갈아탔다. 마크다운 본문은 `@tailwindcss/typography`의 `prose`가 처리한다. 편한데 기본값이 좀 이상하다.

**첫째, 인라인 코드에 백틱을 붙인다.**

화면에 `` `array func` `` 처럼 백틱이 그대로 보이길래 마크다운이 깨진 줄 알았다. 아니었다. HTML은 멀쩡한 `<code>array func</code>`였고, `prose`가 **CSS로** 백틱을 그려넣고 있었다.

```css
.prose :where(code)::before { content: "`" }
.prose :where(code)::after  { content: "`" }
```

끄면 된다.

```css
:where(code)::before,
:where(code)::after { content: none; }
```

**둘째, 코드블록이 어둡다고 가정한다.**

`prose`의 기본 코드블록은 어두운 배경 + 밝은 글자다. 나는 배경만 밝게 바꿔놨는데, 그러니 **언어를 지정하지 않은 코드블록만** 밝은 글자 그대로 남아서 안 보이게 됐다. 언어를 지정한 블록은 `shiki`가 인라인 스타일로 색을 박아넣어서 멀쩡했고. 그래서 "얘만 이상하다"는 현상이 나온다.

`prose`가 쓰는 변수를 바꿔주면 된다.

```css
--tw-prose-pre-bg: #f6f8fa;
--tw-prose-pre-code: #24292e;
```

## 리다이렉트가 카테고리를 가로챈다

카테고리를 `dev/java`, `dev/javascript` 식으로 잘게 나눠 썼는데, 세어 보니 **글 21개가 전부 `dev/*` 아래**였다. 100%인 분류는 아무것도 걸러주지 못한다. 게다가 메뉴에는 있는데 글이 0개인 카테고리, 글은 있는데 메뉴에 없는 카테고리까지 있었다. 전부 `dev` 하나로 합쳤다.

사라지는 옛 카테고리 URL 19개는 `astro`의 `redirects`로 넘겼다.

```js
redirects: {
  '/categories/dev/java': '/categories/dev/',
  // ...
}
```

그런데 여기 함정이 있다. 나중에 `dev/java`를 **다시 살리면**, 리다이렉트가 실제 카테고리 페이지를 조용히 가로챈다. 경고도 없다. 실험해보니 글 목록 대신 리다이렉트 스텁이 나왔다.

그래서 리다이렉트 목록을 정적으로 두지 않고, **현재 살아있는 카테고리는 자동으로 빠지게** 만들었다.

```js
const categoryRedirects = Object.fromEntries(
  RETIRED_CATEGORY_PATHS
    .filter((p) => !CATEGORY_PATHS.includes(p))   // 부활하면 알아서 빠진다
    .map((p) => [`/categories/${p}`, '/categories/dev/']),
);
```

참고로 `GitHub Pages`는 정적 호스팅이라 **진짜 301을 못 낸다.** `astro`의 `redirects`는 `meta refresh` + `canonical` 페이지를 만들어준다. 제대로 된 301이 필요하면 `cloudflare`에서 처리해야 한다.

## 한글 폰트가 지정되어 있지 않았다

이건 `jekyll` 시절부터 있던 문제인데 이제야 발견했다.

`Bulma`의 기본 폰트 스택은 이렇다.

```
Inter, "SF Pro", "Segoe UI", Roboto, ... , sans-serif
```

**한글 글꼴이 하나도 없다.** 그래서 한글은 목록을 전부 통과해서 맨 끝 `sans-serif`로 떨어지고, OS가 알아서 고른 폰트로 렌더된다. 맥은 Apple SD Gothic Neo, 윈도우는 맑은 고딕. 영문은 Inter, 한글은 딴 폰트. 글의 90%가 한글인 블로그에서 이러고 있었다.

`_sass`를 열어보니 더 웃겼다. `NanumBarunGothic`을 `@font-face`로 정의는 해뒀는데 **어디에도 적용하지 않았다.** 폰트 파일만 저장소에 얹고 다닌 것이다.

`Pretendard`로 해결했다. 라틴과 한글을 한 폰트로 덮고, 라틴 메트릭이 Inter와 호환이라 영문 느낌은 그대로 간다.

```css
--font-sans: 'Pretendard Variable', Pretendard, -apple-system, ...;
```

dynamic subset 빌드를 쓰면 한글 영역을 90여 개로 쪼개서 **실제로 쓴 글자만** 내려받는다.

# 결과

| | 전 | 후 |
| --- | --- | --- |
| 프레임워크 | jekyll 4.2.2 (ruby) | astro 7 (node) |
| CSS | Bulma CDN 200KB+ | tailwind 번들 35KB |
| 코드 하이라이팅 | rouge | shiki |
| 배포 | Pages 자동 빌드 | GitHub Actions |
| 애널리틱스 | UA (죽어있음) | GA4 |
| 한글 폰트 | 미지정 | Pretendard |

URL은 전부 그대로 유지했다. `/post/:title`, `/list/N/`, `/categories/`, `/feed/`까지.

옮기고 나서 든 생각은, **`astro`가 불친절한 게 아니라 정직한 것**이었다는 점이다. `jekyll`은 카테고리도 URL도 알아서 해줬지만, 그래서 오타 난 카테고리가 조용히 생겨도 몰랐고, 폰트가 적용 안 된 것도 몇 년을 몰랐다. `astro`는 스키마에 적은 대로만 동작하고, 틀리면 빌드가 깨진다.

물론 삽질의 절반은 프레임워크와 무관했다. 죽어있던 apex 도메인이라든가.

**아직 `jekyll` 블로그를 방치하고 있다면, 한 번 열어보자. 생각보다 많은 게 죽어있을 것이다.**
