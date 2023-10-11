import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { zValidator } from "@hono/zod-validator"
import { Prisma, PrismaClient } from "@prisma/client"
import { serve } from "@hono/node-server"
import { z } from "zod"

import { ApplicationSchema, PositionSchema, TechSchema } from "./prisma/generated/zod/index.ts"

import { NumericSchema } from "./data"
import { createHttpTerminator } from "http-terminator"
import { Server } from "node:http"
import { showUniqueRoutes } from "./unique_routes.ts"
import { isMain } from "./is_main.ts"
import { getSinglePosition } from "./service.ts"
import type { NonEmptyObject } from "type-fest"

export const select = {
	id: true,
	title: true,
	reward: true,
	techStack: true,
	company: true,
	region: true,
} satisfies Prisma.PositionSelect

export const fuzzySearch = (search?: string) =>
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

export const nonEmpty = <Schema extends z.AnyZodObject>(schema: Schema) =>
	schema.partial().refine(
		(v): v is NonEmptyObject<Partial<Schema["_type"]>> => Object.keys(v).length !== 0,
		{ message: `최소 ${Object.keys(schema.shape)}중 하나의 필드가 필요합니다.` },
	)

type Option = { prisma: PrismaClient; app: Hono }
export const createApp = ({ prisma, app }: Option) =>
	app
		.post("/applications", zValidator("json", ApplicationSchema.omit({ id: true })), async (c) => {
			const data = c.req.valid("json")

			const result = await prisma.application.create({ data })

			return c.jsonT(result)
		})
		.post(
			"/positions",
			zValidator(
				"json",
				PositionSchema
					.omit({ id: true })
					.extend({ techStack: z.array(nonEmpty(TechSchema)) }),
			),
			async (c) => {
				const { techStack, ...rest } = c.req.valid("json")
				const result = await prisma.position.create({
					data: { ...rest, techStack: { connect: techStack } },
				})

				return c.jsonT(result)
			},
		)
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
		.get(
			"/positions",
			zValidator("query", z.object({ search: z.string().min(2).optional() })),
			async (c) => {
				const { search } = c.req.valid("query")

				const result = await prisma.position.findMany({ select, where: fuzzySearch(search) })

				return c.jsonT(result)
			},
		)
		.get(
			"/positions/:id",
			zValidator("param", z.object({ id: NumericSchema })),
			async (c) => {
				const id = c.req.valid("param").id

				const { result, otherPositions } = await getSinglePosition(prisma, id)
				return result ? c.jsonT({ ...result, otherPositions }) : c.notFound()
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
