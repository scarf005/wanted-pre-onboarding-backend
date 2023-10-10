import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { zValidator } from "@hono/zod-validator"
import { Prisma, PrismaClient } from "@prisma/client"
import { serve } from "@hono/node-server"
import { z } from "zod"

import {
	PositionCreateInputSchema,
	PositionUpdateWithoutCompanyInputSchema,
} from "./prisma/generated/zod/index.ts"

import { NumericSchema } from "./data"
import { createHttpTerminator } from "http-terminator"
import { Server } from "node:http"
import { showUniqueRoutes } from "./unique_routes.ts"
import { isMain } from "./is_main.ts"

const select = {
	id: true,
	title: true,
	reward: true,
	techStack: true,
	company: true,
	region: true,
} satisfies Prisma.PositionSelect

const fuzzySearch = (search?: string) =>
	search
		? ({
			OR: [
				{ company: { name: { contains: search } } },
				{ title: { contains: search } },
				{ description: { contains: search } },
				{ techStack: { some: { name: { contains: search } } } },
			],
		} satisfies Prisma.PositionWhereInput)
		: undefined

type Option = { prisma: PrismaClient; app: Hono }
export const createApp = ({ prisma, app }: Option) => {
	app.post(
		"/positions",
		zValidator("json", PositionCreateInputSchema),
		async (c) => {
			const data = c.req.valid("json")
			const result = await prisma.position.create({ data })

			return c.jsonT(result)
		},
	)
	app.patch(
		"/positions/:id",
		zValidator("param", z.object({ id: NumericSchema })),
		zValidator("json", PositionUpdateWithoutCompanyInputSchema),
		async (c) => {
			const { id } = c.req.valid("param")
			const data = c.req.valid("json")

			const result = await prisma.position.update({ where: { id }, data })

			return c.jsonT(result)
		},
	)
	app.delete(
		"/positions/:id",
		zValidator("param", z.object({ id: NumericSchema })),
		async (c) => {
			const { id } = c.req.valid("param")

			const result = await prisma.position.delete({ where: { id } })

			return c.jsonT(result)
		},
	)
	app.get(
		"/positions",
		zValidator("query", z.object({ search: z.string().min(2).optional() })),
		async (c) => {
			const { search } = c.req.valid("query")

			const result = await prisma.position.findMany({ select, where: fuzzySearch(search) })

			return c.jsonT(result)
		},
	)
	app.get(
		"/positions/:id",
		zValidator("param", z.object({ id: NumericSchema })),
		async (c) => {
			const id = c.req.valid("param").id

			const result = await prisma.position.findUnique({
				where: { id },
				select: { ...select, description: true },
			})
			const otherPositions = await prisma.position.findMany({
				where: { company: { id: result?.company.id }, NOT: { id: result?.id } },
				select: { id: true },
			})

			return result ? c.jsonT({ ...result, otherPositions }) : c.notFound()
		},
	)

	return app
}

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

	const events = ["beforeExit", "rejectionHandled", "uncaughtException", "exit"] // list all the process events here...
	events.forEach((event) =>
		process.on(event, async (e) => {
			console.log(`process.on ${event}`, e)
			await terminator.terminate()
		})
	)
}
