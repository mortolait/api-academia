import { makeGetCashRegisterUseCase } from "@/use-cases/factories/make-get-cash-register-use-case";
import { QueryParams } from "@/use-cases/models/params-filter-cash";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getCashRegistered(request: FastifyRequest, reply: FastifyReply){
    const data = request.query as QueryParams;
    const { sub } = request.user
    try {
        const getCashRegistered = makeGetCashRegisterUseCase()
        const cashInformation = await getCashRegistered.execute(sub,data)
        reply.status(200).send(cashInformation)
    } catch (error) {
        reply.status(501).send("Error")
    }
}