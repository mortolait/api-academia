import { PrismaSaleRepository } from "../../repositories/prisma/prisma-sale-repository"
import { GetSalesByIdClient } from "../get-sales-by-Id-client"

export function makeGetSalesByIdClient(){
    const prismaSaleRepository = new PrismaSaleRepository()
    const getSalesByIdClient = new GetSalesByIdClient(prismaSaleRepository)
    return getSalesByIdClient
}