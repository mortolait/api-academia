import { StudentRepository } from "../repositories/student-repository";
import { StudentAlreadyExistisError } from "./errors/student-already-exists-error";

interface studentRequestBody {
  id?: string;
  name: string;
  last_name: string;
  date_of_birth?: Date | string | null;
  sex?: studentSex | null;
  phone: string;
  email: string;
  enrollment_date?: Date | string | null;
  expiration_date?: Date | string | null;
  plan?: string | null;
  status?: studentStatus;
}

enum studentStatus {
    active = "ativo",
    inactive = "inativo",
    deleted = "excluido",
    suspended = "suspenso"
}

enum studentSex {
    masculino = "masculino",
    feminino = "feminino",
    outro = "outro",
} 
export class RegisterStudentUseCase {
	constructor(private studentRepository: StudentRepository) {}

	async execute({
		name,
		last_name,
		email,
		date_of_birth,
		enrollment_date,
		expiration_date,
		phone,
		plan,
		sex
	}: studentRequestBody) {

		const studentSameEmail = await this.studentRepository.findByEmail(email);
		if (studentSameEmail) {
			throw new StudentAlreadyExistisError();
		}

		try {
			const studentRegister =	await this.studentRepository.create({
				name,
				last_name,
				email,
				date_of_birth,
				enrollment_date,
				expiration_date,
				phone,
				plan,
				sex,
				status: "ativo",
			});

			return {
				studentRegister
			};
		} catch (error) {
			console.log("RegisterStudentUseCase error",error);
		}

	
	}

	
}
