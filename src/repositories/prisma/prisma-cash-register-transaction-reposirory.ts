import { Prisma } from "@prisma/client";
import { CashRegisterTransactionRepository } from "../cash-register-transaction-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCashRegisterTransactionRepository implements CashRegisterTransactionRepository {
    async create(data: Prisma.CashRegisterTransactionCreateInput) {
        console.log({ data: data.cashRegister.connect?.id })
        let dataCash:any = {}
        if(data.type == 'open_cashRegister'){
            dataCash = {
                
            }
        }else if( data.type == 'withdrawals'){
            dataCash = {
                total_expense: { increment: data.value },
                final_balance: { increment: data.value }
            }
        }
        else{
            dataCash = {
                final_balance: { increment: data.value },
                total_income: { increment: data.value }
            }
        }
        const cashRegisterTransaction = await prisma.cashRegisterTransaction.create({
            data
        })

        const cashRegisterUpdated = await prisma.cashRegister.update({
            where: {
                id: data.cashRegister.connect?.id 
            },
            data: dataCash
        })
        return cashRegisterTransaction
    }
}