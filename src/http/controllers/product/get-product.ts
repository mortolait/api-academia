import { makeGetAllProducstUseCase } from "@/use-cases/factories/make-get-all-product-use-case";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";

export async function getProducts(request: FastifyRequest, reply: FastifyReply){
    const { sub } = request.user

    try {
        const getAllProducts = makeGetAllProducstUseCase()
        const products = await getAllProducts.execute(sub)
        console.log( products )
        reply.status(200).send(products)
    } catch (err) {
        return reply.status(501).send(err);
    }
}