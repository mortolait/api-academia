import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository"
import { UpdateProductUseCase } from "../update-product-by-id"

export function makeUpdateProductUseCase(){
    const productRepository = new PrismaProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    return updateProductUseCase
}