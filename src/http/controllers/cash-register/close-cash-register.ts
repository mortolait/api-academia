import { makeCloseCashRgisterUseCase } from "@/use-cases/factories/make-close-cash-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function closeCashRegister(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        id: z.string()
    })
    const { id } = createBodySchema.parse(request.body)
    try {

        const closeCashRegisterUseCase = makeCloseCashRgisterUseCase()
        const closeCashRegisterUpdated = await closeCashRegisterUseCase.execute(id, {
             status: 'close',
             close_date: new Date()
         })
        reply.status(200).send(closeCashRegisterUpdated)
    } catch (error) {
        reply.status(501).send('Error')
    }
}