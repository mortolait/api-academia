import { PrismaStudentRepository } from "../../repositories/prisma/prisma-student-repository"
import { GetContactsById } from "../get-contacts-by-student"

export function makeGetContactsUseCase(){
	const studentRepository = new PrismaStudentRepository();
    const getContactsById = new GetContactsById(studentRepository)
	return getContactsById;
}