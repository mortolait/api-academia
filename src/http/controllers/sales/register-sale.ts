import { makeRegisterSaleUseCase } from "@/use-cases/factories/make-register-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.body)
    const createBodySchema = z.object({
        amount: z.number(),
        idClient: z.string().uuid(),
        code: z.string(),
        itens: z.array(
            z.object({
                discount: z.string(),
                idEntity: z.string().uuid(),
                nameEntity: z.string(),
                obs: z.string().nullable(),
                quantity: z.number(),
                type: z.string(),
                value: z.number(),
                valueDiscount: z.number().nullable(),
                start_date: z.any(),
                end_date: z.any()
            })
        ),
        received: z.array(
            z.object({
                type: z.string(),
                value: z.number(),
            })
        ),
        totalDiscount: z.number(),
        totalReceived: z.number(),
        hasOutstandingBalance: z.boolean(),
        valueOutstandingBalance: z.number(),
        datePaymentOutstandingBalance: z.any()
    })
    const { sub } = request.user
    console.log(request.body)
    const { amount, idClient, itens, received, totalDiscount, totalReceived,code,hasOutstandingBalance,valueOutstandingBalance,datePaymentOutstandingBalance } = createBodySchema.parse(request.body)
    console.log({itens: itens})
    try {
        const createSaleUseCase = makeRegisterSaleUseCase()
        const sale = await createSaleUseCase.execute({
            amount,
            idClient,
            code,
            itens,
            received,
            totalDiscount,
            totalReceived,
            user_id: sub,
            hasOutstandingBalance,
            valueOutstandingBalance,
            datePaymentOutstandingBalance,
        })
        return reply.status(201).send(sale)
    } catch (error) {

    }
}