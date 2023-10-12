import { Context, MiddlewareHandler } from "hono"

const isJson = (c: Context) => c.res.headers.get("Content-Type")?.startsWith("application/json")
export const prettyJson: MiddlewareHandler = async (c, next) => {
	await next()
	if (isJson(c)) {
		const body = await c.res.json()
		c.res = new Response(JSON.stringify(body, null, 2), c.res)
	}
}
