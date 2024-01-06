import { PaymentOnSale, Prisma } from "@prisma/client";

export interface PaymentRepository {
    create(data: Prisma.PaymentOnSaleCreateInput): Promise<PaymentOnSale>
}