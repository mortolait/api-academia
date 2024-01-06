import { PrismaSaleRepository } from "@/repositories/prisma/prisma-sale-repository";
import { PrismaCashRegisterRepository } from "@/repositories/prisma/prisma-cash-register-repository";
import { PrismaCashRegisterTransactionRepository } from "../../repositories/prisma/prisma-cash-register-transaction-reposirory"
import { RegisterSaleUseCase } from "../register-sale";

export function makeRegisterSaleUseCase(){
    const saleRepository = new PrismaSaleRepository()
    const prismaCashRegisterRepository = new PrismaCashRegisterRepository()
    const prismaCashRegisterTransactionRepository = new PrismaCashRegisterTransactionRepository()
    const registerSaleUseCase = new RegisterSaleUseCase(saleRepository,prismaCashRegisterRepository,prismaCashRegisterTransactionRepository)
    return registerSaleUseCase
}