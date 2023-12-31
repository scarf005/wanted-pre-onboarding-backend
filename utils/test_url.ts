import crypto from "node:crypto"
import url from "node:url"
import path from "node:path"
import os from "node:os"

export const tempDbFileUrl = () =>
	url.pathToFileURL(path.join(os.tmpdir(), `test-${crypto.randomUUID()}.db`))
