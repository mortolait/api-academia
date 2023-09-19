import { StudentRepository } from "../repositories/student-repository";

export class GetAllStudentUseCase{
	constructor(private studentRepository: StudentRepository){}

	async execute(id:string){
		const students = await this.studentRepository.findAll(id);
		return {
			students
		};
	}
}