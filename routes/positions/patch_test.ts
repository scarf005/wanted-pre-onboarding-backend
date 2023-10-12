import test from "node:test"
import assert from "node:assert/strict"

import { Hono } from "hono/quick"
import { testClient } from "hono/testing"

import { createApp } from "../../main.ts"
import { tempDbFileUrl } from "../../utils/test_url.ts"
import { tmpPrismaClient } from "../../utils/tmp_prisma_client.ts"

test("PATCH /positons/:id", { concurrency: true }, async (t) => {
	await using tmpPrisma = await tmpPrismaClient(tempDbFileUrl())
	const { prisma } = tmpPrisma
	const app = createApp({ prisma, app: new Hono() })
	const testApp = testClient(app)

	const ok = t.test("채용 공고 수정하기", async () => {
		const res = await testApp.positions[":id"].$patch({
			param: { id: "1" },
			json: { title: "수정된 제목", techStack: [{ id: 1 }] },
		})

		assert.equal(res.status, 200)
	})
	const cannotChangeCompanyId = t.test("회사 ID는 변경 불가", async () => {
		const res = await testApp.positions[":id"].$patch({
			param: { id: "1" },
			// @ts-expect-error: companyId는 변경 불가
			json: { companyId: 1 },
		})

		assert.equal(res.status, 400)
	})
	const failNotExist = t.test("존재하지 않는 공고는 수정 불가", async () => {
		const res = await testApp.positions[":id"].$patch({
			param: { id: "1234" },
			json: { title: "수정된 제목" },
		})

		assert.equal(res.status, 400)
	})
	const failNoSuchTech = t.test("존재하지 않는 기술 스택으로 수정 불가", async () => {
		const res = await testApp.positions[":id"].$patch({
			param: { id: "1" },
			json: { techStack: [{ id: 123123 }] },
		})

		assert.equal(res.status, 400)
	})

	await Promise.all([ok, failNotExist, failNoSuchTech, cannotChangeCompanyId])
})
