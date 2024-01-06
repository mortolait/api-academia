import { $Enums, PaymentOnSale, Prisma } from "@prisma/client";
import { SaleRepository } from "../sale-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSaleRepository implements SaleRepository {
    
    async create(data: any) {
        console.log({ data })
        let payments: PaymentOnSale[] = []; 
        const transaction = await prisma.$transaction(async (prisma) => {
            const client = await prisma.student.findUnique({
                where: {
                    id: data.idClient
                }
            })
            
            console.log({ client })
            if (!client) {
                throw new Error('Client not finded')
            }
            
            const today = new Date();
            today.setHours(0,0,0,0)
            const cashRegister = await prisma.cashRegister.findFirst({
                where: {
                    user_id: data.user_id,
                    open_date: {
                        gte: today
                    },
                    status: 'open'
                }
            });

            const sale = await prisma.sale.create({
                data: {
                    user_id: data.user_id,
                    total_amount: data.total_amount,
                    valueDiscount: data.valueDiscount,
                    code: data.code,
                    datePayment: data.datePayment,
                    outstandingBalance: data.valueOutstandingBalance,
                    total_received: data.totalReceived,
                    statusPayment: data.statusPayment,
                    idClient: data.idClient,
                    idCashOpen: cashRegister?cashRegister.id:'',
                },
                include:{
                    student: {
                        select:{
                            full_name: true
                        }
                    }
                }
            })

            for (const item of data.itens) {
                if (item.type === 'product') {  
                    const p = await prisma.productOnSale.create({
                        data: {
                            saleId: sale.id,
                            productId: item.idEntity,
                            quantity: parseFloat(item.quantity),
                            value: item.value,
                            valueDiscount: item.valueDiscount,
                            id_client: data.idClient
                        }
                    })
                }
                else if (item.type === "contract") {
                    await prisma.contractOnSale.create({
                        data: {
                            saleId: sale.id,
                            contractId: item.idEntity,
                            value: item.value,
                            valueDiscount: item.valueDiscount,
                            startDate:new Date(item.start_date),
                            endDate: new Date(item.end_date),
                            status: item.status,
                            id_client: data.idClient
                        }
                    })
                }
                else if (item.type === "service") {
                    await prisma.serviceOnSale.create({
                        data: {
                            saleId: sale.id,
                            serviceId: item.idEntity,
                            quantity: parseFloat(item.quantity),
                            value: item.value,
                            valueDiscount: item.valueDiscount,
                            id_client: data.idClient
                        }
                    })
                }
            }
            
            for (const item of data.received) {
                const payment = await prisma.paymentOnSale.create({
                    data: {
                        type: item.type,
                        value: item.value,
                        saleId: sale.id,
                        id_client: data.idClient
                    }
                });
                payments.push(payment); 
            }
            console.log({ sale, payments })
            return { sale, payments };;
        })
        return transaction
    }
    async getSaleByIdClient(idClient: string) {
        const sales = await prisma.sale.findMany({
            where: { idClient: idClient },
            include: {
                products: {
                    include: {
                        product: true
                    }
                },
                contracts: {
                    include: {
                        contract: true
                    }
                },
                services: {
                    include: {
                        service: true
                    }
                },
                payments: true,
            }
        })
        return sales
    }

    async getSaleContract(idClient: string){
        return null
    }

    async updateSale(id: string, data: Prisma.SaleUpdateInput){
        const updatedSale = await prisma.sale.update({
            where: {
                id
            },
            data,
            include:{
                student:{
                    select: {
                        full_name: true
                    }
                }
            }
        })
        return updatedSale
    }
}