import fs from "node:fs/promises"
import test, { after } from "node:test"
import assert from "node:assert/strict"
import path from "node:path"
import crypto from "node:crypto"
import os from "node:os"
import url from "node:url"

import { Prisma } from "@prisma/client"

import { createApp } from "./main.ts"
import { tmpPrismaClient } from "./tmp_prisma_client.ts"
import { Hono } from "hono/quick"

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "wanted-backend-"))
const dbPath = path.join(tempDir, `test-${crypto.randomUUID()}.db`)
const dbFileUrl = url.pathToFileURL(dbPath)

const serverUrl = "https://localhost:8000"

after(async () => {
	await fs.rmdir(tempDir)
	console.log(`disposed temporary directory ${tempDir}`)
})

test("GET /positions", async (t) => {
	await using client = await tmpPrismaClient(dbFileUrl)
	const { prisma } = client
	const app = createApp({ prisma, app: new Hono() })

	await t.test("전체 포지션 목록", async () => {
		const req = new Request(`${serverUrl}/positions`)

		const res = await app.request(req)
		assert.equal(res.status, 200)

		const prismaRes = await prisma.position.findMany()
		const data = await res.json() as { id: number }[]

		assert.equal(data.length, prismaRes.length)
	})

	await t.test("포지션 검색", async () => {
		const req = new Request(`${serverUrl}/positions?search=네이버`)

		const res = await app.request(req)
		assert.equal(res.status, 200)

		const json = await res.json() as unknown[]
		assert.notEqual(json.length, 0)
	})
})

test("GET /positions/:id", async (t) => {
    await using client = await tmpPrismaClient(dbFileUrl)
    const { prisma } = client
    const app = createApp({ prisma, app: new Hono() })

	const req = new Request(`${serverUrl}/positions/1`)

    const res = await app.request(req)
    assert.equal(res.status, 200)

    const json = await res.json() as { id: number, otherPositions: { id: number }[] }
})

test("POST /positions", async (t) => {
	await using client = await tmpPrismaClient(dbFileUrl)
	const { prisma } = client
	const app = createApp({ prisma, app: new Hono() })

	const position: Prisma.PositionCreateInput = {
		title: "주니어 프론트엔드 개발자",
		description: "타입스크립트를 잘 쓰는 사람을 모집합니다.",
		region: { connect: { id: 1 } },
		company: { connect: { id: 1 } },
		techStack: { connect: [{ id: 5 }] },
	}

	await t.test("올바르지 않은 포맷", async () => {
		const req = new Request(`${serverUrl}/positions`, {
			method: "POST",
			body: JSON.stringify({ ...position, title: undefined }),
		})

		const res = await app.request(req)
		assert.equal(res.status, 400)
	})

	await t.test("요청", async (t) => {
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
})
