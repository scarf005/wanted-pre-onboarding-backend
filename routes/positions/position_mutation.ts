import { z } from "zod"
import { PositionSchema, TechSchema } from "../../prisma/generated/zod/index.ts"
import { nonEmpty } from "./validators/non_empty.ts"

export const PositionMutationSchema = PositionSchema
	.omit({ id: true })
	.extend({ techStack: z.array(nonEmpty(TechSchema)) })
	.strict()
