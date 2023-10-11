import { PrismaClient } from "@prisma/client"
import { select } from "./select"

export const getSinglePosition = async (prisma: PrismaClient, id: number) => {
	const result = await prisma.position.findUnique({
		where: { id },
		select: { ...select, description: true },
	})
	const otherPositions = await prisma.position.findMany({
		where: { company: { id: result?.company.id }, NOT: { id: result?.id } },
		select: { id: true },
	})
	return { result, otherPositions }
}
