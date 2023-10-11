import { spec } from "node:test/reporters"
import { run } from "node:test"
import process from "node:process"
import glob from "tiny-glob"

const files = await glob("**/*_test.ts")

run({ files, concurrency: true })
	.compose(new spec())
	.pipe(process.stdout)
