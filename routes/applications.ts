import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { Hono } from "hono"
import { ApplicationSchema } from "../prisma/generated/zod"

const applyValidator = zValidator("json", ApplicationSchema.omit({ id: true }))

export const applications = (prisma: PrismaClient) =>
	new Hono().post("/", applyValidator, async (c) => {
		const data = c.req.valid("json")

		const result = await prisma.application.create({ data })

		return c.jsonT(result)
	})
