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

동일 회사가 올린 다른 채용공고도 함께 조회됩니다.

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

![test-result](https://github.com/scarf005/wanted-pre-onboarding-backend/assets/54838975/6d6328ae-da3d-4848-aa35-97e05af5f7eb)

- 제공하는 기능이 충분하다 생각해 node.js에서 기본으로 제공하는 [test runner](https://nodejs.org/api/test.html)를 사용했습니다.
- CRUD 동작별로 유닛 테스트를 작성했습니다. (예: [post.ts](./routes/positions/post.ts) -> [post_test.ts](./routes/positions/post_test.ts))
- prisma에서 [sqlite의 in-memory DB를 지원하지 않아](https://github.com/prisma/prisma/issues/732) 테스트 종류별(CRUD)로 별개의 [테스트용 DB](./utils/tmp_prisma_client.ts)를 생성해, 한 테스트가 다른 테스트에 영향을 미칠 걱정 없이 병렬로 테스트를 실행 가능하도록 했습니다.
- [타입스크립트 5.2의 `using`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management) 키워드를 써서 생성된 임시 DB가 테스트 종료 후 확정적으로 정리되도록 했습니다.
- github actions에서도 테스트를 실행해, 오류가 없는지 확인하도록 했습니다.

## 코딩 컨벤션

### 불변 변수 사용

1. 가변 변수의 사용을 최소화합니다. 불변 변수를 사용시, 값을 바꿀 때마다 명시적으로 새 변수를 할당해야 하기 때문에 코드가 명확해지고 버그의 가능성이 줄 수 있기 때문입니다.

2. 전역 가변 변수를 사용하지 않습니다. 예상치 못한 곳에서 전역 변수가 수정될 시 해결하기 어려워지고, 종속성으로 인해 테스트가 어려워질 수 있기 때문입니다. 대신, [의존성 주입](https://en.wikipedia.org/wiki/Dependency_injection)을 사용해 필요한 값을 명시적으로 전달합니다.

```ts
// Avoid
const prisma = new prismaClient()
const myFunction1 = () => prisma.user.findMany()

// Good
const myFunction2 = (prisma: PrismaClient) => prisma.user.findMany()
```

### 함수형 패러다임

재사용과 테스트가 쉽도록 앱에서 변할 수 있는 부분을 최대한 줄이고, 각 기능을 함수로 잘개 쪼개 조합하는 방식으로 코드를 작성했습니다.

```ts
export const deletion = (prisma: PrismaClient) =>
	new Hono().delete("/:id", idValidator, async (c) => /* ... */)

export const positions = (prisma: PrismaClient) =>
	new Hono()
		.route("/", deletion(prisma))
```

### 디렉터리 구조

1. 상대 경로를 사용합니다. 디렉터리 경로가 복잡한지 여부를 명시적으로 확인 가능하기 때문입니다. 예를 들어, import 경로가 `../../../a`라면 리팩터링을 통한 구조 개선이 필요할 수 있습니다.

```ts
// Avoid
import foo from "foo"

// Good
import foo from "../foo.ts"
```

2. 자주 사용하는 파일끼리 모아둡니다. `src/main.ts`와 `test/main.ts`를 따로 나누지 않고 `main.ts`, `main_test.ts`같이 바로 옆에 두면 3번 규칙을 지키고, 관련 파일을 찾기 쉬워집니다.

### 타입 안정성

1. `as`나 `any`의 사용을 최소화합니다. 컴파일러를 '속이는' 행위를 줄일수록 타입스크립트가 주는 타입 안정성의 장점이 커지기 때문입니다.
2. 가능하면 `as const`를 사용해 타입을 최대한 구체화합니다. 타입은 가능한 값의 가짓수이기 때문에, 타입을 구체화할수록 프로그램의 동작을 단순하고 이해하기 쉽게 정의할 수 있기 때문입니다.


### Git 메시지 컨벤션

모든 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/)형식을 따릅니다. 사실상의 표준으로, 다양한 툴에서 지원하기 때문입니다. 메시지 형식은 [Semantic PRs](https://github.com/Ezard/semantic-prs) 앱을 통해 검증합니다.

## 코드 가독성

일관된 코드 스타일을 유지하기 위해 [Deno](https://deno.com)를 사용했습니다. 다음 [포매팅 스타일](./deno.jsonc)을 사용했습니다.

### 세미콜론 제거

자동으로 세미콜론을 추가해주는 [ASI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion)가 문제를 일으킬 때는 많은 경우 [가변 변수](#불변-변수-사용)의 상태를 변화시키거나, [타입 캐스트](#타입-안정성)를 하는 등 [코딩 컨벤션](#코딩-컨벤션)에 위배되는 경우기 때문입니다.

### 탭 사용

탭은 사용자가 간격을 조절할 수 있으므로 코드의 일관성을 해치지 않으면서도 [시각적 접근성](https://old.reddit.com/r/javascript/comments/c8drjo/nobody_talks_about_the_real_reason_to_use_tabs/)을 높일 수 있기 때문입니다.

[prisma]: https://prismaliser.app?code=Z2VuZXJhdG9yIGNsaWVudCB7CiAgICBwcm92aWRlciA9ICJwcmlzbWEtY2xpZW50LWpzIgp9CgpnZW5lcmF0b3Igem9kIHsKICAgIHByb3ZpZGVyID0gInpvZC1wcmlzbWEtdHlwZXMiCn0KCmRhdGFzb3VyY2UgZGIgewogICAgcHJvdmlkZXIgPSAic3FsaXRlIgogICAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIENvdW50cnkgewogICAgaWQgICBJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIG5hbWUgU3RyaW5nIEB1bmlxdWUKCiAgICByZWdpb25zIFJlZ2lvbltdCn0KCm1vZGVsIFJlZ2lvbiB7CiAgICBpZCAgIEludCAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQogICAgbmFtZSBTdHJpbmcKCiAgICBQb3NpdGlvbiAgUG9zaXRpb25bXQogICAgY291bnRyeSAgIENvdW50cnkgICAgQHJlbGF0aW9uKGZpZWxkczogW2NvdW50cnlJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgICBjb3VudHJ5SWQgSW50CgogICAgQEB1bmlxdWUoW25hbWUsIGNvdW50cnlJZF0pCn0KCm1vZGVsIENvbXBhbnkgewogICAgaWQgICBJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIG5hbWUgU3RyaW5nIEB1bmlxdWUKCiAgICBwb3NpdGlvbiBQb3NpdGlvbltdCn0KCm1vZGVsIFRlY2ggewogICAgaWQgICBJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIG5hbWUgU3RyaW5nIEB1bmlxdWUKCiAgICBwb3NpdGlvbiBQb3NpdGlvbltdIEByZWxhdGlvbigiVGVjaFRvUG9zaXRpb24iKQp9Cgptb2RlbCBVc2VyIHsKICAgIGlkICAgSW50ICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpCiAgICBuYW1lIFN0cmluZwoKICAgIGFwcGxpY2F0aW9ucyBBcHBsaWNhdGlvbltdCn0KCm1vZGVsIEFwcGxpY2F0aW9uIHsKICAgIGlkIEludCBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQoKICAgIFVzZXIgICAgICAgVXNlciAgICAgQHJlbGF0aW9uKGZpZWxkczogW3VzZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgICB1c2VySWQgICAgIEludAogICAgcG9zaXRpb24gICBQb3NpdGlvbiBAcmVsYXRpb24oZmllbGRzOiBbcG9zaXRpb25JZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgICBwb3NpdGlvbklkIEludAoKICAgIEBAdW5pcXVlKFt1c2VySWQsIHBvc2l0aW9uSWRdKQp9Cgptb2RlbCBQb3NpdGlvbiB7CiAgICBpZCBJbnQgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKCiAgICB0aXRsZSAgICAgICBTdHJpbmcKICAgIGRlc2NyaXB0aW9uIFN0cmluZwogICAgcmV3YXJkICAgICAgSW50PwoKICAgIHRlY2hTdGFjayBUZWNoW10gQHJlbGF0aW9uKCJUZWNoVG9Qb3NpdGlvbiIpCgogICAgY29tcGFueSAgICAgQ29tcGFueSAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbY29tcGFueUlkXSwgcmVmZXJlbmNlczogW2lkXSkKICAgIGNvbXBhbnlJZCAgIEludAogICAgcmVnaW9uICAgICAgUmVnaW9uICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbcmVnaW9uSWRdLCByZWZlcmVuY2VzOiBbaWRdKQogICAgcmVnaW9uSWQgICAgSW50CiAgICBBcHBsaWNhdGlvbiBBcHBsaWNhdGlvbltdCgogICAgQEB1bmlxdWUoW3RpdGxlLCBjb21wYW55SWQsIHJlZ2lvbklkXSkKfQo%3D
