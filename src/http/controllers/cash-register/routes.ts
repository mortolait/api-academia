import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { createCashRegister } from "./create-cash-register";
import { getCashRegistered } from "./get-cash-registerded";
import { closeCashRegister } from "./close-cash-register";


export async function cashRegisterRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt);
	app.post("/cash-register", createCashRegister);
    app.get("/cash-register", getCashRegistered);
    app.post("/cash-register/close", closeCashRegister)
}

