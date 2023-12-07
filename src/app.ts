import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";

import { usersRoutes } from "./http/controllers/users/routes";
import { env } from "./env";
import { studentRoutes } from "./http/controllers/students/routes";
import { contractRoutes } from "./http/controllers/contracts/routes"
import { productRoutes } from "./http/controllers/product/routes";
import { serviceRoutes } from "./http/controllers/provided-service/routes";
import { saleRoutes } from "./http/controllers/sales/routes";

export const app = fastify();
app.register(cors,{
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true
});
app.register(fastifyJwt,{
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false
	},
	sign:{
		expiresIn: "60m",
	}
});

app.register(fastifyCookie);
app.register(studentRoutes);
app.register(usersRoutes);
app.register(contractRoutes);
app.register(productRoutes);
app.register(serviceRoutes)
app.register(saleRoutes)

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.format(),
		});
	}
	return reply.status(500).send({ message: "Internal server error" });
});

