import { makeRegisterNewContactWithStudentUseCase } from "@/use-cases/factories/rmake-register-new-contactswith-student";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function addNewContact(request: FastifyRequest, reply: FastifyReply){
    const bodySchemaRequest = z.object({
        id_student: z.string(),
        type: z.string(),
        subject: z.string().optional(),
        content: z.string(),
    })

    const { sub } = request.user

    const {
        id_student,
        subject,
        content,
        type,
    } = bodySchemaRequest.parse(request.body)

    try {
        const registerContactUseCase = makeRegisterNewContactWithStudentUseCase()
        const contactAdded = await registerContactUseCase.execute({
            id_user: sub,
            subject,
            content,
            type,
            id_student
        })
        return reply.status(201).send(contactAdded)
    } catch (error) {
        return reply.status(500).send({ error });
    }

}