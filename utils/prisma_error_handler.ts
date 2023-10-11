import { Context } from "hono"
import { Prisma } from "@prisma/client"

export const prismaErrorHandler = (error: Error, c: Context) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.log("prisma known request error")
		return c.json({ success: false, error }, 400)
	}
	if (error instanceof Prisma.PrismaClientValidationError) {
		console.log("prisma validation error")
		return c.json({ success: false, error }, 400)
	}
	return c.text(error.message, 500)
}
