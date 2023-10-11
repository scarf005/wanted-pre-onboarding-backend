import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { PositionSchema as RawPositionSchema, TechSchema } from "../prisma/generated/zod/index.ts"
import { nonEmpty } from "../non_empty.ts"

const PositionSchema = RawPositionSchema
	.omit({ id: true })
	.extend({ techStack: z.array(nonEmpty(TechSchema)) })

const bodyValidator = zValidator("json", PositionSchema)

export const post = (prisma: PrismaClient) =>
	new Hono()
		.post("/", bodyValidator, async (c) => {
			const { techStack, ...rest } = c.req.valid("json")

			const result = await prisma.position.create({
				data: { ...rest, techStack: { connect: techStack } },
			})

			return c.jsonT(result)
		})
