import { makeGetStudentByPartNameUseCase } from "@/use-cases/factories/make-get-students-by-part-name-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getStudentByPartName(request: FastifyRequest, reply: FastifyReply){
    const bodyRequestSchema = z.object({
        part_name: z.string()
    })
    try {
        const { sub } = request.user;
        const { part_name } = bodyRequestSchema.parse(request.params)
        const getStudentByNameUseCase = makeGetStudentByPartNameUseCase()
        const students = await getStudentByNameUseCase.execute(sub,part_name)
        reply.status(200).send(students)
    } catch (error) {
        reply.status(500).send("Internal server error")
    }
}