import { CashRegisterRepository } from "@/repositories/cash-register-repository";
import { Prisma } from "@prisma/client";

export class CloseCashRegister{
    constructor(private cashRegisterRepository:CashRegisterRepository){}

    async execute(id: string, data: Prisma.CashRegisterUpdateInput){
        const updatedCashRegister = await this.cashRegisterRepository.updateCashRegister(id, data)
        return {
            updatedCashRegister
        }
    }
}