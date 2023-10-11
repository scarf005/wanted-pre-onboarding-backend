import { Prisma } from "@prisma/client"

export const fuzzySearch = (search?: string) =>
	search
		? ({
			OR: [
				{ company: { name: { contains: search } } },
				{ title: { contains: search } },
				{ description: { contains: search } },
				{ techStack: { some: { name: { contains: search } } } },
			],
		} satisfies Prisma.PositionWhereInput)
		: undefined
