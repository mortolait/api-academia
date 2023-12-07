import { Prisma, Product } from "@prisma/client";

export interface ProductRepository{
    create(data: Prisma.ProductCreateInput):Promise<Product>
    findAll(id: string):Promise<Product[]>
    updateById(id:string, data: Prisma.ProductUpdateInput): Promise<Product>
    findByCode(code: string): Promise<Product | null>
    findByPartName(id: string, part_name: string): Promise<Product[] | null>
}