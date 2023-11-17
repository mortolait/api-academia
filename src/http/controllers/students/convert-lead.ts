import { makeConvertLeadUseCase } from "@/use-cases/factories/make-convertLead-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function convertLead(request: FastifyRequest, reply: FastifyReply) {
    const requestParamSchema = z.object({
        id: z.string(),
    })
    const { id } = requestParamSchema.parse(request.params);

    const convertLeadUseCase = makeConvertLeadUseCase();
    try {
        const student = await convertLeadUseCase.execute(id);
        return reply.status(200).send(student);
    } catch (error) {
        return reply.status(500).send({ error });
    }
}