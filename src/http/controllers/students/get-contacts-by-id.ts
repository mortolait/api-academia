import { makeGetContactsUseCase } from "../../../use-cases/factories/make-get-contacts-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getContactsById(request: FastifyRequest, reply: FastifyReply){
    const createParamSchema = z.object({
		id: z.string(),
	});

    try {
        const { id } = createParamSchema.parse(request.params)
        const getContactsByIdUseCase = makeGetContactsUseCase()
        const contacts = await getContactsByIdUseCase.execute(id)
        reply.status(200).send(contacts)
    } catch (error) {
        reply.status(500).send("Internal server error")
    }

}