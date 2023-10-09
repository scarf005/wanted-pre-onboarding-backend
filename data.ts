import { z } from "zod"

export const NumericSchema = z.string().regex(/^\d+$/gm).transform((x) => Number(x))
export const IntSchema = z.number().int().nonnegative()
