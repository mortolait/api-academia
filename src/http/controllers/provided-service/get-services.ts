import { makeGetAllServicesUseCase } from "@/use-cases/factories/make-get-all-services-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
   
    const { sub } = request.user

    try {
        const getAllServiceUseCase = makeGetAllServicesUseCase()
        const services = await getAllServiceUseCase.execute(sub)

        return services
    } catch (error) {
        // verificar se serviço já existe
        console.log(error)
    }
}