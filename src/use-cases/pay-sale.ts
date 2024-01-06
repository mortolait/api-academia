import { PrismaCashRegisterRepository } from "@/repositories/prisma/prisma-cash-register-repository";
import { PrismaCashRegisterTransactionRepository } from "@/repositories/prisma/prisma-cash-register-transaction-reposirory";
import { PrismaPaymentRepository } from "@/repositories/prisma/prisma-payment-repository";
import { SaleRepository } from "@/repositories/sale-repository";


interface schemaRequestBody{
    id: string,
    value: number,
    paymentForm: string,
    user_id: string
}
export class PaySale{
    constructor(
        private saleRepository: SaleRepository, 
        private paymentRepository: PrismaPaymentRepository,
        private cashRegisterRepository: PrismaCashRegisterRepository,
        private cashRegisterTransactionRepository: PrismaCashRegisterTransactionRepository   
    ){}

    async execute({ id,value,paymentForm,user_id }: schemaRequestBody){
        console.log({ id,value })
      const updatedSale = await this.saleRepository.updateSale(id,{
            outstandingBalance: 0,
            statusPayment: "PAID",
            total_received: {
                increment:value
            }
        })
        console.log(updatedSale)
        console.log({ id,value,paymentForm })
        const createdPayment = await this.paymentRepository.create({
            id_client: updatedSale.idClient,
            sale:{
                connect:{
                    id: updatedSale.id
                },
            },
            value,
            type: paymentForm,
        })
        console.log({ updatedSale })
        const openedCach = await this.cashRegisterRepository.cashOpenToday(user_id)
        console.log({ openedCach })

        await this.cashRegisterTransactionRepository.create({
            cashRegister: {
                connect: {
                    id: openedCach?.id
                }
            },
            value: value,
            name: updatedSale.student.full_name,
            type: 'sale',
            paymentForm,
            date_at: new Date()
        })
        return {
            updatedSale
        }
    }
}