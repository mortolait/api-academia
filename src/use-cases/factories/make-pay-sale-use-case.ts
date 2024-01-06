import { PrismaSaleRepository } from '../../repositories/prisma/prisma-sale-repository'
import { PrismaPaymentRepository } from '../../repositories/prisma/prisma-payment-repository'
import { PrismaCashRegisterTransactionRepository } from '../../repositories/prisma/prisma-cash-register-transaction-reposirory'
import { PrismaCashRegisterRepository } from '../../repositories/prisma/prisma-cash-register-repository'
import { PaySale } from '../pay-sale'
export function makePaySaleUseCase(){
    const prismaSaleRepository = new PrismaSaleRepository()
    const prismaPaymentRepository = new PrismaPaymentRepository()
    const prismaCashRegisterTransactionRepository = new PrismaCashRegisterTransactionRepository()
    const prismaCashRegisterRepository = new PrismaCashRegisterRepository()
    const paySale = new PaySale(prismaSaleRepository,prismaPaymentRepository,prismaCashRegisterRepository,prismaCashRegisterTransactionRepository)
    return paySale
}