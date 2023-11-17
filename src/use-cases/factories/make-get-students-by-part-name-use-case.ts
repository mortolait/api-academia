import { PrismaStudentRepository } from "@/repositories/prisma/prisma-student-repository";
import { GetStudentByName } from "../get-student-by-name"

export function makeGetStudentByPartNameUseCase(){
    const studentRepository = new PrismaStudentRepository()
    const getStudentByName = new GetStudentByName(studentRepository)

    return getStudentByName
}