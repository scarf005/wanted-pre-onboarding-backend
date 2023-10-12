import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { getSinglePosition } from "./service/get_service.ts"
import { idValidator } from "./validators/id_validator.ts"
import { getAllPositions } from "./service/get_service.ts"

const SearchSchema = z.object({ search: z.string().min(2).optional() })
const searchValidator = zValidator("query", SearchSchema)

export const get = (prisma: PrismaClient) =>
	new Hono()
		.get("/", searchValidator, async (c) => {
			const { search } = c.req.valid("query")
			const result = await getAllPositions(prisma, search)

			return c.jsonT(result)
		})
		.get("/:id", idValidator, async (c) => {
			const { id } = c.req.valid("param")

			const { result, otherPositions } = await getSinglePosition(prisma, id)

			return result ? c.jsonT({ ...result, otherPositions }) : c.notFound()
		})
