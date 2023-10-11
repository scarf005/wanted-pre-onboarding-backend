import { Hono } from "hono"

export const uniqueBy = <T>(xs: T[], key: (x: T) => keyof any) =>
	Array.from(new Map(xs.map((x) => [key(x), x])).values())

export const uniqueRoutes = (app: Hono) =>
	uniqueBy(app.routes, (route) => `${route.path}${route.method}`)

const methodOrders = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]

const methodOrder = (s: string) => {
	const index = methodOrders.indexOf(s)
	return index === -1 ? Infinity : index
}

const cmpMethod = (a: string, b: string) => methodOrder(a) - methodOrder(b)

export const showUniqueRoutes = (len: number) => (app: Hono) =>
	console.log(
		uniqueRoutes(app)
			.toSorted((a, b) => a.path.localeCompare(b.path) || cmpMethod(a.method, b.method))
			.map((route) =>
				`\x1B[32m${route.method}\x1B[0m ${" ".repeat(len - route.method.length)} ${route.path}`
			)
			.join("\n"),
	)
