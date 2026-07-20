---
name: write-post
description: >-
  이 블로그(astro 기반, blog.seotory.com)에 새 글을 쓰거나 기존 글을 편집할 때 사용한다.
  프론트매터 스키마, 파일명이 곧 URL이 되는 규칙, 글의 톤과 구조, astro·Shiki·Typography에서
  깨지기 쉬운 마크다운 규칙(특히 코드펜스 언어 지정과 굵게 flanking), 카테고리 제약,
  빌드·검증·배포 절차를 담는다. 트리거: "블로그 글 써줘", "포스트 작성", "글 초안 잡아줘",
  src/content/posts 아래 파일을 만들거나 고칠 때.
---

# 이 블로그에 글 쓰기

`blog.seotory.com`은 astro로 빌드되는 정적 블로그다. 글은 마크다운 파일 하나이고,
**파일을 만들고 프론트매터만 맞추면 목록·URL·페이징·태그·RSS가 전부 자동으로 생성된다.**
사람이 신경 쓸 것은 아래 세 가지뿐이다: 파일 위치와 이름, 프론트매터, 그리고 렌더링을
깨뜨리지 않는 마크다운.

## 1. 파일 위치와 이름 = URL

- 위치: `src/content/posts/<slug>.md`
- **파일명(확장자 제외)이 곧 URL slug다.** `java-builder-pattern.md` → `/post/java-builder-pattern/`
- slug는 **kebab-case 영문**으로 짓는다. 한글·공백·대문자 금지.
- **파일명에 날짜 접두사를 넣지 않는다.** 날짜는 프론트매터에 있다.
  (jekyll의 `2017-09-03-제목.markdown` 관습은 여기서 쓰지 않는다.)

## 2. 프론트매터

스키마는 `src/content.config.ts`가 강제한다. 필드를 틀리면 **빌드가 실패한다**(그게 의도다).

```yml
---
title: 글 제목
date: 2026-07-20 21:30:00 +0900
description: ""
category: dev
published: true
tags:
  - astro
  - jekyll
---
```

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title` | O | 글 제목. **기본은 제목만 쓴다.** 아주 특징적인 글에 한해 드물게 `제목 — 부제` 형태의 em-dash 부제를 붙인다. 부제는 예외다. |
| `date` | O | `YYYY-MM-DD HH:MM:SS +0900` 또는 `YYYY-MM-DD`. 홈은 이 날짜 역순으로 정렬한다. |
| `category` | O | **반드시 `CATEGORY_PATHS`의 값**(현재는 `dev` 하나). 오타는 빌드 실패로 잡힌다. |
| `description` | X | 비우면 본문에서 발췌해 meta·RSS에 쓴다. 직접 채우면 그 값을 쓴다. |
| `tags` | X | 문자열 배열. 새 태그는 자유롭게 추가 — `/tags/`에 자동 반영된다. |
| `published` | X | 기본 `true`. 초안은 `false`로 두면 빌드에서 제외된다. |
| `image` | X | 카드/OG 이미지 URL. |
| `history` | X | `"YYYYMMDD"` 수정 이력 배열. |

## 3. 톤과 구조

이 블로그의 목소리는 **분석적 평서체**다. (기준: `homelab-part-1`, `homelab-part-2`,
`migrate-jekyll-to-astro`.)

- **평서체 "~다"** 로 쓴다. 존댓말("~습니다")을 쓰지 않는다.
- **정보 전달에 초점**을 맞춘다. 내용이 너무 가볍지 않게, 읽고 나면 남는 것이 있게 쓴다.
  감상이나 잡담보다 사실·근거·결정을 담는다.
- **경험에서 출발**한다. "이걸 했다 → 이게 터졌다 → 원인은 이거였다" 순으로 끌고 간다.
- 도입부 뒤에 **상단 불릿 목차**를 둔다: "이 글은 ... 다음과 같다" / "간략하게 정리하면".
- 문제는 **원인 추적 서술**로 쓴다: 증상 → 그 증상을 렌더한 주체(에러 페이지·응답 상태가
  요청이 어디까지 갔는지 알려준다) → 실제 원인 → 교훈. 짧게 치고 빠지기보다 밀도 있게.
- **굵게(`**...**`)는 원칙 선언에만** 쓴다. 아무 데나 강조하지 않는다.
- 기술 용어·파일명·명령은 백틱으로 감싼다: `jekyll`, `getStaticPaths()`, `_config.yml`.
- **용어 설명이 필요하면 위첨자로 단다.** 본문 흐름을 끊지 않으면서 뜻을 보탤 때 쓴다.
  짧은 풀이는 `<sup>...</sup>`(HTML, astro에서 그대로 통과)로, 설명이 길면 GFM 각주
  `용어[^1]` + 하단 `[^1]: 설명`을 쓴다(각주 참조도 위첨자로 렌더된다).
- 섹션 제목: `#`(h1)이 최상위, `##`(h2)가 하위. 서술적 명사구나 질문형으로.
  (글 제목은 레이아웃 헤더가 그리므로 본문의 `#`은 섹션 제목으로 쓴다.)
