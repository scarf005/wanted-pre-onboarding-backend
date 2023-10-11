import { PrismaClient } from "@prisma/client"
import { Hono } from "hono"
import { get } from "./get"
import { post } from "./post"

export const positions = (prisma: PrismaClient) =>
	new Hono()
		.route("/", get(prisma))
		.route("/", post(prisma))
