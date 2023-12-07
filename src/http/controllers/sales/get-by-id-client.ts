import { makeGetSalesByIdClient } from "@/use-cases/factories/make-get-sales-by-id-client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getByIdClient(request: FastifyRequest, reply: FastifyReply){
    const getParamsSchema = z.object({
        id: z.string()
    })
    const { id } = getParamsSchema.parse(request.params)
    try {
        const getSalesByIdClientUseCase = makeGetSalesByIdClient()
        const sales = await getSalesByIdClientUseCase.execute(id)
        reply.status(200).send(sales)
    } catch (error) {
        reply.status(501).send(error)
    }
}