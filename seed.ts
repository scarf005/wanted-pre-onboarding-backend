import { Prisma, PrismaClient } from "@prisma/client"
import { fileURLToPath } from "node:url"
import { isMain } from "./is_main"

const titles = {
	wanted: "주니어 백엔드 개발자",
	naver: "Django 백엔드 개발자",
} as const

const techs = {
	python: "Python",
	django: "Django",
	postgresql: "PostgreSQL",
	javascript: "Javascript",
	typescript: "Typescript",
} as const

export const seed = async (prisma: PrismaClient) => {
	const upsertWith = (name: string) => ({ where: { name }, create: { name }, update: {} })

	const upsertTech = (name: string) => prisma.tech.upsert(upsertWith(name))
	const upsertCompany = (name: string) => prisma.company.upsert(upsertWith(name))

	const korea = await prisma.country.upsert({
		where: { name: "한국" },
		create: { name: "한국" },
		update: {},
	})

	const seoul = await prisma.region.upsert({
		where: { name_countryId: { countryId: korea.id, name: "서울" } },
		create: { name: "서울", country: { connect: { id: korea.id } } },
		update: {},
	})

	const pangyo = await prisma.region.upsert({
		where: { name_countryId: { countryId: korea.id, name: "판교" } },
		create: { name: "판교", country: { connect: { id: korea.id } } },
		update: {},
	})

	const wantedlab = await upsertCompany("원티드랩")
	const naver = await upsertCompany("네이버")

	await prisma.$transaction(Object.values(techs).map(upsertTech))

	const wantedBackend = await prisma.position.upsert({
		update: {},
		where: {
			title_companyId_regionId: {
				title: titles.wanted,
				companyId: wantedlab.id,
				regionId: seoul.id,
			},
		},
		create: {
			title: titles.wanted,
			description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
			reward: 1500000,
			techStack: { connect: [{ name: techs.typescript }, { name: techs.postgresql }] },
			company: { connect: { id: wantedlab.id } },
			region: { connect: { id: seoul.id } },
		},
	})

	const naverBackend = await prisma.position.upsert({
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
	return { wantedBackend, naverBackend }
}

if (isMain(import.meta.url)) {
	const prisma = new PrismaClient()
	const result = await seed(prisma)

	console.log(result)
}
