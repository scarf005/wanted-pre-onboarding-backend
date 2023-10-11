# [원티드 백엔드 인턴십 선발과제](https://bow-hair-db3.notion.site/1850bca26fda4e0ca1410df270c03409) 구현

<header align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

</header>

## 실행 방법

1. prisma 연결을 위한 `.env` 파일을 생성합니다.

```sh
DATABASE_URL="file:./dev.db"
```

2. 패키지 의존성을 설치하고 서버를 실행합니다.

```sh
pnpm install # 또는 npm install
pnpm db # prisma DB 초기화
pnpm dev
```

## 사용 기술

1. 타입 안전한 코드를 작성하는데 도움이 되는지
2. 웹 표준을 준수하는지

여부를 기준으로 선택하였습니다.

- [zod](https://zod.dev): 런타임 타입 검증 및 파싱
- [hono](https://hono.dev/): [웹 표준](https://hono.dev/#web-standard) 을 준수하므로
  - Cloudflare Workers, Deno, AWS Lambda등 다양한 환경에서 사용 가능
  - `Request` -> `Response` 기반 테스트 용이
- [prisma](https://www.prisma.io)
  - ORM 라이브러리 (요구 사항)
  - 타입 안전한 DB 쿼리 작성
- [http-terminator](https://github.com/gajus/http-terminator)
  - 개발 모드([`node --watch`](https://nodejs.org/en/blog/release/v18.11.0))에서 서버의 연결을 즉시 끊기 위해 사용했습니다.

## 과제 요구사항

```json
{
  "회사_id":회사_id,
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1000000,
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "사용기술":"Python"
}
```

2. 회사는 아래 데이터와 같이 채용공고를 수정합니다. (회사 id 이외 모두 수정 가능합니다.)

Example) 데이터 예시이며, 필드명은 임의로 설정가능합니다.

```json
{
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1500000, # 변경됨
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..", # 변경됨
  "사용기술":"Python"
}
```

or

```json
{
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1000000,
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "사용기술":"Django" # 변경됨
}
```

3. 채용공고를 삭제합니다.

DB에서 삭제됩니다.

4. 채용공고 목록을 가져옵니다.

4-1. 사용자는 채용공고 목록을 아래와 같이 확인할 수 있습니다.

Example)

```json
[
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"원티드랩",
	  "국가":"한국",
	  "지역":"서울",
	  "채용포지션":"백엔드 주니어 개발자",
	  "채용보상금":1500000,
	  "사용기술":"Python"
	},
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"네이버",
	  "국가":"한국",
	  "지역":"판교",
	  "채용포지션":"Django 백엔드 개발자",
	  "채용보상금":1000000,
	  "사용기술":"Django"
	},
  ...
]
```

4-2. 채용공고 검색 기능 구현(선택사항 및 가산점요소).

```json
# Example - 1) some/url?search=원티드
[
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"원티드랩",
	  "국가":"한국",
	  "지역":"서울",
	  "채용포지션":"백엔드 주니어 개발자",
	  "채용보상금":1500000,
	  "사용기술":"Python"
	},
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"원티드코리아",
	  "국가":"한국",
	  "지역":"부산",
	  "채용포지션":"프론트엔드 개발자",
	  "채용보상금":500000,
	  "사용기술":"javascript"
	}
]

# Example - 2) some/url?search=Django
[
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"네이버",
	  "국가":"한국",
	  "지역":"판교",
	  "채용포지션":"Django 백엔드 개발자",
	  "채용보상금":1000000,
	  "사용기술":"Django"
	},
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"카카오",
	  "국가":"한국",
	  "지역":"판교",
	  "채용포지션":"Django 백엔드 개발자",
	  "채용보상금":500000,
	  "사용기술":"Python"
	}
  ...
]
```

5. 채용 상세 페이지를 가져옵니다.

사용자는 채용상세 페이지를 아래와 같이 확인할 수 있습니다.

- “채용내용”이 추가적으로 담겨있음.
- 해당 회사가 올린 다른 채용공고 가 추가적으로 포함됩니다(선택사항 및 가산점요소).

```json
Example)
{
	"채용공고_id": 채용공고_id,
  "회사명":"원티드랩",
  "국가":"한국",
  "지역":"서울",
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1500000,
  "사용기술":"Python",
	"채용내용": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
	"회사가올린다른채용공고":[채용공고_id, 채용공고_id, ..] # id List (선택사항 및 가산점요소).
}
```

6. 사용자는 채용공고에 지원합니다(선택사항 및 가산점요소).

사용자는 채용공고에 아래와 같이 지원합니다. (가점 요소이며, 필수 구현 요소가 아님) 사용자는 1회만 지원 가능합니다.

```json
Example)
{
	"채용공고_id": 채용공고_id,
  "사용자_id": 사용자_id
}
```
