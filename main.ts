import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { zValidator } from "@hono/zod-validator"
import { Prisma, PrismaClient } from "@prisma/client"
import { serve } from "@hono/node-server"
import { z } from "zod"

import { ApplicationSchema, PositionSchema } from "./prisma/generated/zod/index.ts"

import { NumericSchema } from "./data"
import { createHttpTerminator } from "http-terminator"
import { Server } from "node:http"
import { showUniqueRoutes } from "./unique_routes.ts"
import { isMain } from "./is_main.ts"
import { positions } from "./positions/mod.ts"

type Option = { prisma: PrismaClient; app: Hono }
export const createApp = ({ prisma, app }: Option) =>
	app
		.post("/applications", zValidator("json", ApplicationSchema.omit({ id: true })), async (c) => {
			const data = c.req.valid("json")

			const result = await prisma.application.create({ data })

			return c.jsonT(result)
		})
        .route("/positions", positions(prisma))
		.patch(
			"/positions/:id",
			zValidator("param", z.object({ id: NumericSchema })),
			zValidator("json", PositionSchema.omit({ id: true, companyId: true }).partial().strict()),
			async (c) => {
				const { id } = c.req.valid("param")
				const data = c.req.valid("json")

				const result = await prisma.position.update({ where: { id }, data })

				return c.jsonT(result)
			},
		)
		.delete(
			"/positions/:id",
			zValidator("param", z.object({ id: NumericSchema })),
			async (c) => {
				const { id } = c.req.valid("param")

				const result = await prisma.position.delete({ where: { id } })

				return c.jsonT(result)
			},
		)
		.onError((error, c) => {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.log("prisma known request error")
				return c.json({ success: false, error }, 400)
			}
			if (error instanceof Prisma.PrismaClientValidationError) {
				console.log("prisma validation error")
				return c.json(error, 400)
			}
			console.log("unknown error")
			return c.text(error.message, 500)
		})

if (isMain(import.meta.url)) {
	const prisma = new PrismaClient()
	const hono = new Hono().use(logger()).use("/*", cors())
	const app = createApp({ prisma, app: hono })

	showUniqueRoutes(8)(app)

	const server = serve(
		{ fetch: app.fetch, port: 3000 },
		({ address, port }) => console.log(`Server listening at ${address}:${port}`),
	) as Server

	const terminator = createHttpTerminator({ server })

	const events = ["SIGTERM", "beforeExit", "rejectionHandled", "uncaughtException", "exit"]
	events.forEach((event) =>
		process.on(event, async (e) => {
			console.log(`process.on ${event}`, e)
			await terminator.terminate()
		})
	)
}
