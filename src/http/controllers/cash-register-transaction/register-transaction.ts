import { makeRegisterCashTransaction } from "@/use-cases/factories/make-register-cash-transaction";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerTransaction(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        paymentForm: z.string(),
        name: z.string(),
        type: z.string(),
        value: z.number(),
        date_at: z.any(),
        cashRegister: z.string(),
        description: z.string()
    })

    const { cashRegister,date_at,name,paymentForm,type,value,description} = createBodySchema.parse(request.body)
    try {
        const registerTransactionUseCase = makeRegisterCashTransaction()
        const registeredTransaction = await registerTransactionUseCase.execute({
            cashRegister,
            date_at: new Date(date_at),
            name,
            paymentForm,
            type,
            value,
            description
        })

        reply.status(201).send(registeredTransaction)
    } catch (error) {
        reply.status(501).send('Internal server error')
    }
}