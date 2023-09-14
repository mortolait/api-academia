import { FastifyInstance } from "fastify";
import { create } from "./register-student";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function studentRoutes(app: FastifyInstance){
	app.addHook("onRequest", verifyJwt);
	
	app.post("/students", {onRequest: [verifyUserRole("ADMIN")]}, create);
}	
