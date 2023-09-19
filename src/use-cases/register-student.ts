import { StudentRepository } from "../repositories/student-repository";
import { StudentAlreadyExistisError } from "./errors/student-already-exists-error";

interface studentRequestBody {
	fullName: string;
	dob?: Date | string | null;
	sex?: "male" | "female" | "other" | null;
	address?: string;
	phone: string;
	email: string;
	emergencyContact?: string;
	medicalHistory?: string;
	medications?: string;
	exerciseRestrictions?: string;
	startDate?: Date | null | string;
	plan?: string | null;
	interests?: string;
	paymentMethod?: string | null;
	expirationDate?: Date | null | string;
	goals?: string | null;
	referral?: string | null;
	status?: studentStatus;
	user_id: string;
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
		address,
		phone,
		email,
		emergencyContact,
		medicalHistory,
		medications,
		exerciseRestrictions,
		startDate,
		plan,
		paymentMethod,
		expirationDate,
		goals,
		referral,
		user_id ,
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
				start_date: startDate?new Date(startDate):null,
				expiration_date : expirationDate?new Date(expirationDate):null,
				phone,
				plan,
				sex,
				address,
				emergency_contact: emergencyContact,
				medical_history: medicalHistory,
				medications,
				exercise_restrictions: exerciseRestrictions,
				goals: goals,
				payment_method: paymentMethod,
				referral,
				status: "ativo",
				user_id
			});

			return {
				studentRegister
			};
		} catch (error) {
			console.log("RegisterStudentUseCase error",error);
		}

	
	}

	
}
