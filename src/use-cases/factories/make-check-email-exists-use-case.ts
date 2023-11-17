import { PrismaStudentRepository } from "@/repositories/prisma/prisma-student-repository";
import { CheckEmailExistsUseCase} from "../checkEmailExists";

export function makeCheckEmailExistsUseCase(){
    const studentRepository = new PrismaStudentRepository();
    const checkEmailExistsUseCase = new CheckEmailExistsUseCase(studentRepository);
    return checkEmailExistsUseCase;
}