import { Server } from "node:http"

import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import { serve } from "@hono/node-server"

import { createHttpTerminator } from "http-terminator"

import { PrismaClient } from "@prisma/client"

import { showUniqueRoutes } from "./utils/unique_routes.ts"
import { isMain } from "./utils/is_main.ts"
import { applications, positions } from "./routes/mod.ts"
import { addGracefulExitListener } from "./utils/graceful_exit.ts"
import { prismaErrorHandler } from "./utils/prisma_error_handler.ts"
import { prettyJson } from "./utils/pretty_json.ts"
import z from "zod"

export type AppType = ReturnType<typeof createApp>

type Option = { prisma: PrismaClient; app: Hono }
export const createApp = ({ prisma, app }: Option) =>
	app
		.route("/positions", positions(prisma))
		.route("/applications", applications(prisma))
		.onError(prismaErrorHandler)

if (isMain(import.meta.url)) {
	const prisma = new PrismaClient({ log: ["error", "warn", "info"] })
	const hono = new Hono().use(logger()).use("*", cors())
		.use("*", prettyJson)

	const app = createApp({ prisma, app: hono })

	showUniqueRoutes(8)(app)

	const port = z.coerce.number().catch(3000).parse(process.env.PORT)
	const server = serve(
		{ fetch: app.fetch, port },
		({ address, port }) => console.log(`Server listening at ${address}:${port}`),
	) as Server

	const terminator = createHttpTerminator({ server })

	addGracefulExitListener(terminator)
}
