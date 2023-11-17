import { makeCheckEmailExistsUseCase } from "@/use-cases/factories/make-check-email-exists-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function checkEmailExists(request: FastifyRequest, reply: FastifyReply){
    const requestParamSchema = z.object({
		email: z.string(),
	});
    const { email } = requestParamSchema.parse(request.body)
    
    const checkEmailExistsUseCase = makeCheckEmailExistsUseCase();

    const emailExists = await checkEmailExistsUseCase.execute(email);

    return reply.status(200).send({emailExists});
}