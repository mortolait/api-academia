import { StudentRepository } from "../repositories/student-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";

export class UpdateStudentById{
	constructor(private studentRepository: StudentRepository) {}

	async execute (id:string, data: any){
        console.log({ data });
		const emailAlreadyExists = await this.studentRepository.findByEmailAndId(data.email, id);

        console.log({ emailAlreadyExists });

		if(emailAlreadyExists){
			throw new EmailAlreadyExistsError();
		}
        
		const student = await this.studentRepository.updateById(id, {
            full_name: data.fullName,
            email : data.email,
            date_of_birth: data.dob?new Date(data.dob):null,
            start_date: data.startDate?new Date(data.startDate):null,
            expiration_date : data.expirationDate,
            phone: data.phone,
            plan: data.plan,
            sex: data.sex,
            address: data.address,
            emergency_contact: data.emergencyContact,
            medical_history: data.medicalHistory,
            medications: data.medications,
            exercise_restrictions: data.exerciseRestrictions,
            goals: data.goals,
            payment_method: data.paymentMethod,
            referral: data.referral,
            status: "ativo",
        });
		return student;
	}
}