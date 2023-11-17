import { StudentRepository } from "@/repositories/student-repository";

export class CheckEmailExistsUseCase {
    constructor(private studentRepository: StudentRepository) {}

    async execute(email: string) {
        const student = await this.studentRepository.findByEmail(email);
        if (student) {
            return true;
        }
        return false;
    }
}