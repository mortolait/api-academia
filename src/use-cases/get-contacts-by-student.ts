import { StudentRepository } from "@/repositories/student-repository";

export class GetContactsById{
    constructor(private studentRepository: StudentRepository){}

    async execute(id: string){
        const contacts = await this.studentRepository.getContactsById(id)
        return {
            contacts
        }
    }

}