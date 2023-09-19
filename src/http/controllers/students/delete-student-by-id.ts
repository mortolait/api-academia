import { makeDeleteStudentUseCase } from "@/use-cases/factories/make-delete-student-use-case";
import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteStudentById(request: FastifyRequest,reply: FastifyReply){
	const createParamSchema = z.object({
		id: z.string(),
	});
	const { id } = createParamSchema.parse(request.params);
	try {
		const deleteStudentUseCase = makeDeleteStudentUseCase();
		await deleteStudentUseCase.execute(id);
		reply.status(204).send();
	} catch (error) {
		reply.status(404).send({message: "Student not found"});
	}
}