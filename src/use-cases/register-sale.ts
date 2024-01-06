import { CashRegisterRepository } from "@/repositories/cash-register-repository";
import { SaleRepository } from "@/repositories/sale-repository";
import moment from "moment";
import { CashRegisterIsNotOpenError } from "./errors/cash-register-is-not-open-error";
import { CashRegisterTransactionRepository } from "@/repositories/cash-register-transaction-repository";
interface Item {
    discount: string,
    idEntity: string,
    nameEntity: string,
    obs: string,
    quantity: number,
    type: string,
    value: number,
    valueDiscount: number,
    status: 'active' | 'inactive' | 'queue'
}
interface FormPayment {
    type: string
    value: number
}
interface SaleRequestBody {
    user_id: string,
    amount: number,
    idClient: string,
    code: string,
    itens: Item[],
    totalDiscount: number,
    totalReceived: number,
    received: FormPayment[],
    hasOutstandingBalance: boolean,
    valueOutstandingBalance: number,
    datePaymentOutstandingBalance: Date
}
type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIALLY_PAID';
export class RegisterSaleUseCase {
    constructor(
        private saleRepository: SaleRepository,
        private cashRegisterRepository: CashRegisterRepository,
        private cashRegisterTransactionRepository: CashRegisterTransactionRepository
    ) { }
    async execute({ amount, idClient, itens, received, totalDiscount, totalReceived, user_id, code, datePaymentOutstandingBalance, hasOutstandingBalance, valueOutstandingBalance }: SaleRequestBody) {
        const isOpenCashRegister = await this.cashRegisterRepository.isOpenToday(user_id)
        console.log({ isOpenCashRegister })
        if (!isOpenCashRegister) {
            throw new CashRegisterIsNotOpenError()
        }
        let statusPayment: PaymentStatus
        if (hasOutstandingBalance) {
            if (totalReceived > 0) {
                statusPayment = "PARTIALLY_PAID"
            } else {
                statusPayment = "PENDING"
            }
        }
        else {
            statusPayment = "PAID"
        }

        function isEqual(date1: Date, date2: Date) {
            return moment(date1).startOf('day').isSame(moment(date2).startOf('day'));
        }

        function isAfter(date1: Date, date2: Date) {

            return moment(date2).startOf('day').isAfter(moment(date1).startOf('day'));
        }

        function isBefore(current: Date, date2: Date) {
            return moment(current).startOf('day').isBefore(moment(date2).startOf('day'));
        }



        itens.forEach((item: any) => {
            if (item.type === 'contract') {
                const startDate = new Date(moment(item.start_date).format('YYYY-MM-DD'));
                const endDate = new Date(moment(item.end_date).format('YYYY-MM-DD'));
                const currentDate = new Date(moment(new Date()).format('YYYY-MM-DD'));

                if (isEqual(currentDate, startDate) || (moment(endDate).isAfter(currentDate) && moment(startDate).isBefore(currentDate))) {

                    item.status = 'active';
                }
                else if (isBefore(currentDate, startDate)) {

                    item.status = 'queue';
                } else {

                    item.status = 'inactive';
                }
            }
        })

        const response = await this.saleRepository.create({
            total_amount: amount,
            user_id,
            code,
            valueDiscount: totalDiscount,
            idClient,
            itens,
            received,
            totalReceived,
            datePaymentOutstandingBalance,
            hasOutstandingBalance,
            valueOutstandingBalance,
            statusPayment
        })

        response.payments.forEach(async (payment)=> {
            await this.cashRegisterTransactionRepository.create({
                cashRegister: {
                    connect: {
                        id: response.sale.idCashOpen
                    }
                },
                value: payment.value,
                name: response.sale.student.full_name,
                type: 'sale',
                paymentForm: payment.type,
                date_at: response.sale.create_at
            })
        })
        return response.sale
    }
}