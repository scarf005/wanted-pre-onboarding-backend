import { Hono } from "npm:hono@3.7.5"
import { zValidator } from "npm:@hono/zod-validator@0.1.9"
import { z } from "npm:zod@3.22.4"
import { numericSchema, positions, positionSchema } from "./data.ts"

export const createApp = () => {
	const app = new Hono()

	app.post(
		"/positions",
		zValidator("json", positionSchema),
		(c) => {
			const position = c.req.valid("json")
			const result = { ...position, id: positions.length + 1 }
			positions.push(result)

			return c.json(result)
		},
	)
	app.patch(
		"/positions/:id",
		zValidator("param", z.object({ id: numericSchema })),
		zValidator("json", positionSchema.omit({ company_id: true })),
		(c) => c.text("Hello Hono!"),
	)
	app.delete(
		"/positions/:id",
		zValidator("param", z.object({ id: numericSchema })),
		(c) => {
			const id = c.req.valid("param").id
			const [removed] = positions.splice(id, 1)

			return c.json(removed)
		},
	)
	app.get(
		"/positions",
		(c) => c.json(positions),
	)
	app.get(
		"/positions/:id",
		zValidator("param", z.object({ id: numericSchema })),
		(c) => {
			const id = c.req.valid("param").id

			return c.json(positions.find((x) => x.id === id))
		},
	)

	return app
}

if (import.meta.main) {
	const req = new Request(`https://localhost:8080/positions/1`, {
		method: "DELETE",
	})
	const app = createApp()
	const res = await app.request(req)
	console.log(res)
	// Deno.serve(app.fetch)
}
