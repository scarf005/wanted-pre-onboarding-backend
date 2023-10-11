import { Server } from "node:http"

import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import { serve } from "@hono/node-server"

import { createHttpTerminator } from "http-terminator"

import { PrismaClient } from "@prisma/client"

import { showUniqueRoutes } from "./unique_routes.ts"
import { isMain } from "./is_main.ts"
import { positions } from "./positions/mod.ts"
import { addGracefulExitListener } from "./graceful_exit.ts"
import { applications } from "./applications.ts"
import { prismaErrorHandler } from "./prisma_error_handler.ts"

type Option = { prisma: PrismaClient; app: Hono }
export const createApp = ({ prisma, app }: Option) =>
	app
		.route("/applications", applications(prisma))
		.route("/positions", positions(prisma))
		.onError(prismaErrorHandler)

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
