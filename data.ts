import { z } from "npm:zod@3.22.4"

type Won = number
type CompanyId = number
type Company = {
	id: CompanyId
	name: string
}
type PositionID = number
type Position = { id: PositionID } & PositionReq
type PositionRes = Omit<Position, "company_id"> & { company: Company }

// 1. POST /positions
// 2. PATCH /positions/{id}
// 3. DELETE /positions/{id}
// 4. GET /positions
// 쿼리 파라미터:
//     search: string
// 5. GET /positions/{id}
// 6. PUT /applications/
const companies: Company[] = [
	{ id: 1, name: "원티드랩" },
	{ id: 2, name: "네이버" },
]
export const positions: Position[] = [
	{
		id: 1,
		company_id: 1,
		country: "한국",
		region: "서울",
		position: "백엔드 주니어 개발자",
		description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
		tech_stack: "Python",
		reward: 1500000,
	},
	{
		id: 2,
		company_id: 2,
		country: "한국",
		region: "판교",
		position: "프론트엔드 주니어 개발자",
		description: "네이버에서 프론트엔드 주니어 개발자를 채용합니다. 자격요건은..",
		tech_stack: "JavaScript",
		reward: null,
	},
]

export const numericSchema = z.string().regex(/^\d+$/gm).transform((x) => Number(x))
const idSchema = z.number().int().nonnegative()
const strSchema = (length: number) =>
	z.string().min(length, `최소 ${length}글자 이상 입력해주세요.`)

export type PositionReq = z.infer<typeof positionSchema>

export const positionSchema = z.object({
	company_id: idSchema,

	country: strSchema(2),
	region: strSchema(2),

	position: strSchema(2),
	description: strSchema(10),

	tech_stack: strSchema(2),
	// tech_stack: z.array(strSchema(5)).min(1, "최소 1개 이상 입력해주세요."),

	reward: idSchema.nullable().default(null),
})
