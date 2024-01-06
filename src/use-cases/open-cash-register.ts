import { Prisma } from "@prisma/client";
import { CashRegisterRepository } from "../repositories/cash-register-repository";
import { CashRegisterTransactionRepository } from "@/repositories/cash-register-transaction-repository";

interface requestBodySchema {
    value: number,
    user_id: string
}
export class OpenCashRegister {
    constructor(private cashRegisterRepository: CashRegisterRepository, private cashRegisterTransactionRepository: CashRegisterTransactionRepository) { }

    async execute({ value, user_id }: requestBodySchema) {
        const cashRegistered = await this.cashRegisterRepository.create({
            open_date: new Date(),
            final_balance: value,
            initial_balance: value,
            total_expense: 0,
            total_income: 0,
            user:{
                connect:{
                    id:user_id
                }
            },
            status: "open"
        })
        console.log({ cashRegistered })
        if (cashRegistered) {
            this.cashRegisterTransactionRepository.create({
                paymentForm: 'paper_Money',
                cashRegister: {
                    connect: {
                        id: cashRegistered?.id

                    }
                },
                date_at: cashRegistered.open_date,
                name: cashRegistered.user.name,
                type: 'open_cashRegister',
                value: cashRegistered.initial_balance
            })
        }

        return {
            cashRegistered
        }
    }
}