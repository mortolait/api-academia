import { ProductRepository } from "@/repositories/product-repository";

export class GetProductsUseCase{
    constructor(private productRepository: ProductRepository){}

    async execute(id: string) {
        const products =  await this.productRepository.findAll(id)
        return { 
            products
        }
    }
}