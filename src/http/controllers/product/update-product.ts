import { CodeAlreadyExistsError } from "@/use-cases/errors/code-already-exists-error";
import { makeUpdateProductUseCase } from "@/use-cases/factories/make-update-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { string, z } from "zod";

export async function updateById(request: FastifyRequest, reply: FastifyReply) {
    
    const createParamSchema = z.object({
		id: z.string(),
	});
    const createBodySchema = z.object({
        description: z.string(),
        selling_price: z.number(),
        purchase_price: z.number(),
        code: z.string(),
        active: z.boolean(),
        allows_sale_without_stock: z.boolean(),
        current_quantity: z.number(),
        minimum_quantity: z.number()
    })

    const { 
        active, 
        allows_sale_without_stock, 
        code, current_quantity, 
        description, minimum_quantity, 
        purchase_price, 
        selling_price
     } = createBodySchema.parse(request.body)

     const { id } = createParamSchema.parse(request.params)
    
     try {
        const updateProductUseCase = makeUpdateProductUseCase()
        const updatedProduct = await updateProductUseCase.execute(id,{
            active, 
            allows_sale_without_stock, 
            code, current_quantity, 
            description, minimum_quantity, 
            purchase_price, 
            selling_price,
        })

        reply.status(200).send(updatedProduct)
     } catch (err) {
        if (err instanceof CodeAlreadyExistsError) {
			return reply.status(409).send(err.message);
		}
     }
}