import { FastifyInstance } from "fastify";
import { register } from "./register-user";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance){
	app.post("/users", register);
	app.post("/sessions", authenticate);
	app.patch("/token/refresh", refresh);
}