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

	const apply = () => testApp.applications.$post({ json: { positionId: 1, userId: 1 } })

	await t.test("사용자가 채용공고에 지원", async (t) => {
		const prev = await prisma.application.findMany()
		const res = await apply()
		const after = await prisma.application.findMany()

		assert.equal(res.status, 200)
		assert.equal(after.length, prev.length + 1)

		await t.test("사용자는 1회만 지원 가능, 중복 지원 불가", async () => {
			const res = await apply()

			assert.equal(res.status, 400)
		})
	})
})
