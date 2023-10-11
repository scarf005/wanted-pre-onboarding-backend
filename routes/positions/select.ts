import { Prisma } from "@prisma/client"

export const select = {
	id: true,
	title: true,
	reward: true,
	techStack: true,
	company: true,
	region: true,
} satisfies Prisma.PositionSelect
