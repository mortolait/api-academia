import { CashRegisterRepository } from "../repositories/cash-register-repository"
import { QueryParams } from "./models/params-filter-cash"

export class GetCashRegister{
    constructor(private cashRegisterRepository:CashRegisterRepository){}

    async execute(user_id:string, data:QueryParams){
        const cashRegisterInformations = await this.cashRegisterRepository.getCashRegister(user_id,data)
        return {
            cashRegisterInformations
        }
    }
}