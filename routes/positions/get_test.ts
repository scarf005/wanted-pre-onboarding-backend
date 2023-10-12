import test from "node:test"
import assert from "node:assert/strict"
import { createApp } from "../../main.ts"
import { tmpPrismaClient } from "../../utils/tmp_prisma_client.ts"
import { Hono } from "hono/quick"
import { testClient } from "hono/testing"
import { tempDbFileUrl } from "../../utils/test_url.ts"

test("GET /positions", { concurrency: true }, async (t) => {
	await using client = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = client
	const app = createApp({ prisma, app: new Hono() })
	const testApp = testClient(app)

	const allPositions = t.test("채용공고 목록 가져오기", async () => {
		const res = await testApp.positions.$get({ query: {} })
		assert.equal(res.status, 200)

		const json = await res.json()

		assert.equal(json.length, 3)
	})

	const searchPositions = t.test("채용공고 검색하기", async () => {
		const res = await testApp.positions.$get({ query: { search: "네이버" } })
		assert.equal(res.status, 200)

		const json = await res.json()
		assert.equal(json.length, 1)
	})
	const searchPositionsEmpty = t.test("채용공고 검색 실패시 빈 배열 반환하기", async () => {
		const res = await testApp.positions.$get({
			query: { search: "프리온보딩 백엔드 인턴십 선발과제" },
		})
		assert.equal(res.status, 200)

		const json = await res.json()
		assert.equal(json.length, 0)
	})

	const singlePosition = t.test("채용 상세 페이지 가져오기", async (t) => {
		const res = await testApp.positions[":id"].$get({ param: { id: "1" } })

		assert.equal(res.status, 200)

		const json = await res.json()

		t.test("채용 내용이 추가로 담겨 있음", () => assert.ok(json.description.length > 0))
		await t.test("다른 채용공고가 추가적으로 포함됨", async (t) => {
			const assertCompanyIdEquals = (p: { id: number }) =>
				testApp.positions[":id"].$get({ param: { id: p.id.toString() } })
					.then((x) => x.json())
					.then((x) => x.company.id)
					.then((x) => assert.equal(x, json.company.id))

			assert.notEqual(json.otherPositions, [])

			await t.test("모두 같은 회사의 포지션이어야 함", async () => {
				await Promise.all(json.otherPositions.map(assertCompanyIdEquals))
			})
		})
	})

	await Promise.all([allPositions, searchPositions, searchPositionsEmpty, singlePosition])
})
