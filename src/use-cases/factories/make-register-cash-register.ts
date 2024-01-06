import { PrismaCashRegisterRepository } from "../../repositories/prisma/prisma-cash-register-repository"
import { PrismaCashRegisterTransactionRepository } from "../../repositories/prisma/prisma-cash-register-transaction-reposirory"
import { OpenCashRegister } from "../open-cash-register"

export function makeOpenCashRegister(){
    const prismaCashRegisterRepository = new PrismaCashRegisterRepository()
    const prismaCashRegisterTransactionRepository = new PrismaCashRegisterTransactionRepository() 
    const openCashRegister = new OpenCashRegister(prismaCashRegisterRepository,prismaCashRegisterTransactionRepository)
    return openCashRegister
}