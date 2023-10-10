import test from "node:test"
import assert from "node:assert/strict"
import { createApp } from "./main.ts"
import { tmpPrismaClient } from "./tmp_prisma_client.ts"
import { Hono } from "hono/quick"
import { serverUrl, tempDbFileUrl } from "./test_url.ts"

test("GET /positions", { concurrency: true }, async (t) => {
	await using client = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = client
	const app = createApp({ prisma, app: new Hono() })

	const allPositions = t.test("전체 포지션 목록", async () => {
		const req = new Request(`${serverUrl}/positions`)

		const res = await app.request(req)
		assert.equal(res.status, 200)

		const prismaRes = await prisma.position.findMany()
		const data = await res.json() as { id: number }[]

		assert.equal(data.length, prismaRes.length)
	})

	const findPositions = t.test("검색 기능", async () => {
		const req = new Request(`${serverUrl}/positions?search=네이버`)

		const res = await app.request(req)
		assert.equal(res.status, 200)

		const json = await res.json() as unknown[]
		assert.notEqual(json.length, 0)
	})

	const singlePosition = t.test("단일 포지션 조회", async (t) => {
		const req = new Request(`${serverUrl}/positions/1`)

		const res = await app.request(req)
		assert.equal(res.status, 200)

		const json = await res.json() as { id: number; otherPositions: { id: number }[] }
		assert.notDeepEqual(json.otherPositions, [])
	})

	await Promise.all([allPositions, findPositions, singlePosition])
})
