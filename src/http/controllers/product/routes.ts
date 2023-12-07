import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./register-product";
import { getProducts } from "./get-product";
import { updateById } from "./update-product";
import { getProductByPartName } from "./get-product-by-part-name";

export async function productRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt);
    app.post("/product",create);
    app.get("/product/:part_name",getProductByPartName)
    app.get("/products",getProducts);
    app.put("/product/:id",updateById)
}