import { PrismaStudentRepository } from "../../repositories/prisma/prisma-student-repository";
import { GetAllStudentUseCase } from "../get-students";

export function makeGetAllStudentUseCase(){
	const studentRepository = new PrismaStudentRepository();
	const getAllStudentUseCase = new GetAllStudentUseCase(studentRepository);

	return getAllStudentUseCase;
}