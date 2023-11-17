import { StudentRepository } from "../repositories/student-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";

export class UpdateStudentById{
	constructor(private studentRepository: StudentRepository) {}

	async execute (id:string, data: any){
		const emailAlreadyExists = await this.studentRepository.findByEmailAndId(data.email, id)

		if(emailAlreadyExists){
			throw new EmailAlreadyExistsError();
		}
        
		const student = await this.studentRepository.updateById(id, {
            full_name: data.fullName,
            email : data.email,
            date_of_birth: data.dob?new Date(data.dob):null,
            start_date: data.startDate?new Date(data.startDate):null,
            phone: data.phone,
            sex: data.sex,
            emergency_contact: data.emergencyContact,
            medical_history: data.medicalHistory,
            medications: data.medications,
            exercise_restrictions: data.exerciseRestrictions,
            goals: data.goals,
            referral: data.referral,
            status: "ativo",
            type: data.type,
        });
		return student;
	}
}