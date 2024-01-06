import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { register } from "./register-sale";
import { getByIdClient } from "./get-by-id-client";
import { paySale } from "./pay-sale";

export async function saleRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt);
    app.post("/sale",register);
    app.get("/sales/:id",getByIdClient)
    app.put("/sale/:id", paySale)
}