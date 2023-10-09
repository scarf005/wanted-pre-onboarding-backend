import { fileURLToPath } from "node:url"

export const isMain = (url: string) =>
	url.startsWith("file:") && fileURLToPath(url) === process.argv[1]
