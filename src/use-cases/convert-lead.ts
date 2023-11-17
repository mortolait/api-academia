import { StudentRepository } from "@/repositories/student-repository";

export class ConvertLeadUseCase{
    constructor(private studentRepository: StudentRepository){}

    async execute(id: string){
        const student =  await this.studentRepository.convertLead(id);
        if(!student){
            throw new Error("Student not found");
        }
        return {
            student
        };
    }
}