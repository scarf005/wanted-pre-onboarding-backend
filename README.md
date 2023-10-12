# [원티드 백엔드 인턴십 선발과제](https://bow-hair-db3.notion.site/1850bca26fda4e0ca1410df270c03409) 구현

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

## 개요

- 기업 채용 웹서비스 API를 구현합니다.
- `Javascript`와 `Node.js`를 사용합니다.

## 실행 방법

1. 저장소를 내려받습니다.

```sh
git clone https://github.com/scarf005/wanted-pre-onboarding-backend.git
cd wanted-pre-onboarding-backend/
```

2. prisma 연결을 위해 `.env` 파일을 생성합니다.

```sh
echo 'DATABASE_URL="file:./dev.db"' > .env
```

3. 패키지 의존성을 설치합니다.

```sh
pnpm install
pnpm db:init # prisma DB 초기화

# npm의 경우
npm install
npm run db:init
```

### 서버 실행

```sh
pnpm start

# npm의 경우
npm start
```

### 서버 실행 (개발 모드)

```sh
pnpm dev

# npm의 경우
npm run dev
```

Node 18 버전의 [watch 모드](https://nodejs.org/en/blog/release/v18.11.0#watch-mode-experimental)를 사용해 파일이 수정될 때마다 서버가 자동으로 재시작됩니다.

## 요구사항 구현

### 1. 채용공고 등록 `POST /positions`

```json
{
	"title": "새 개발자 모집",
	"description": "새로운 백엔드 개발자를 모집합니다.",
	"companyId": 1,
	"regionId": 1,
	"reward": null,
	"techStack": [{ "id": 1 }]
}
```

```sh
curl 'http://localhost:3000/positions' -X POST -H "content-type: application/json" --data-binary  '{"title":"새 개발자 모집","description":"새로운 백엔드 개발자를 모집합니다.","companyId":1,"regionId":1,"reward":null,"techStack":[{"id":1}]}'
```

<details><summary>예시 반환값</summary>

```json
{
	"id": 4,
	"title": "새 개발자 모집",
	"description": "새로운 백엔드 개발자를 모집합니다.",
	"reward": null,
	"companyId": 1,
	"regionId": 1
}
```

</details>

### 2. 채용공고 수정 `PATCH /positions/:id`

회사 id를 제외한 모든 필드를 수정할 수 있습니다.

```json
{
	"reward": 12345
}
```

```sh
curl 'http://localhost:3000/positions/1' -X PATCH -H "content-type: application/json" --data-binary '{"reward":12345}'
```

<details><summary>예시 반환값</summary>

```json
{
	"id": 1,
	"title": "주니어 백엔드 개발자",
	"description": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
	"reward": 12345,
	"companyId": 1,
	"regionId": 1
}
```

</details>

### 3. 채용공고 삭제 `DELETE /positions/:id`

채용공고를 삭제합니다.

```sh
curl 'http://localhost:3000/positions/4' -X DELETE
```

<details><summary>예시 반환값</summary>

```json
{
	"id": 4,
	"title": "새 개발자 모집",
	"description": "새로운 백엔드 개발자를 모집합니다.",
	"reward": null,
	"companyId": 1,
	"regionId": 1
}
```

</details>

### 4. 채용공고 조회 `GET /positions`

```sh
curl 'http://localhost:3000/positions' -X GET
```

<details><summary>예시 반환값</summary>

```json
[
	{
		"id": 1,
		"title": "주니어 백엔드 개발자",
		"reward": 1500000,
		"techStack": [
			{
				"id": 3,
				"name": "PostgreSQL"
			},
			{
				"id": 5,
				"name": "Typescript"
			}
		],
		"company": {
			"id": 1,
			"name": "원티드랩"
		},
		"region": {
			"id": 1,
			"name": "서울",
			"countryId": 1
		}
	},
	{
		"id": 2,
		"title": "주니어 프론트엔드 개발자",
		"reward": 1500000,
		"techStack": [
			{
				"id": 3,
				"name": "PostgreSQL"
			},
			{
				"id": 5,
				"name": "Typescript"
			}
		],
		"company": {
			"id": 1,
			"name": "원티드랩"
		},
		"region": {
			"id": 1,
			"name": "서울",
			"countryId": 1
		}
	},
	{
		"id": 3,
		"title": "Django 백엔드 개발자",
		"reward": 1000000,
		"techStack": [
			{
				"id": 1,
				"name": "Python"
			},
			{
				"id": 2,
				"name": "Django"
			},
			{
				"id": 3,
				"name": "PostgreSQL"
			}
		],
		"company": {
			"id": 2,
			"name": "네이버"
		},
		"region": {
			"id": 2,
			"name": "판교",
			"countryId": 1
		}
	}
]
```

</details>

### 4-1. 채용공고 검색 `GET /positions?search=`

```sh
# http://localhost:3000/positions?search=네이버
curl -G 'http://localhost:3000/positions' --data-urlencode 'search=네이버'
```

<details><summary>예시 반환값</summary>

```json
[
	{
		"id": 3,
		"title": "Django 백엔드 개발자",
		"reward": 1000000,
		"techStack": [
			{
				"id": 1,
				"name": "Python"
			},
			{
				"id": 2,
				"name": "Django"
			},
			{
				"id": 3,
				"name": "PostgreSQL"
			}
		],
		"company": {
			"id": 2,
			"name": "네이버"
		},
		"region": {
			"id": 2,
			"name": "판교",
			"countryId": 1
		}
	}
]
```

</details>

### 5. 채용 상세 페이지 조회 `GET /positions/:id`

```sh
curl 'http://localhost:3000/positions/1' -X GET
```

<details><summary>예시 반환값</summary>

```json
{
	"id": 1,
	"title": "주니어 백엔드 개발자",
	"reward": 1500000,
	"techStack": [
		{
			"id": 3,
			"name": "PostgreSQL"
		},
		{
			"id": 5,
			"name": "Typescript"
		}
	],
	"company": {
		"id": 1,
		"name": "원티드랩"
	},
	"region": {
		"id": 1,
		"name": "서울",
		"countryId": 1
	},
	"description": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
	"otherPositions": [
		{
			"id": 2
		}
	]
}
```

</details>

### 6. 채용공고 지원 `POST /applications`

```sh
curl 'http://localhost:3000/applications' -X POST -H "content-type: application/json" --data-binary '{"userId":1,"positionId":1}'
```

```json
{
	"id": 1,
	"userId": 1,
	"positionId": 1
}
```

<details><summary>예시 반환값</summary>

```json
{
  "id": 1,
  "userId": 1,
  "positionId": 1
}
```

</details>


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


## 유닛 테스트

node.js에서 기본적으로 제공하는 test runner를 활용했습니다.

![backend : fish_01](https://github.com/scarf005/wanted-pre-onboarding-backend/assets/54838975/6d6328ae-da3d-4848-aa35-97e05af5f7eb)
