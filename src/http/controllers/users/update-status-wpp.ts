import { makeUpdateStatusWpp } from "@/use-cases/factories/make-update-status-wpp";
import { FastifyReply, FastifyRequest } from "fastify";

export function updateStatusWpp(request: FastifyRequest, reply: FastifyReply){
    console.log({testeW :request})

    const { sub } = request.user;

    try {
        const updateStatusWppUseCase = makeUpdateStatusWpp()
        const updatedUser = updateStatusWppUseCase.execute(sub)
        reply.status(200).send(updatedUser)
    } catch (error) {
        reply.status(501).send({message:'internal server error'})
    }
}