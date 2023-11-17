import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetContractByIdUseCase } from "@/use-cases/factories/make-get-contract-by-id";

export async function getContractById(request: FastifyRequest, reply: FastifyReply){
    const paramsRequestSchema = z.object({
        id: z.string()
    })
    const { id } = paramsRequestSchema.parse(request.params)

    try {
        const getContractByIdUseCase = makeGetContractByIdUseCase()    
        const { contract } = await getContractByIdUseCase.execute(id)
        reply.status(200).send(contract)
    } catch (error) {
        
    }
}