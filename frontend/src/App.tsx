import type { AppType } from "../../main.ts"
import { hc, type InferResponseType } from "hono/client"

import "./App.css"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const client = hc<AppType>(`http://localhost:3000`)

export type NonEmpty<T> = Exclude<T, Record<string, never>>
export type Positions = NonEmpty<InferResponseType<typeof client.positions.$get>>
export type Position = NonEmpty<InferResponseType<typeof client.positions[":id"]["$get"]>>

export const useGetPositions = (): Positions => {
	const query = useQuery({
		queryKey: ["positions"],
		queryFn: () => (client.positions.$get({ query: {} })).then((res) => res.json()),
	})

	return query.data ?? []
}

export const useGetPosition = (id: number): Position | undefined => {
	const query = useQuery({
		queryKey: ["positions", id],
		queryFn: () => (client.positions[":id"].$get({ param: { id: id.toString() } }).then((res) =>
			res.json()
		)),
	})
	return query.data
}

export const PositionRow = ({ company, region, title }: Positions[number]) => (
	<>
		<td>{title}</td>
		<td>{company.name}</td>
		<td>{region.name}</td>
	</>
)

export const App = () => {
	const positions = useGetPositions()
	const [positionId, setPositionId] = useState(1)
	const detail = useGetPosition(positionId)
	return (
		<main>
			<section>
				<h2>채용 공고</h2>
				<table>
					<thead>
						<th>포지션</th>
						<th>회사</th>
						<th>지역</th>
					</thead>
					<tbody>
						{positions.map((position) => (
							<tr onClick={() => setPositionId(position.id)}>
								<PositionRow {...position} />
							</tr>
						))}
					</tbody>
				</table>
			</section>
			<section>
				<h2>세부 정보</h2>
				{detail
					? (
						<article>
							<header>
								<h3>{detail.title}</h3>
								<h4>{detail.company.name}</h4>
							</header>

							{detail.description}

							{detail.reward}
						</article>
					)
					: null}
			</section>
		</main>
	)
}
