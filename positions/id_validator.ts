import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { NumericSchema } from "../data.js"

export const idValidator = zValidator("param", z.object({ id: NumericSchema }))
