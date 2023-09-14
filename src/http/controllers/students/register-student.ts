import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeRegisterStudentUseCase } from "../../../use-cases/factories/make-register-studente-use-case";
import { StudentAlreadyExistisError } from "../../../use-cases/errors/student-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		name: z.string(),
		last_name: z.string(),
		date_of_birth: z.union([z.date(), z.string()]).nullable().optional(),
		sex: z.enum(["masculino", "feminino", "outro"]).nullable(),
		phone: z.string(),
		email: z.string(),
		enrollment_date: z.union([z.date(), z.string()]).nullable().optional(),
		expiration_date: z.union([z.date(), z.string()]).nullable().optional(),
		plan: z.string().nullable(),
	});

	const {
		name,
		last_name,
		email,
		phone,
		plan,
		sex,
		date_of_birth,
		enrollment_date,
		expiration_date,
	} = createBodySchema.parse(request.body);

	try {
		const createStudentUseCase = makeRegisterStudentUseCase();
		const student = await createStudentUseCase.execute({
			name,
			last_name,
			email,
			phone,
			plan,
			sex,
			date_of_birth,
			enrollment_date,
			expiration_date,
		});

		return reply.status(201).send(student);
	} catch (err) {
		if (err instanceof StudentAlreadyExistisError) {
			return reply.status(409).send(err.message);
		}
	}
}
