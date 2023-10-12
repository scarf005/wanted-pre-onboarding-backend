import { z } from "zod"
import { PositionSchema, TechSchema } from "../../../prisma/generated/zod/index.ts"

export const PositionMutationSchema = PositionSchema
	.omit({ id: true })
	.extend({ techStack: z.array(TechSchema.pick({ id: true })) })
	.strict()
