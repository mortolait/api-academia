import { StudentRepository } from "../repositories/student-repository";
import { Student } from "@prisma/client";

interface StudentUseCaseResponse{
    student: Student | null
}
export class GetStudentByIdUseCase{
	constructor(private studentRepository: StudentRepository){}

	async execute(id: string): Promise<StudentUseCaseResponse>{
		const student = await this.studentRepository.findById(id);
		return {
			student
		};
	}
}