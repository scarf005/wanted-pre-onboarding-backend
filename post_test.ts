import test from "node:test"
import assert from "node:assert/strict"

import { Prisma } from "@prisma/client"
import { Position, Tech } from "./prisma/generated/zod/index.ts"
import { Hono } from "hono/quick"
import { testClient } from "hono/testing"

import { createApp } from "./main.ts"
import { tmpPrismaClient } from "./tmp_prisma_client.ts"
import { serverUrl, tempDbFileUrl } from "./test_url.ts"

const position = {
	title: "주니어 프론트엔드 개발자",
	description: "타입스크립트를 잘 쓰는 사람을 모집합니다.",
	regionId: 1,
	companyId: 2,
	reward: null,
	techStack: [{ name: "Typescript" }],
} as const satisfies Prisma.PositionUncheckedCreateWithoutTechStackInput & {
	techStack: Partial<Tech>[]
}

test("POST /positions", { concurrency: true }, async (t) => {
	await using tmpPrisma = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = tmpPrisma
	const app = createApp({ prisma, app: new Hono() })
	const testApp = testClient(app)

	const invalid = t.test("올바르지 않은 형식", async () => {
		const req = new Request(`${serverUrl}/positions`, {
			method: "POST",
			body: JSON.stringify({ ...position, title: undefined }),
		})

		const res = await app.request(req)
		assert.equal(res.status, 400)
	})

	const create = t.test("새 공고 생성", async (t) => {
		const prev = await prisma.position.findMany()

		const res = await testApp.positions.$post({ json: position })
		assert.equal(res.status, 200)

		await t.test("새로운 포지션이 올바르게 추가됨", async () => {
			const req = new Request(`${serverUrl}/positions`)

			const res = await app.request(req)
			assert.equal(res.status, 200)

			const data = await res.json()
			assert.equal(data.length, prev.length + 1)

			const last = data.at(-1)
			assert.equal(last.techStack.length, position.techStack.length)
		})
	})

	await Promise.all([invalid, create])
})
