import { makeUpdateContractById } from "@/use-cases/factories/make-update-contract-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
export async function updateContract(request: FastifyRequest, reply: FastifyReply) {

    const updateBodySchema = z.object({
        id: z.string(),
        description: z.string(),
        amount: z.number(),
        installments: z.number(),
        code: z.string(),
        active: z.boolean()
    })

    const { id, description, amount, active, code, installments } = updateBodySchema.parse(request.body)

    try {
        const updateContractUseCase = makeUpdateContractById()
        const { contract } = await updateContractUseCase.execute(id, {
            description,
            amount,
            installments,
            code,
            active,
        })

        reply.status(200).send(contract)
    } catch (error) {
        return reply.status(501).send('internal server error')
    }

}