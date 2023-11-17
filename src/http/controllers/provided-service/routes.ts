import { FastifyInstance } from "fastify";
import { create } from "./register-service";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { findAll } from "./get-services";
import { updateService } from "./update-service";

export async function serviceRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt);
    app.post('/service',create);
    app.get('/service',findAll);
    app.put('/service',updateService);
}