import { StudentRepository } from "../repositories/student-repository"

export class GetStudentByName{
    constructor(private studentRrepository:StudentRepository){}

    async execute(user_id: string, namePart:string){
        const students = await this.studentRrepository.FindByName(user_id,namePart)
        return students
    }
}