- **`# 정리`로 마무리**한다: 비교 표나 recap 블록 + 결론 불릿 몇 줄.

## 4. 렌더링을 깨뜨리는 마크다운 — 반드시 지킬 것

아래는 화면에서 조용히 깨지는 항목들이다. 겪고 나서 정리한 것이므로 예외 없이 지킨다.

### 코드펜스는 항상 언어를 지정한다

Shiki는 **언어가 지정된 블록만 색을 입힌다.** 언어 없는 펜스는 Typography 기본 스타일을
타서, 밝은 배경에 밝은 글자로 **안 보이게** 된다.

- 다이어그램·흐름도·콘솔 출력·빌드 에러: `text`
- 나머지: `bash` `js` `ts` `css` `yml` `html` `json` 등 실제 언어

### 굵게는 한글/영숫자 글자로 끝낸다 (flanking 규칙)

CommonMark에서, 닫는 `**` 바로 **앞이 백틱·따옴표 같은 구두점**이고 바로 **뒤가 한글 조사**면
굵게로 파싱되지 않고 `**`가 글자 그대로 화면에 나온다. 한글은 조사가 바로 붙기 때문에 자주
걸린다.

```text
나쁨:  도메인이 **`seotory.com`**이었다      → 화면에 ** 노출
좋음:  도메인이 `seotory.com`이 아니라 **엉뚱한 값**이었다   (굵게가 '값'에서 끝남)
```

**규칙: `**...**` span은 반드시 한글·영숫자 글자로 끝낸다.** 백틱·따옴표·닫는 괄호로
끝내지 않는다. 코드를 강조하고 싶으면 코드를 굵게 밖으로 빼거나 문장을 다시 쓴다.

### kramdown·Liquid 문법을 쓰지 않는다

`{:target="_blank"}`(kramdown IAL), `{% raw %}`, `{{ var }}`(Liquid)는 astro 파서가
모른다 → **글자 그대로 노출된다.** 링크에 속성이 필요하면 HTML로 직접 쓴다.

## 5. 카테고리

- 현재 모든 글은 `category: dev` 하나다.
- 2뎁스(`dev/java` 등)는 시스템이 지원하지만 지금은 쓰지 않는다.
- 새 카테고리를 추가하려면 `src/consts.ts`의 `CATEGORY_NAV`를 고친다. 그래야 스키마의
  `CATEGORY_PATHS`에 반영되어 프론트매터에서 쓸 수 있다.

## 6. 작성 → 검증 → 배포

1. `src/content/posts/<slug>.md`를 쓴다.
2. `npx astro build` — `category` 오타나 스키마 위반은 여기서 실패한다.
3. 아래 검증을 돌려 렌더링 함정을 잡는다.
4. master에 머지하면 `GitHub Actions`가 자동으로 빌드·배포한다. (`Deploy Astro site
   to Pages` 워크플로. 사람이 배포 버튼을 누를 일은 없다.)

### 검증 스니펫

빌드한 뒤, 본문에 리터럴 `**`·kramdown·liquid가 노출됐는지와 언어 없는 코드펜스가 있는지
한 번에 확인한다.

```bash
npx astro build
python3 - <<'PY'
import re, glob, sys
bad = 0
for f in glob.glob('dist/post/*/index.html'):
    h = open(f, encoding='utf-8').read()
    m = re.search(r'<article.*?</article>', h, re.S)
    if not m:
        continue
    art = m.group(0)
    text = re.sub(r'<[^>]+>', '', re.sub(r'<(pre|code)[^>]*>.*?</\1>', '', art, flags=re.S))
    slug = f.split('/')[-2]
    for pat, name in [(r'\*\*', 'literal **'), (r'\{:', 'kramdown IAL'), (r'\{%', 'liquid')]:
        if re.search(pat, text):
            print(f'  [{slug}] {name}'); bad += 1
    if any('astro-code' not in p for p in re.findall(r'<pre[^>]*>', art)):
        print(f'  [{slug}] unlabeled code fence'); bad += 1
print('OK — 문제 없음' if bad == 0 else f'{bad}건 발견')
sys.exit(1 if bad else 0)
PY
```

(`**/*.md` 같은 glob 패턴이 코드블록 안에 있어도 검증은 `<pre>`/`<code>`를 먼저 걷어내므로
오탐하지 않는다.)
