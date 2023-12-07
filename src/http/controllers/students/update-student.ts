import { EmailAlreadyExistsError } from "../../../use-cases/errors/email-already-exists-error";
import { makeUpdateStudentUseCase } from "../../../use-cases/factories/make-update-student-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateStudent(request: FastifyRequest, reply: FastifyReply) {
    console.log({body: request.body});

    const createParamSchema = z.object({
		id: z.string(),
	});
	const bodyEchema = z.object({
		fullName: z.string(),
		dob: z.union([z.date(), z.string()]).nullable().optional(),
		sex: z.enum(["male", "female", "other"]).nullable().optional(),
		phone: z.string(),
		email: z.string(),
		emergencyContact: z.string().nullable(),
		medicalHistory: z.string().nullable(),
		medications: z.string().nullable(),
		exerciseRestrictions: z.string().nullable(),
		startDate: z.union([z.date(), z.string()]).nullable().optional(),
		goals: z.string().nullable(),
		referral: z.string().nullable().optional(),
		type: z.enum(["client", "lead"]).nullable().optional(),
	});
	const { sub } = request.user;
	const {
		fullName,
		dob,
		email,
		emergencyContact,
		exerciseRestrictions,
		goals,
		medicalHistory,
		medications,
		phone,
        referral, 
        sex, 
        startDate,
		type
	} = bodyEchema.parse(request.body);

    const { id } = createParamSchema.parse(request.params);
    try {
       const updateStudentUseCase = makeUpdateStudentUseCase();
       const student = await updateStudentUseCase.execute(id, {
        fullName,
        dob,
        sex,
        phone,
        email,
        emergencyContact,
        medicalHistory,
        medications,
        exerciseRestrictions,
        startDate,
        goals,
        referral,
        user_id: sub,
		type,
       }) 

        return reply.status(200).send(student);
    } catch (err) {
        if(err instanceof EmailAlreadyExistsError){
            return reply.status(409).send({message: err.message});
        }
    }
}
