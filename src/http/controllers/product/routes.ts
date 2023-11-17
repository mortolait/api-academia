import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./register-product";
import { getProducts } from "./get-product";
import { updateById } from "./update-product";

export async function productRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt);
    app.post("/product",create);
    app.get("/products",getProducts);
    app.put("/product/:id",updateById)
}