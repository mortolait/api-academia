import { FastifyInstance } from "fastify";
import { create } from "./register-student";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { getStudentById } from "./get-students-by-id";
import { getStudents } from "./get-students";
import { deleteStudentById } from "./delete-student-by-id";
import { updateStudent } from "./update-student";
import { checkEmailExists } from "./check-email-exists";
import { getStudentByPartName } from "./get-student-by-part-name";
import { addNewContact } from "./add-new-contact";
import { getContactsById } from "./get-contacts-by-id";
import { convertLead } from "./convert-lead";

export async function studentRoutes(app: FastifyInstance){
	app.addHook("onRequest", verifyJwt);
	app.post("/students", {onRequest: [verifyUserRole("ADMIN")]},create);
	app.get("/students", {onRequest: [verifyUserRole("ADMIN")]},getStudents);
	app.get("/students/:id", {onRequest: [verifyUserRole("ADMIN")]},getStudentById);
	app.put("/students/:id", {onRequest: [verifyUserRole("ADMIN")]},updateStudent);
	app.delete("/students/:id", {onRequest: [verifyUserRole("ADMIN")]},deleteStudentById);
	app.post("/students/email",{onRequest: [verifyUserRole("ADMIN")]},checkEmailExists);
	app.get("/student/:part_name",{onRequest: [verifyUserRole("ADMIN")]},getStudentByPartName);
	app.post("/student/new-contact", {onRequest: [verifyUserRole("ADMIN")]},addNewContact)
	app.get("/student/contacts/:id",{onRequest: [verifyUserRole("ADMIN")]}, getContactsById)
	app.put("/students/convert/:id",{onRequest: [verifyUserRole("ADMIN")]}, convertLead)
}	
