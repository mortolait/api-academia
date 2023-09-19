import { FastifyInstance } from "fastify";
import { create } from "./register-student";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { getStudentById } from "./get-students-by-id";
import { getStudents } from "./get-students";
import { deleteStudentById } from "./delete-student-by-id";

export async function studentRoutes(app: FastifyInstance){
	app.addHook("onRequest", verifyJwt);
	app.post("/students", {onRequest: [verifyUserRole("ADMIN")]},create);
	app.get("/students", {onRequest: [verifyUserRole("ADMIN")]},getStudents);
	app.get("/students/:id", {onRequest: [verifyUserRole("ADMIN")]},getStudentById);
	app.delete("/students/:id", {onRequest: [verifyUserRole("ADMIN")]},deleteStudentById);
}	
