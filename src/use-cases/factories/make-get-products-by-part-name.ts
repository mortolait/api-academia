import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository"
import { GetProductByDescription } from "../get-product-by-description"

export function makeGetProductsByDescriptionUseCase(){
    const prismaProductRepository = new PrismaProductRepository()
    const getProductByDescription = new GetProductByDescription(prismaProductRepository)
    return getProductByDescription
}