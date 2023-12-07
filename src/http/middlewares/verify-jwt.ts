import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply){
	try {
		console.log({ request })
		await request.jwtVerify();
	} catch (error) {
		return reply.status(401).send({message: "Unauthorized"});
	}
}