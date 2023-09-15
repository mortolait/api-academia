import { StudentRepository } from "@/repositories/student-repository";

export class GetAllStudentUseCase{
	constructor(private studentRepository: StudentRepository){}

	async execute(){
		const students = await this.studentRepository.findAll();
		return {
			students
		};
	}
}