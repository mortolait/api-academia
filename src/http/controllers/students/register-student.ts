import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeRegisterStudentUseCase } from "../../../use-cases/factories/make-register-studente-use-case";
import { StudentAlreadyExistisError } from "../../../use-cases/errors/student-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		fullName: z.string(),
		dob: z.union([z.date(), z.string()]).nullable().optional(),
		sex: z.enum(["male", "female", "other"]).nullable().optional(),     
		phone: z.string(),
		email: z.string(),
		emergencyContact: z.string().nullable(),
		medicalHistory: z.string().nullable(),
		medications: z.string().nullable(),
		exerciseRestrictions: z.string().nullable(),
		goals: z.string().nullable(),
		referral: z.string().nullable().optional(),
		type: z.enum(["client", "lead"]).optional(),
		how_arrived: z.string().optional()
	});
	const { sub } = request.user;
	const {
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
		type,
		how_arrived
	} = createBodySchema.parse(request.body);

	try {

		const createStudentUseCase = makeRegisterStudentUseCase();
		const student = await createStudentUseCase.execute({
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
			user_id: sub,
			type,
			how_arrived
		});

		return reply.status(201).send(student);
	} catch (err) {
		if (err instanceof StudentAlreadyExistisError) {
			return reply.status(409).send(err.message);
		}
	}
}
