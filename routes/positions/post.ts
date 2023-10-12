import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { PositionMutationSchema } from "./validators/position_mutation.ts"

const bodyValidator = zValidator("json", PositionMutationSchema)

export const post = (prisma: PrismaClient) =>
	new Hono().post("/", bodyValidator, async (c) => {
		const { techStack, ...rest } = c.req.valid("json")

		const result = await prisma.position.create({
			data: { ...rest, techStack: { connect: techStack } },
		})

		return c.jsonT(result)
	})
