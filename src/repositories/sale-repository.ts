import { PaymentOnSale, Prisma, Sale } from "@prisma/client";

export interface SaleRepository{
    create(data: any): Promise<{sale:Sale,payments:PaymentOnSale[]}>
    getSaleByIdClient(idClient: string): Promise<Sale[] | null>
    getSaleContract(idClient: string): Promise<Sale[] | null>
    updateSale(id: string, data: Prisma.SaleUpdateInput): Promise<Sale>
}