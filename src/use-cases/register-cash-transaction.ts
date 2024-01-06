import { CashRegisterRepository } from "@/repositories/cash-register-repository";
import { CashRegisterTransactionRepository } from "@/repositories/cash-register-transaction-repository";

interface TransactionRequestBody{
    name: string,
    paymentForm: string,
    date_at: Date,
    value: number,
    cashRegister: any,
    type: string,
    description: string
}
export class RegisterCashTransaction{
    constructor(private cashRegisterTransactionRepository:CashRegisterTransactionRepository, private cashRegisterRepository: CashRegisterRepository ){}
    async execute({ name,paymentForm,value,date_at,cashRegister,type,description }:TransactionRequestBody){
        const transactionRegistered = await this.cashRegisterTransactionRepository.create({
            name,
            paymentForm,
            value,
            date_at,
            description,
            cashRegister:{
                connect:{
                    id: cashRegister
                }
            },
            type
        })
        
        return {
            transactionRegistered
        }
    }
}