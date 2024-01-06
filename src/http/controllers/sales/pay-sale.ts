import { makePaySaleUseCase } from "@/use-cases/factories/make-pay-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function paySale(request: FastifyRequest, reply: FastifyReply){
    console.log({ r: request.body })
    const createParamSchema = z.object({
		id: z.string(),
	});
    const createBodySchema = z.object({
        value: z.number(),
        paymentForm: z.string()
    })

    const { id } = createParamSchema.parse(request.params)
    const { value,paymentForm } = createBodySchema.parse(request.body)
    const { sub } = request.user
    try {
        const paySaleUseCase = makePaySaleUseCase()
        const updatedSale = await paySaleUseCase.execute({
            id,
            value,
            paymentForm,
            user_id: sub
        })
        reply.status(200).send(updatedSale)
    } catch (error) {
        reply.status(501).send('Internal server error')
    }
}