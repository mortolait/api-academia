import { StudentRepository }from "../repositories/student-repository";

export class DeleteStudentUseCase{
	constructor(private studentRepository: StudentRepository){}

	async execute(id:string){
		const student = await this.studentRepository.deleteById(id);
		return {
			student
		};
	}

}