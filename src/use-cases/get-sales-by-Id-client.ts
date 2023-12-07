import { SaleRepository } from "@/repositories/sale-repository";

export class GetSalesByIdClient {
    constructor(private saleRepository: SaleRepository) { }

    async execute(id: string) {
        const sales = await this.saleRepository.getSaleByIdClient(id)
        return {
            sales
        }
    }
}