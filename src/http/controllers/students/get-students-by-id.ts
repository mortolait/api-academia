import { makeGetStudentByIdUseCase } from "@/use-cases/factories/make-get-student-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getStudentById(request: FastifyRequest, reply: FastifyReply){
	const createParamSchema = z.object({
		id: z.string(),
	});
	const { id } = createParamSchema.parse(request.params);

	const getStudentUseCase = makeGetStudentByIdUseCase();
	const student = await getStudentUseCase.execute(id);

	if(!student){
		return reply.status(404).send({message: "Student not found"});
	}

	return reply.status(200).send(student);
}