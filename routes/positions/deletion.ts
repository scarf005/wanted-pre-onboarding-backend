import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { idValidator } from "./validators/id_validator.ts"

export const deletion = (prisma: PrismaClient) =>
	new Hono().delete("/:id", idValidator, async (c) => {
		const { id } = c.req.valid("param")

		const result = await prisma.position.delete({ where: { id } })

		return c.jsonT(result)
	})
