import { PrismaClient } from "@prisma/client"
import { Hono } from "hono"
import { get } from "./get"
import { post } from "./post"
import { deletion } from "./deletion"
import { patch } from "./patch"

export const positions = (prisma: PrismaClient) =>
	new Hono()
		.route("/", get(prisma))
		.route("/", post(prisma))
        .route("/", patch(prisma))
        .route("/", deletion(prisma))
