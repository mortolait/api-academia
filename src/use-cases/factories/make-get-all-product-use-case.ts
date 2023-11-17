import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository"
import { GetProductsUseCase } from "../get-products"
export function makeGetAllProducstUseCase(){
    const productRepository = new PrismaProductRepository()
    const getAllProductsUseCase = new GetProductsUseCase(productRepository)
    return getAllProductsUseCase
}