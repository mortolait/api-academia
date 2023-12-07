import { PrismaSaleRepository } from "@/repositories/prisma/prisma-sale-repository";
import { RegisterSaleUseCase } from "../register-sale";

export function makeRegisterSaleUseCase(){
    const saleRepository = new PrismaSaleRepository()
    const registerSaleUseCase = new RegisterSaleUseCase(saleRepository)
    return registerSaleUseCase
}