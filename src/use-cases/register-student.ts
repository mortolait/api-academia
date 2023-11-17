import { StudentRepository } from "../repositories/student-repository";
import { StudentAlreadyExistisError } from "./errors/student-already-exists-error";

interface studentRequestBody {
	fullName: string;
	dob?: Date | string | null;
	sex?: "male" | "female" | "other" | null;
	phone: string;
	email: string;
	emergencyContact?: string;
	medicalHistory?: string;
	medications?: string;
	exerciseRestrictions?: string;
	interests?: string
	goals?: string | null;
	referral?: string | null;
	status?: studentStatus;
	user_id: string;
	type?: 'client' | 'lead'
	how_arrived?: string
}

enum studentStatus {
    active = "ativo",
    inactive = "inativo",
    deleted = "excluido",
    suspended = "suspenso"
}
export class RegisterStudentUseCase {
	constructor(private studentRepository: StudentRepository) {}

	async execute({
		fullName,
		dob,
		sex,
		phone,
		email,
		emergencyContact,
		medicalHistory,
		medications,
		exerciseRestrictions,
		goals,
		referral,
		user_id,
		type,
		how_arrived
	}: studentRequestBody) {

		const studentSameEmail = await this.studentRepository.findByEmail(email);
		if (studentSameEmail) {
			throw new StudentAlreadyExistisError();
		}

		try {
			const studentRegister =	await this.studentRepository.create({
				full_name: fullName,
				email,
				date_of_birth: dob?new Date(dob):null,
				phone,
				sex,
				emergency_contact: emergencyContact,
				medical_history: medicalHistory,
				medications,
				exercise_restrictions: exerciseRestrictions,
				goals: goals,
				referral,
				status: "ativo",
				user_id,
				type,
				how_arrived
			});

			return {
				studentRegister
			};
		} catch (error) {
			console.log("RegisterStudentUseCase error",error);
		}

	
	}

	
}
