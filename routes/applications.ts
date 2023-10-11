import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"

import { ApplicationSchema } from "../prisma/generated/zod/index.ts"

const bodyValidator = zValidator("json", ApplicationSchema.omit({ id: true }))

export const applications = (prisma: PrismaClient) =>
	new Hono().post("/", bodyValidator, async (c) => {
		const data = c.req.valid("json")

		const result = await prisma.application.create({ data })

		return c.jsonT(result)
	})
