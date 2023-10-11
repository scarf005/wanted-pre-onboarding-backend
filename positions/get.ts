import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { getSinglePosition } from "../service.ts"
import { fuzzySearch } from "../fuzzy_search.ts"
import { select } from "../select.ts"
import { idValidator } from "./id_validator.ts"

const SearchSchema = z.object({ search: z.string().min(2).optional() })
const searchValidator = zValidator("query", SearchSchema)

export const get = (prisma: PrismaClient) =>
	new Hono()
		.get("/", searchValidator, async (c) => {
			const { search } = c.req.valid("query")

			const result = await prisma.position.findMany({ select, where: fuzzySearch(search) })

			return c.jsonT(result)
		})
		.get("/:id", idValidator, async (c) => {
			const id = c.req.valid("param").id

			const { result, otherPositions } = await getSinglePosition(prisma, id)

			return result ? c.jsonT({ ...result, otherPositions }) : c.notFound()
		})
