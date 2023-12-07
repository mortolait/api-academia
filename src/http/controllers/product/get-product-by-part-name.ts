import { makeGetProductsByDescriptionUseCase } from "@/use-cases/factories/make-get-products-by-part-name";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getProductByPartName(request: FastifyRequest, reply: FastifyReply){
    console.log({request})
    const getBodySchema = z.object({
        part_name: z.string()
    })
    const { sub } = request.user
    try {
        const { part_name } = getBodySchema.parse(request.params)
        const getProductByPartName = makeGetProductsByDescriptionUseCase()
        const products = await getProductByPartName.execute(sub,part_name)
        reply.status(200).send(products)
    } catch (error) {
        reply.status(500).send('Internal server error')
    }
}