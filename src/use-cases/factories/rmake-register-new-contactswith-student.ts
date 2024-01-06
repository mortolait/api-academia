import { PrismaStudentRepository } from "../../repositories/prisma/prisma-student-repository"
import { RegisterNewContactWithStudent } from "../register-new-contact-with-student"

export function makeRegisterNewContactWithStudentUseCase(){
    const prismaStudentRepository = new PrismaStudentRepository()
    const registerNewContactWithStudent = new RegisterNewContactWithStudent(prismaStudentRepository)
    return registerNewContactWithStudent
}