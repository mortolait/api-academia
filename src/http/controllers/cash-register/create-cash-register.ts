import { makeOpenCashRegister } from "@/use-cases/factories/make-register-cash-register";
import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { z } from "zod";

export async function createCashRegister(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        value: z.number()
    })
    const { sub } = request.user
    const { value } = createBodySchema.parse(request.body)

    try {
        const openCashRegisterUseCase = makeOpenCashRegister()
        const casgRegisterOpened = await openCashRegisterUseCase.execute({
            value,
            user_id:sub
        })
        reply.status(201).send(casgRegisterOpened)
    } catch (error) {
        reply.status(501).send("internal server error")
    }
}