import { makeUpdateServiceByIdUseCase } from "@/use-cases/factories/make-update-service-by-id-use-cases";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateService(request: FastifyRequest, reply: FastifyReply){
    const updateBodySchema = z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        amount: z.number(),
        code: z.string(),
        active: z.boolean(),
    })

    const {id,title,description,code,amount,active} = updateBodySchema.parse(request.body)

    const updateServiceUseCase = makeUpdateServiceByIdUseCase()
    const upatedService = await updateServiceUseCase.execute({
        id,
        title,
        description,
        code,
        amount,
        active
    })

    reply.status(200).send(upatedService)
}