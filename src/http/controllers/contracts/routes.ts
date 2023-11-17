import { FastifyInstance } from "fastify";
import { create } from "./register-contract"
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getContracts } from "./get-contracts";
import { updateContract } from "./update-contract";
import { getContractById } from "./get-contract-by-id";

export async function contractRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt);
	app.post("/contracts",create);
    app.get("/contract/:id",getContractById)
    app.get("/contracts",getContracts);
    app.put("/contract", updateContract);
}

