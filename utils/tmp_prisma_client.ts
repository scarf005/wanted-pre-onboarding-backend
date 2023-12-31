import { execFile as execFileCb } from "node:child_process"
import { promisify } from "node:util"
import fs from "node:fs/promises"
import url from "node:url"

import { Prisma, PrismaClient } from "@prisma/client"

const execFile = promisify(execFileCb)

/**
 * 주어진 DB 경로에 대해 `prisma migrate reset`을 실행합니다.
 *
 * @remarks
 *
 * migration API 부재: https://github.com/prisma/prisma/issues/4703
 */
const migratePrisma = (dbUrl: url.URL) =>
	execFile(
		"pnpm",
		["prisma", "migrate", "reset", "--skip-generate", "--force"],
		{ env: { ...process.env, DATABASE_URL: dbUrl.toString() } },
	)

type Option = {
	silent: boolean
	prismaOptions: Prisma.PrismaClientOptions
}

const defaultOption = {
	silent: true,
	prismaOptions: {},
}

/**
 * 임시 DB 사용 후 {@link PrismaClient}와의 연결을 해제하고 제거합니다.
 *
 * @param dbUrl - 임시로 생성할 DB `file:///tmp/test-db-1234/test-5678.db`
 *
 * @remarks
 *
 * prisma에서 in-memory sqlite DB 사용 불가: https://github.com/prisma/prisma/issues/732
 *
 * @privateRemarks
 *
 * 자원 관리: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management
 */
export const tmpPrismaClient = async (
	dbUrl: url.URL,
	option?: Partial<Option>,
): Promise<{ prisma: PrismaClient } & AsyncDisposable> => {
	const { silent, prismaOptions } = { ...defaultOption, ...option }
	const log = silent ? () => {} : console.debug

	const now = performance.now()
	await migratePrisma(dbUrl)
	const migrate = performance.now()
	log(`migrated prisma client ${dbUrl} in ${(migrate - now).toFixed()}ms`)

	const prisma = new PrismaClient({ ...prismaOptions, datasourceUrl: dbUrl.toString() })
	const connect = performance.now()
	log(`connected prisma client ${dbUrl} in ${(connect - migrate).toFixed()}ms`)

	return {
		prisma,
		async [Symbol.asyncDispose]() {
			log(`disconnecting prisma client ${dbUrl}`)
			await prisma.$disconnect()
			log(`disposing temporary DB ${dbUrl}`)
			await fs.unlink(dbUrl)
		},
	}
}
