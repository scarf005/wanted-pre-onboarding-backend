import { PrismaClient } from "@prisma/client"
import { isMain } from "./is_main"

const titles = {
	wantedBackend: "주니어 백엔드 개발자",
	wantedFrontend: "주니어 프론트엔드 개발자",
	naver: "Django 백엔드 개발자",
} as const

const techs = {
	python: "Python",
	django: "Django",
	postgresql: "PostgreSQL",
	javascript: "Javascript",
	typescript: "Typescript",
} as const

const users = ["철수", "영희"]

const upsertWith = (name: string) => ({ where: { name }, create: { name }, update: {} })
const upsertTech = (prisma: PrismaClient) => (name: string) => prisma.tech.upsert(upsertWith(name))

const upsertCompany = (prisma: PrismaClient) => (name: string) =>
	prisma.company.upsert(upsertWith(name))

export const seedTechs = (prisma: PrismaClient) => async (techs: string[]) =>
	await prisma.$transaction(techs.map(upsertTech(prisma)))

export const seed = async (prisma: PrismaClient) => {
	const now = performance.now()
	const korea = await prisma.country.upsert({
		where: { name: "한국" },
		create: { name: "한국" },
		update: {},
	})
	console.log(`upserted country in ${(performance.now() - now).toFixed()}ms`)
	const [seoul, pangyo] = await prisma.$transaction([
		prisma.region.upsert({
			where: { name_countryId: { countryId: korea.id, name: "서울" } },
			create: { name: "서울", country: { connect: { id: korea.id } } },
			update: {},
		}),
		prisma.region.upsert({
			where: { name_countryId: { countryId: korea.id, name: "판교" } },
			create: { name: "판교", country: { connect: { id: korea.id } } },
			update: {},
		}),
	])
	console.log(`upserted regions in ${(performance.now() - now).toFixed()}ms`)

	const [wantedlab, naver] = await prisma.$transaction([
		...["원티드랩", "네이버"].map(upsertCompany(prisma)),
		...Object.values(techs).map(upsertTech(prisma)),
		...users.map((name, id) =>
			prisma.user.upsert({ where: { id: id + 1 }, create: { name }, update: { name } })
		),
	])
	console.log(`upserted companies, techs, users in ${(performance.now() - now).toFixed()}ms`)

	const wantedBackend = prisma.position.upsert({
		update: {},
		where: {
			title_companyId_regionId: {
				title: titles.wantedBackend,
				companyId: wantedlab.id,
				regionId: seoul.id,
			},
		},
		create: {
			title: titles.wantedBackend,
			description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
			reward: 1500000,
			techStack: { connect: [{ name: techs.typescript }, { name: techs.postgresql }] },
			company: { connect: { name: wantedlab.name } },
			region: { connect: { id: seoul.id } },
		},
	})

	const wantedFrontend = prisma.position.upsert({
		update: {},
		where: {
			title_companyId_regionId: {
				title: titles.wantedFrontend,
				companyId: wantedlab.id,
				regionId: seoul.id,
			},
		},
		create: {
			title: titles.wantedFrontend,
			description: "원티드랩에서 프론트엔드 주니어 개발자를 채용합니다. 자격요건은..",
			reward: 1500000,
			techStack: { connect: [{ name: techs.typescript }, { name: techs.postgresql }] },
			company: { connect: { name: wantedlab.name } },
			region: { connect: { id: seoul.id } },
		},
	})

	const naverBackend = prisma.position.upsert({
		update: {},
		where: {
			title_companyId_regionId: {
				title: titles.naver,
				companyId: naver.id,
				regionId: pangyo.id,
			},
		},
		create: {
			title: titles.naver,
			description: "네이버에서 Django 백엔드 개발자를 채용합니다. 자격요건은..",
			reward: 1000000,
			techStack: {
				connect: [{ name: techs.python }, { name: techs.django }, { name: techs.postgresql }],
			},
			company: { connect: { id: naver.id } },
			region: { connect: { id: pangyo.id } },
		},
	})
	const result = await prisma.$transaction([wantedBackend, wantedFrontend, naverBackend])
	console.log(`upserted positions in ${(performance.now() - now).toFixed()}ms`)
	return result
}

if (isMain(import.meta.url)) {
	const now = performance.now()
	const prisma = new PrismaClient({ errorFormat: "minimal" })
	console.log(`created prisma client in ${(performance.now() - now).toFixed()}ms`)
	const result = await seed(prisma)

	console.log(result)
}
