import { ProductRepository } from "@/repositories/product-repository";
import { Prisma, Product } from "@prisma/client";
import { CodeAlreadyExistsError } from "./errors/code-already-exists-error";

export class UpdateProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute(id: string, product: Prisma.ProductUpdateInput) {
        const existsProductWithSameCode = await this.productRepository.findByCode(product.code as any)

        if (existsProductWithSameCode && existsProductWithSameCode.id != id) {
            throw new CodeAlreadyExistsError();
        }
        const updatedProduct = await this.productRepository.updateById(id, product)
        return updatedProduct

    }
}