import { PrismaStudentRepository } from "../../repositories/prisma/prisma-student-repository"; 
import { GetStudentByIdUseCase } from "../get-student-by-id";

export function makeGetStudentByIdUseCase(){
	const studentRepository = new PrismaStudentRepository();
	const getStudentByIdUseCase = new GetStudentByIdUseCase(studentRepository);
	return getStudentByIdUseCase;
}