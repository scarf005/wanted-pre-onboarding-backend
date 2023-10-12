import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { idValidator } from "./validators/id_validator.ts"
import { PositionMutationSchema } from "./validators/position_mutation.ts"

const PositionSchema = PositionMutationSchema
	.omit({ companyId: true })
	.partial()

const bodyValidator = zValidator("json", PositionSchema)

export const patch = (prisma: PrismaClient) =>
	new Hono().patch("/:id", idValidator, bodyValidator, async (c) => {
		const { id } = c.req.valid("param")
		const { techStack, ...rest } = c.req.valid("json")

		const result = await prisma.position.update({
			where: { id },
			data: { ...rest, techStack: { set: techStack } },
		})
		return c.jsonT(result)
	})
