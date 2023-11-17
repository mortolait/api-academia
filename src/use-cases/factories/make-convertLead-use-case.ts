import { PrismaStudentRepository } from "../../repositories/prisma/prisma-student-repository";
import { ConvertLeadUseCase } from "../convert-lead"

export function makeConvertLeadUseCase(){
    const studentRepository = new PrismaStudentRepository();
    const convertLeadUseCase = new ConvertLeadUseCase(studentRepository);
    return convertLeadUseCase;
}