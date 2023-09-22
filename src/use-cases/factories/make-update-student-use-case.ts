import { PrismaStudentRepository } from "../../repositories/prisma/prisma-student-repository";
import { UpdateStudentById } from "../update-student-by-id";

export function makeUpdateStudentUseCase(){
	const studentRepository = new PrismaStudentRepository();
	const updateStudentUseCase = new UpdateStudentById(studentRepository);
    
	return updateStudentUseCase;
}