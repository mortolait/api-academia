import { makeGetAllStudentUseCase } from "@/use-cases/factories/make-get-students-use-case";
import {FastifyRequest, FastifyReply } from "fastify";

export async function getStudents(request: FastifyRequest,reply:FastifyReply){
	const getStudentsUseCase = makeGetAllStudentUseCase();
	try {
		const { sub } = request.user;
		const students = await getStudentsUseCase.execute(sub);
		return reply.status(200).send(students);
	} catch (err) {
		return reply.status(501).send(err);
	}

	
}