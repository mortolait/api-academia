import { makeRgisterServiceUseCase } from "@/use-cases/factories/make-register-service-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        amount: z.number(),
        code: z.string(),
        active: z.boolean(),
    })
    const { sub } = request.user

    const {
        title,
        description,
        active,
        amount,
        code,
    } = createBodySchema.parse(request.body)

    try {
        const registerServiceUseCase = makeRgisterServiceUseCase()
        const createdService = await registerServiceUseCase.execute({
            title,
            description,
            amount,
            code,
            active,
            user_id: sub
        })

        return createdService
    } catch (error) {
        // verificar se serviço já existe
        console.log(error)
    }
}