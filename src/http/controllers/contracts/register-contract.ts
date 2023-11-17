import { makeRegisterContractUseCase } from "@/use-cases/factories/make-register-contract-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        description: z.string(),
        amount: z.number(),
        installments: z.number(),
        code: z.string(),
        active: z.boolean()
    })

    const { sub } = request.user

    const {
        amount,
        description,
        installments,
        code,
        active
    } = createBodySchema.parse(request.body)

    console.log({amount,description,installments})
    try {
        const registerContractUseCase = makeRegisterContractUseCase()
        const { contract } = await registerContractUseCase.execute({
            amount,
            description,
            installments,
            code,
            active,
            amount_per_installment: amount / installments,
            user_id: sub
        })

        reply.status(201).send(contract)
    } catch (error) {
        reply.status(501)
    }
}