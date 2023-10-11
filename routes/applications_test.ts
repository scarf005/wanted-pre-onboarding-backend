import test from "node:test"
import { Hono } from "hono"
import { testClient } from "hono/testing"
import { createApp } from "../main"
import { tempDbFileUrl } from "../utils/test_url"
import { tmpPrismaClient } from "../utils/tmp_prisma_client"
import assert from "node:assert"

test("POST /applications", async (t) => {
	await using tmpPrisma = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = tmpPrisma
	const app = createApp({ prisma, app: new Hono() })
	const testApp = testClient(app)

	await t.test("지원하기", async () => {
		const prev = await prisma.application.findMany()
		const res = await testApp.applications.$post({ json: { positionId: 1, userId: 1 } })

		assert.equal(res.status, 200)
		const after = await prisma.application.findMany()

		assert.equal(after.length, prev.length + 1)
	})

	await t.test("중복 지원 불가", async () => {
		const res = await testApp.applications.$post({ json: { positionId: 1, userId: 1 } })

		assert.equal(res.status, 400)
	})
})
