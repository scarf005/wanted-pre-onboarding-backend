import test from "node:test"
import { deepEqual } from "node:assert/strict"

import { Prisma, PrismaClient } from "@prisma/client"
import { createApp } from "./main.ts"

const url = "https://localhost:8000"

test("POST /positions", async (t) => {
	const prisma = new PrismaClient()
	const app = createApp(prisma)

	await t.test("올바르지 않은 포맷", async () => {
		const req = new Request(`${url}/positions`, {
			method: "POST",
			body: JSON.stringify({
				company_id: "1",
				position: "백엔드 주니어 개발자",
				description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
				tech_stack: ["Python", "Django", "PostgreSQL"],
				reward: 1500000,
			}),
		})

		const res = await app.request(req)
		deepEqual(res.status, 400)
	})
	await t.test("요청", async (t) => {
		const position = {
			company_id: 1,
            country: "한국",
			region: "서울",
			position: "백엔드 주니어 개발자",
			description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
			tech_stack: "Python",
			reward: 1500000,
		}

		const req = new Request(`${url}/positions`, {
			method: "POST",
			body: JSON.stringify(position),
		})
		const res = await app.request(req)

		deepEqual(res.status, 200)

		await t.test("새로운 포지션이 올바르게 추가됨", async () => {
			const req = new Request(`${url}/positions`, { method: "GET" })

			const res = await app.request(req)
			deepEqual(res.status, 200)

			const data = await res.json()
			deepEqual(data.length, 3)
			assertObjectMatch(data[2], position)
		})
	})
})
