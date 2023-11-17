import { PrismaProductRepository } from "../../repositories/prisma/prisma-product-repository"
import { RegisterProductUseCase } from "../../use-cases/register-product"

export function makeRegisterProductUseCase(){
    const productRepository = new  PrismaProductRepository()
    const productUseCase = new RegisterProductUseCase(productRepository)

    return productUseCase
}