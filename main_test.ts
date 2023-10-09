import { assertEquals } from "https://deno.land/std@0.203.0/assert/mod.ts"
import { createApp } from "./app.ts"
import type { PositionReq } from "./data.ts"
import { assertObjectMatch } from "https://deno.land/std@0.203.0/assert/assert_object_match.ts"

const url = "https://localhost:8000"

Deno.test("POST /positions", async (t) => {
	const app = createApp()

	await t.step("올바르지 않은 포맷", async () => {
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
		assertEquals(res.status, 400)
	})
	await t.step("요청", async (t) => {
		const position: PositionReq = {
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

		assertEquals(res.status, 200)

		await t.step("새로운 포지션이 올바르게 추가됨", async () => {
			const req = new Request(`${url}/positions`, { method: "GET" })

			const res = await app.request(req)
			assertEquals(res.status, 200)

			const data = await res.json()
			assertEquals(data.length, 3)
			assertObjectMatch(data[2], position)
		})
	})
})
