import { PrismaClient } from "@prisma/client"
import { Hono } from "hono"

import { get } from "./get.ts"
import { post } from "./post.ts"
import { deletion } from "./deletion.ts"
import { patch } from "./patch.ts"

export const positions = (prisma: PrismaClient) =>
	new Hono()
		.route("/", get(prisma))
		.route("/", post(prisma))
		.route("/", patch(prisma))
		.route("/", deletion(prisma))
