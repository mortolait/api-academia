import { PrismaStudentRepository } from "../../repositories/prisma/prisma-student-repository";
import { RegisterStudentUseCase } from "../register-student";   

export function makeRegisterStudentUseCase(){
	const studentRepository = new PrismaStudentRepository();
	const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);
	return registerStudentUseCase;
}