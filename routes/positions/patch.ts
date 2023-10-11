import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { PositionSchema as RawPositionSchema } from "../../prisma/generated/zod/index.ts"
import { idValidator } from "./validators/id_validator.ts"

const PositionSchema = RawPositionSchema
	.omit({ id: true, companyId: true }).partial().strict()

const bodyValidator = zValidator("json", PositionSchema)

export const patch = (prisma: PrismaClient) =>
	new Hono().patch("/:id", idValidator, bodyValidator, async (c) => {
		const { id } = c.req.valid("param")
		const data = c.req.valid("json")

		const result = await prisma.position.update({ where: { id }, data })

		return c.jsonT(result)
	})
