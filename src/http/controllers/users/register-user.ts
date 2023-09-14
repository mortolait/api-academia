import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "../../../use-cases/register-user";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";

export async function register(request: FastifyRequest,reply: FastifyReply){
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string(),
		password: z.string()
	});

	const { name, email, password } = registerBodySchema.parse(request.body);

	try {
		const userRepository = new PrismaUsersRepository();
		const register = new RegisterUseCase(userRepository);
		await register.execute({
			name,
			email,
			password
		});
      
	} catch (err) {
		if(err instanceof UserAlreadyExistsError){
			return reply.status(409).send(err.message);
		}
	}

	return reply.status(201).send("user create");
}