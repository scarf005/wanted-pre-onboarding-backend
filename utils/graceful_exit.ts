import { HttpTerminator } from "http-terminator"

const events = ["SIGTERM", "beforeExit", "rejectionHandled", "uncaughtException", "exit"] as const

export const addGracefulExitListener = (terminator: HttpTerminator) =>
	events.forEach((event) => process.on(event, () => terminator.terminate()))
