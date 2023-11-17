import { makeRegisterProductUseCase } from "@/use-cases/factories/make-register-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"

export async function create(request: FastifyRequest,reply: FastifyReply){
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

    const { sub } = request.user

    const {
        allows_sale_without_stock,
        code,
        current_quantity,
        description,
        minimum_quantity,
        purchase_price,
        selling_price,
        active
    } = createBodySchema.parse(request.body)

    console.log(request.body)

    try {
        const registerProductUseCase = makeRegisterProductUseCase()
        const product = await registerProductUseCase.execute({
            allows_sale_without_stock,
            code,
            current_quantity,
            description,
            minimum_quantity,
            purchase_price,
            selling_price,
            active,
            user_id:sub
        })

        return reply.status(201).send(product)
    } catch (error) {
        //verificar se produto ja existe
    }
}