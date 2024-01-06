import { Prisma } from '@prisma/client';
import { StudentRepository } from '../repositories/student-repository'
import { string } from 'zod';


interface bodySchemaRequest{
    id_student: string,
    type: string,
    subject?: string
    content: string
    id_user: string
}
export class RegisterNewContactWithStudent{
    constructor(private studentRepository:StudentRepository ){}

    async execute(data: bodySchemaRequest){
        const newContactWithStudent = await this.studentRepository.addNewContact(data)
        return {
            newContactWithStudent
        }
    }

}