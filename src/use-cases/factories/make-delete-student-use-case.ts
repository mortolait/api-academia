import { PrismaStudentRepository } from "@/repositories/prisma/prisma-student-repository";
import { DeleteStudentUseCase } from "../delete-student";

export function makeDeleteStudentUseCase(){
	const studentRepository = new PrismaStudentRepository();
	const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);
	return deleteStudentUseCase;
}