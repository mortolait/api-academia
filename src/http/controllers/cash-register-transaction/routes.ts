import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { registerTransaction } from "./register-transaction";
import { FastifyInstance } from "fastify";

export async function transactionCashRegisterRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt);
	app.post("/cash-register/transaction", registerTransaction);
}
