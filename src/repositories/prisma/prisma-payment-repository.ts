import { Prisma } from "@prisma/client";
import { PaymentRepository } from "../payment-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPaymentRepository implements PaymentRepository{
    async create(data: Prisma.PaymentOnSaleCreateInput){
        const registeredPayment = await prisma.paymentOnSale.create({
            data
        })
        return registeredPayment
    }
}