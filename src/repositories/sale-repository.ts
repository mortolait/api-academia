import { Prisma, Sale } from "@prisma/client";

export interface SaleRepository{
    create(data: any): Promise<Sale>
    getSaleByIdClient(idClient: string): Promise<Sale[] | null>
    getSaleContract(idClient: string): Promise<Sale[] | null>
}