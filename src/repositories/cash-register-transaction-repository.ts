import { CashRegisterTransaction, Prisma } from "@prisma/client";

export interface CashRegisterTransactionRepository{
    create(data: Prisma.CashRegisterTransactionCreateInput): Promise<CashRegisterTransaction>
}