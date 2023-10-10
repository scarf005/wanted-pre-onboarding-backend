import test from "node:test"
import assert from "node:assert/strict"

import { Prisma } from "@prisma/client"

import { createApp } from "./main.ts"
import { tmpPrismaClient } from "./tmp_prisma_client.ts"
import { Hono } from "hono/quick"
import { serverUrl, tempDbFileUrl } from "./test_url.ts"

const position: Prisma.PositionCreateInput = {
	title: "주니어 프론트엔드 개발자",
	description: "타입스크립트를 잘 쓰는 사람을 모집합니다.",
	region: { connect: { id: 1 } },
	company: { connect: { id: 2 } },
	techStack: { connect: [{ id: 5 }] },
}

test("POST /positions", { concurrency: true }, async (t) => {
	await using client = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = client
	const app = createApp({ prisma, app: new Hono() })

	const invalid = t.test("올바르지 않은 형식", async () => {
		const req = new Request(`${serverUrl}/positions`, {
			method: "POST",
			body: JSON.stringify({ ...position, title: undefined }),
		})

		const res = await app.request(req)
		assert.equal(res.status, 400)
	})

	const create = t.test("요청", async (t) => {
		const prev = await prisma.position.findMany()

		const req = new Request(`${serverUrl}/positions`, {
			method: "POST",
			body: JSON.stringify(position),
		})
		const res = await app.request(req)
		assert.equal(res.status, 200)

		await t.test("새로운 포지션이 올바르게 추가됨", async () => {
			const req = new Request(`${serverUrl}/positions`)

			const res = await app.request(req)
			assert.equal(res.status, 200)

			const data = await res.json()
			assert.equal(data.length, prev.length + 1)
		})
	})

    await Promise.all([invalid, create])
})
