import { ProductRepository } from "@/repositories/product-repository";

interface ProductRequestBody {
    description: string,
    selling_price: number,
    purchase_price: number,
    code: string,
    active: boolean,
    allows_sale_without_stock: boolean,
    current_quantity: number,
    minimum_quantity: number,
    user_id: string
}
export class RegisterProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async execute({
        allows_sale_without_stock,
        code, current_quantity,
        description, minimum_quantity,
        purchase_price,
        selling_price,
        active,
        user_id }: ProductRequestBody) {

      const registeredProduct = await this.productRepository.create({
            allows_sale_without_stock,
            code, current_quantity,
            description, minimum_quantity,
            purchase_price,
            selling_price,
            active,
            user_id
        })

        return {
            registeredProduct
        }
    }
}