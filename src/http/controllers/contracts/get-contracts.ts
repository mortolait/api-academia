import { makeGetAllContractsUseCase } from "@/use-cases/factories/make-get-all-contracts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getContracts(request: FastifyRequest,reply: FastifyReply){
    
    const { sub } = request.user
    try {
        const getAllContractUseCase = makeGetAllContractsUseCase()
        const { contracts } = await getAllContractUseCase.execute(sub)

        reply.status(200).send(contracts)
    } catch (error) {
        reply.status(500)
    }
}