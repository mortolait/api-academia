import { SaleRepository } from "@/repositories/sale-repository";
import moment from "moment";
interface Item{
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
interface FormPayment{
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
export class RegisterSaleUseCase{
    
    constructor(private saleRepository: SaleRepository){}
    async execute({amount,idClient,itens,received,totalDiscount,totalReceived,user_id,code,datePaymentOutstandingBalance,hasOutstandingBalance,valueOutstandingBalance}: SaleRequestBody){
        let statusPayment: PaymentStatus
        if(hasOutstandingBalance){
            if(totalReceived > 0){
                statusPayment = "PARTIALLY_PAID"
            }else{
                statusPayment = "PENDING"
            }
        }
        else{
            statusPayment = "PAID"
        }

        function isEqual(date1: Date, date2: Date) {
            return moment(date1).startOf('day').isSame(moment(date2).startOf('day'));
        }
        
        function isAfter(date1: Date, date2: Date) {
            console.log(date1,date2)
            return moment(date2).startOf('day').isAfter(moment(date1).startOf('day'));
        }
        
        function isBefore(current: Date, date2: Date) {
            return moment(current).startOf('day').isBefore(moment(date2).startOf('day'));
        }
        
        
        
        itens.forEach((item:any)=>{
            if(item.type === 'contract') {
                const startDate = new Date(moment(item.start_date).format('YYYY-MM-DD'));
                const endDate = new Date(moment(item.end_date).format('YYYY-MM-DD'));
                const currentDate = new Date(moment(new Date()).format('YYYY-MM-DD'));
                
                if(isEqual(currentDate, startDate) || (moment(endDate).isAfter(currentDate) && moment(startDate).isBefore(currentDate))){
                    console.log("ativo")
                    item.status = 'active';
                }
                else if(isBefore(currentDate, startDate)) {
                    console.log("queue")
                    item.status = 'queue';
                } else {
                    console.log("inativo")
                    item.status = 'inactive';
                }
            }
        })
        const sale = await this.saleRepository.create({
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
        return sale
    }
}