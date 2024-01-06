import { PrismaCashRegisterRepository } from "@/repositories/prisma/prisma-cash-register-repository"
import { PrismaCashRegisterTransactionRepository } from "../../repositories/prisma/prisma-cash-register-transaction-reposirory"
import { RegisterCashTransaction } from "../register-cash-transaction"

export function makeRegisterCashTransaction(){
    const prismaCashRegisterRepository = new PrismaCashRegisterRepository()
    const prismaCashRegisterTransactionRepository = new PrismaCashRegisterTransactionRepository()
    const registerCashTransaction = new RegisterCashTransaction(prismaCashRegisterTransactionRepository,prismaCashRegisterRepository)
    return registerCashTransaction
}