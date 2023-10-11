import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

export const NumericSchema = z.string().regex(/^\d+$/gm).transform((x) => Number(x))
export const idValidator = zValidator("param", z.object({ id: NumericSchema }))
