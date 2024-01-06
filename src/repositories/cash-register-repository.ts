import { QueryParams } from "@/use-cases/models/params-filter-cash";
import { CashRegister, Prisma } from "@prisma/client";

export interface CashRegisterRepository{
    create(data: Prisma.CashRegisterCreateInput): Promise<CashRegister | null>
    getCashRegister(id:string,data:QueryParams): Promise<any | null>
    isOpenToday(id:string): Promise<Boolean>
    updateCashRegister(id:string, data: Prisma.CashRegisterUpdateInput): Promise<CashRegister>
    cashOpenToday(id: string): Promise<CashRegister | null> 
}