import { EmailAlreadyExistsError } from "../../../use-cases/errors/email-already-exists-error";
import { makeUpdateStudentUseCase } from "../../../use-cases/factories/make-update-student-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateStudent(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.body);

    const createParamSchema = z.object({
		id: z.string(),
	});
	const bodyEchema = z.object({
		fullName: z.string(),
		dob: z.union([z.date(), z.string()]).nullable().optional(),
		sex: z.enum(["male", "female", "other"]).nullable().optional(),
		address: z.string(),
		phone: z.string(),
		email: z.string(),
		emergencyContact: z.string(),
		medicalHistory: z.string(),
		medications: z.string(),
		exerciseRestrictions: z.string(),
		startDate: z.union([z.date(), z.string()]).nullable().optional(),
		expiration_date: z.union([z.date(), z.string()]).nullable().optional(),
		plan: z.string().nullable(),
		goals: z.string().nullable(),
		referral: z.string().nullable().optional(),
		paymentMethod: z.string().nullable(),
		expirationDate: z.union([z.number(), z.string()]).nullable().optional()
	});
	const { sub } = request.user;
	const {
		fullName,
		dob,
		address,
		email,
		emergencyContact,
		exerciseRestrictions,
		goals,
		medicalHistory,
		medications,
		paymentMethod,
		phone,
		plan,
		expirationDate,
        referral, 
        sex, 
        startDate
	} = bodyEchema.parse(request.body);

    const { id } = createParamSchema.parse(request.params);
    try {
       const updateStudentUseCase = makeUpdateStudentUseCase();
       const student = await updateStudentUseCase.execute(id, {
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
        user_id: sub
       }) 

        return reply.status(200).send(student);
    } catch (err) {
        if(err instanceof EmailAlreadyExistsError){
            return reply.status(409).send({message: err.message});
        }
    }
}
