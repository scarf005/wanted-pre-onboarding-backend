import test from "node:test"
import assert from "node:assert/strict"

import { Hono } from "hono/quick"
import { testClient } from "hono/testing"

import { createApp } from "../../main.ts"
import { tempDbFileUrl } from "../../utils/test_url.ts"
import { tmpPrismaClient } from "../../utils/tmp_prisma_client.ts"

test("DELETE /positons/:id", { concurrency: true }, async (t) => {
	await using tmpPrisma = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = tmpPrisma
	const app = createApp({ prisma, app: new Hono() })
	const testApp = testClient(app)

	const ok = t.test("기존 공고 삭제 성공", async (t) => {
		const before = await prisma.position.findMany()
		const res = await testApp.positions[":id"].$delete({ param: { id: "1" } })
		const after = await prisma.position.findMany()

		assert.equal(res.status, 200)
		await t.test("DB에서 공고가 삭제됨", async () => {
			assert.equal(before.length - 1, after.length)
		})
	})
	const failNotExist = t.test("존재하지 않는 공고 삭제하기", async () => {
		const res = await testApp.positions[":id"].$delete({ param: { id: "1234" } })

		assert.equal(res.status, 400)
	})

	await Promise.all([ok, failNotExist])
})
