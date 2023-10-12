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

## 모델 설계

![models](https://github.com/scarf005/wanted-pre-onboarding-backend/assets/54838975/c5151b04-9ad9-44ff-98f6-d5c69d56e687) [페이지 링크][prisma]

[Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)으로 [7개의 모델](./prisma/schema.prisma)을 정의했습니다.

- 채용 공고(Position), 지원(Application), 지역(Region)에서 중복된 값이 생기는 것을 막기 위해 [`@@unique` 제약](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#unique-1)을 추가했습니다.
- 기술 스택을 배열로 구현하기 위해 `Position`과 `Tech`를 [`@relation`](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#implicit-many-to-many-relations)으로 연결했습니다.

## 사용 기술

### ORM

[prisma](https://www.prisma.io)를 사용했습니다. 타입 안전한 DB 쿼리를 쓸 수 있게 해주고, [zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types) 라이브러리를 사용해 컨트롤러에서 전달받는 데이터를 검증할 수 있기 때문입니다.

### RDBMS

[SQLite](https://www.sqlite.org/index.html)를 사용했습니다. 단일 파일에 모든 데이터를 저장하기에 테스트에 용이하기 때문입니다.

### 그외 기술

1. 타입 안전한 코드를 작성하는데 도움이 되는지
2. 웹 표준을 준수하는지
3. 테스트에 도움을 주는지

여부를 기준으로 선택하였습니다.

- [zod](https://zod.dev): 런타임 타입 검증 및 파싱
- [hono](https://hono.dev/)
  - `Request` -> `Response`로 대표되는 [웹 표준](https://hono.dev/#web-standard) 을 준수하기 때문에 통합 테스트가 편리합니다.
  - 미들웨어에서 파싱한 값을 핸들러 함수에서 [타입 안전하게 접근](https://hono.dev/guides/validation#zod-validator-middleware) 가능합니다.
- [http-terminator](https://github.com/gajus/http-terminator)
  - 개발 모드([`node --watch`](https://nodejs.org/en/blog/release/v18.11.0))에서 서버의 연결을 즉시 끊기 위해 사용했습니다
- [@swc-node](https://github.com/swc-project/swc-node): [ESM 모듈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)을 빠르게 실행하기 위해 사용했습니다.

## 유닛 테스트

node.js에서 기본적으로 제공하는 test runner를 활용했습니다.

![backend : fish_01](https://github.com/scarf005/wanted-pre-onboarding-backend/assets/54838975/6d6328ae-da3d-4848-aa35-97e05af5f7eb)

[prisma]: https://prismaliser.app?code=Z2VuZXJhdG9yIGNsaWVudCB7CiAgICBwcm92aWRlciA9ICJwcmlzbWEtY2xpZW50LWpzIgp9CgpnZW5lcmF0b3Igem9kIHsKICAgIHByb3ZpZGVyID0gInpvZC1wcmlzbWEtdHlwZXMiCn0KCmRhdGFzb3VyY2UgZGIgewogICAgcHJvdmlkZXIgPSAic3FsaXRlIgogICAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIENvdW50cnkgewogICAgaWQgICBJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIG5hbWUgU3RyaW5nIEB1bmlxdWUKCiAgICByZWdpb25zIFJlZ2lvbltdCn0KCm1vZGVsIFJlZ2lvbiB7CiAgICBpZCAgIEludCAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQogICAgbmFtZSBTdHJpbmcKCiAgICBQb3NpdGlvbiAgUG9zaXRpb25bXQogICAgY291bnRyeSAgIENvdW50cnkgICAgQHJlbGF0aW9uKGZpZWxkczogW2NvdW50cnlJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgICBjb3VudHJ5SWQgSW50CgogICAgQEB1bmlxdWUoW25hbWUsIGNvdW50cnlJZF0pCn0KCm1vZGVsIENvbXBhbnkgewogICAgaWQgICBJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIG5hbWUgU3RyaW5nIEB1bmlxdWUKCiAgICBwb3NpdGlvbiBQb3NpdGlvbltdCn0KCm1vZGVsIFRlY2ggewogICAgaWQgICBJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIG5hbWUgU3RyaW5nIEB1bmlxdWUKCiAgICBwb3NpdGlvbiBQb3NpdGlvbltdIEByZWxhdGlvbigiVGVjaFRvUG9zaXRpb24iKQp9Cgptb2RlbCBVc2VyIHsKICAgIGlkICAgSW50ICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpCiAgICBuYW1lIFN0cmluZwoKICAgIGFwcGxpY2F0aW9ucyBBcHBsaWNhdGlvbltdCn0KCm1vZGVsIEFwcGxpY2F0aW9uIHsKICAgIGlkIEludCBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQoKICAgIFVzZXIgICAgICAgVXNlciAgICAgQHJlbGF0aW9uKGZpZWxkczogW3VzZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgICB1c2VySWQgICAgIEludAogICAgcG9zaXRpb24gICBQb3NpdGlvbiBAcmVsYXRpb24oZmllbGRzOiBbcG9zaXRpb25JZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgICBwb3NpdGlvbklkIEludAoKICAgIEBAdW5pcXVlKFt1c2VySWQsIHBvc2l0aW9uSWRdKQp9Cgptb2RlbCBQb3NpdGlvbiB7CiAgICBpZCBJbnQgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKCiAgICB0aXRsZSAgICAgICBTdHJpbmcKICAgIGRlc2NyaXB0aW9uIFN0cmluZwogICAgcmV3YXJkICAgICAgSW50PwoKICAgIHRlY2hTdGFjayBUZWNoW10gQHJlbGF0aW9uKCJUZWNoVG9Qb3NpdGlvbiIpCgogICAgY29tcGFueSAgICAgQ29tcGFueSAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbY29tcGFueUlkXSwgcmVmZXJlbmNlczogW2lkXSkKICAgIGNvbXBhbnlJZCAgIEludAogICAgcmVnaW9uICAgICAgUmVnaW9uICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbcmVnaW9uSWRdLCByZWZlcmVuY2VzOiBbaWRdKQogICAgcmVnaW9uSWQgICAgSW50CiAgICBBcHBsaWNhdGlvbiBBcHBsaWNhdGlvbltdCgogICAgQEB1bmlxdWUoW3RpdGxlLCBjb21wYW55SWQsIHJlZ2lvbklkXSkKfQo%3D
