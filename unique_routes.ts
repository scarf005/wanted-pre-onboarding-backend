import { Hono } from "hono"

export const uniqueBy = <T>(xs: T[], key: (x: T) => keyof any) =>
	Array.from(new Map(xs.map((x) => [key(x), x])).values())

export const uniqueRoutes = (app: Hono) =>
	uniqueBy(app.routes, (route) => `${route.path}${route.method}`)

export const showUniqueRoutes = (len: number) => (app: Hono) =>
	console.log(
		uniqueRoutes(app)
			.map((route) =>
				`\x1B[32m${route.method}\x1B[0m ${" ".repeat(len - route.method.length)} ${route.path}`
			)
			.join("\n"),
	)
