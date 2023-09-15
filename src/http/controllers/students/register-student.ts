import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeRegisterStudentUseCase } from "../../../use-cases/factories/make-register-studente-use-case";
import { StudentAlreadyExistisError } from "../../../use-cases/errors/student-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
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
		expirationDate: z.union([z.date(), z.string()]).nullable().optional(),
	});

	const {
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
		referral
	} = createBodySchema.parse(request.body);

	try {
		const createStudentUseCase = makeRegisterStudentUseCase();
		const student = await createStudentUseCase.execute({
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
			referral
		});

		return reply.status(201).send(student);
	} catch (err) {
		if (err instanceof StudentAlreadyExistisError) {
			return reply.status(409).send(err.message);
		}
	}
}
