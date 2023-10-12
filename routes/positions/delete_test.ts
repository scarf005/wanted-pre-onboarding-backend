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

	const ok = t.test("기존 공고 삭제 성공", async () => {
		const res = await testApp.positions[":id"].$delete({ param: { id: "1" } })

		assert.equal(res.status, 200)
	})
	const failNotExist = t.test("존재하지 않는 공고 삭제하기", async () => {
		const res = await testApp.positions[":id"].$delete({ param: { id: "1234" } })

		assert.equal(res.status, 400)
	})

	await Promise.all([ok, failNotExist])
})
