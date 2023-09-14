import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credations-error";

export async function authenticate(request: FastifyRequest,reply: FastifyReply){

	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();
		const { user }	= await authenticateUseCase.execute({ email,password });

		console.log({ user });
		const token = await reply.jwtSign(
			{
				role: user.role
			},
			{
				sign:{
					sub: user.id,
				}
			}
		);
		
		const refreshToken = await reply.jwtSign(
			{
				role: user.role
			},
			{
				sign:{
					sub: user.id,
					expiresIn: "7d",
				}
			}
		);
		return reply
			.setCookie("refreshToken", refreshToken,{
				path: "/",
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(201).send({
				token,
			});

	} catch (error) {
		if(error instanceof InvalidCredentialsError){
			return reply.status(400).send({message: error.message});
		}
	}

}