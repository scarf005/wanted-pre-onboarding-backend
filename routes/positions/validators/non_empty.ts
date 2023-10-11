import { z } from "zod"
import type { NonEmptyObject } from "type-fest"

export const nonEmpty = <Schema extends z.AnyZodObject>(schema: Schema) =>
	schema.partial().refine(
		(v): v is NonEmptyObject<Partial<Schema["_type"]>> => Object.keys(v).length !== 0,
		{ message: `최소 ${Object.keys(schema.shape)}중 하나의 필드가 필요합니다.` },
	)
