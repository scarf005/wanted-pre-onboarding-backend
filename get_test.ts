import test from "node:test"
import assert from "node:assert/strict"
import { createApp } from "./main.ts"
import { tmpPrismaClient } from "./tmp_prisma_client.ts"
import { Hono } from "hono/quick"
import { serverUrl, tempDbFileUrl } from "./test_url.ts"
import { testClient } from "hono/testing"

test("GET /positions", { concurrency: true }, async (t) => {
	await using client = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = client
	const app = createApp({ prisma, app: new Hono() })
	const testApp = testClient(app)

	const allPositions = t.test("전체 포지션 목록", async () => {
		const res = await testApp.positions.$get({ query: {} })
		assert.equal(res.status, 200)

		const json = await res.json()

		assert.notEqual(json.length, 0)
	})

	const findPositions = t.test("검색 기능", async () => {
		const res = await testApp.positions.$get({ query: { search: "네이버" } })
		assert.equal(res.status, 200)

		const json = await res.json()
		assert.notEqual(json.length, 0)
	})

	const singlePosition = t.test("단일 포지션 조회", async (t) => {
		const res = await testApp.positions[":id"].$get({ param: { id: "1" } })

		assert.equal(res.status, 200)

		const json = await res.json()
		await t.test("다른 포지션 목록 존재", async () => assert.notEqual(json.otherPositions, []))
		await t.test("채용 내용이 추가로 담겨 있음", async () => assert.ok(json.description.length > 0))
	})

	await Promise.all([allPositions, findPositions, singlePosition])
})
