import { ProductRepository } from "@/repositories/product-repository";

export class GetProductByDescription{
    constructor(private productRepository: ProductRepository){}

    async execute(id: string, part_name: string){
        const products = await this.productRepository.findByPartName(id,part_name)
        return products
    }
}