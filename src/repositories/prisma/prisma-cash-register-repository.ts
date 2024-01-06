import { $Enums, CashRegister, Prisma } from "@prisma/client";
import { CashRegisterRepository } from "../cash-register-repository";
import { prisma } from "@/lib/prisma";
import { QueryParams } from "@/use-cases/models/params-filter-cash";

export class PrismaCashRegisterRepository implements CashRegisterRepository {
    async create(data: Prisma.CashRegisterCreateInput) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isCashOpenToday = await prisma.cashRegister.findFirst({
            where: {
                open_date: {
                    gte: today,
                    lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
                },
                status: 'open'
            }
        });

        if (isCashOpenToday) {
            return null;
        }
        const cashRegistered = await prisma.cashRegister.create({
            data,
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return cashRegistered
    }
    // async getCashRegister(id: string, data: QueryParams): Promise<any> {
    //     const date = new Date(data.date);
    //     date.setHours(0, 0, 0, 0);
    //     const tomorrow = new Date(date);
    //     tomorrow.setDate(tomorrow.getDate() + 1);


    //     const cashRegister = await prisma.cashRegister.findMany({
    //         where: {
    //             AND: [
    //                 {
    //                     open_date: {
    //                         gte: date,
    //                     },
    //                 },
    //                 {
    //                     open_date: {
    //                         lt: tomorrow,
    //                     },
    //                 },
    //                 {
    //                     user_id: id
    //                 }
    //             ],
    //         },
    //         include: {
    //             sales: {
    //                 include: {
    //                     student: {
    //                         select: {
    //                             full_name: true
    //                         }
    //                     }
    //                 }
    //             },
    //             user: {
    //                 select: {
    //                     name: true
    //                 }
    //             },
    //             cashRegisterTransactions: true,
    //             //relation with sale

    //         },

    //     });



    //     console.log({cashRegister})

    //     let totValueMoney = {
    //         type: 'Dinheiro',
    //         value: 0
    //     };
    //     let totValueCard = {
    //         type: 'Cartão',
    //         value: 0
    //     };
    //     let totValuePix = {
    //         type: 'Pix',
    //         value: 0
    //     };
    //     let totSalesValue = {
    //         type: 'Total de vendas',
    //         value: 0
    //     };
    //     let totSalesReceived = {
    //         type: 'Total recebido',
    //         value: 0
    //     };

    //     // salesDate.forEach(sale => {
    //     //     totSalesValue.value += (sale.total_amount - sale.valueDiscount);
    //     //     sale.payments.forEach(payment => {

    //     //         switch (payment.type) {
    //     //             case 'paper_Money':
    //     //                 totValueMoney.value += payment.value;
    //     //                 break;
    //     //             case 'paper_Card':
    //     //                 totValueCard.value += payment.value;
    //     //                 break;
    //     //             case 'pix_Money':
    //     //                 totValuePix.value += payment.value;
    //     //                 break;
    //     //         }
    //     //     });


    //     //     if (sale.statusPayment === 'PAID' || sale.statusPayment === 'PARTIALLY_PAID') {
    //     //         totSalesReceived.value += sale.total_received;
    //     //     }
    //     // });

    //     return {
    //         cashRegister,
    //         totValueMoney,
    //         totValueCard,
    //         totValuePix,
    //         totSalesValue,
    //         totSalesReceived
    //     };


    // }
    async getCashRegister(id: string, data: QueryParams): Promise<any> {
        console.log({ data })
        const date = new Date(data.date);
        date.setHours(0, 0, 0, 0);
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const whereConditions:any = [
            {
                open_date: {
                    gte: date,
                },
            },
            {
                open_date: {
                    lt: tomorrow,
                },
            },
            {
                user_id: id,
            }
        ];
    

        if (data.type !== 'all') {
            whereConditions.push({ status: data.type });
        }
        
        const cashRegisters = await prisma.cashRegister.findMany({
            where: {
                AND: whereConditions
            },
            include: {
                sales: {
                    include: {
                        student: {
                            select: {
                                full_name: true,
                            },
                        },
                        payments: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                    },
                },
                cashRegisterTransactions: true,
            },
        });

        // Inicialização dos totais
        let totals = {
            totValueMoney: 0,
            totValueCard: 0,
            totValuePix: 0,
            totSalesValue: 0,
            totReceived: 0,
            totValueWithdrawals: 0
        };
        cashRegisters.forEach(cashRegister => {
            cashRegister.cashRegisterTransactions.forEach(transaction => {
                if (transaction.type == 'sale') {
                    console.log({ tv: transaction })
                    totals.totReceived += transaction.value
                }
                if (transaction.type == 'withdrawals') {
                    totals.totValueWithdrawals += transaction.value;
                } else if (transaction.type == 'sale') {
                    totals.totSalesValue += transaction.value
                }

                if (transaction.type != 'withdrawals') {
                    switch (transaction.paymentForm) {
                        case 'paper_Money':
                            totals.totValueMoney += transaction.value;
                            break;
                        case 'card_Money':
                            totals.totValueCard += transaction.value;
                            break;
                        case 'pix_Money':
                            totals.totValuePix += transaction.value;
                            break;
                    }
                }
            })
        })

        return {
            cashRegisters,
            ...totals,
        };
    }

    async isOpenToday(id: string): Promise<Boolean> {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);

        const result = await prisma.cashRegister.findFirst({
            where: {
                AND: [
                    {
                        open_date: {
                            gte: todayStart,
                            lt: tomorrowStart
                        }
                    },
                    {
                        user_id: id
                    },
                    {
                        status: 'open'
                    }
                ]
            }
        });

        console.log({ result })
        return result !== null;
    }
    async cashOpenToday(id: string): Promise<CashRegister | null> {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);

        const result = await prisma.cashRegister.findFirst({
            where: {
                AND: [
                    {
                        open_date: {
                            gte: todayStart,
                            lt: tomorrowStart
                        }
                    },
                    {
                        user_id: id
                    }
                ]
            },
        });

        console.log({ result })
        return result ;
    }
    async updateCashRegister(id: string, data: Prisma.CashRegisterUpdateInput): Promise<CashRegister> {
        const updatedCashRegister = await prisma.cashRegister.update({
            where: {
                id
            },
            data
        })

        return updatedCashRegister
    }

}
