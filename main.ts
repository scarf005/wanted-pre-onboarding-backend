import { Server } from "node:http"

import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import { zValidator } from "@hono/zod-validator"
import { serve } from "@hono/node-server"

import { createHttpTerminator } from "http-terminator"

import { Prisma, PrismaClient } from "@prisma/client"
import { ApplicationSchema } from "./prisma/generated/zod/index.ts"

import { showUniqueRoutes } from "./unique_routes.ts"
import { isMain } from "./is_main.ts"
import { positions } from "./positions/mod.ts"
import { addGracefulExitListener } from "./graceful_exit.ts"

type Option = { prisma: PrismaClient; app: Hono }
export const createApp = ({ prisma, app }: Option) =>
	app
		.post("/applications", zValidator("json", ApplicationSchema.omit({ id: true })), async (c) => {
			const data = c.req.valid("json")

			const result = await prisma.application.create({ data })

			return c.jsonT(result)
		})
		.route("/positions", positions(prisma))
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

	addGracefulExitListener(terminator)
}
