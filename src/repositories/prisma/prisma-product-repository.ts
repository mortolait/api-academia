import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from '../product-repository';
import { prisma } from '@/lib/prisma';

export class PrismaProductRepository implements ProductRepository{
    async create(data: Prisma.ProductCreateInput){
        const product = await prisma.product.create({
            data
        })
        return product
    }
    async findAll(id: string){
        const products = await prisma.product.findMany({
            where:{
                user_id: id
            },
            orderBy:{
                description:"asc"
            }
        })
        return products
    }

    async findByCode(code: string): Promise<Product | null> {
        const student = await prisma.product.findUnique({
            where:{
                code
            }
        })

        return student;
    }

    async updateById(id: string, data: Prisma.ProductUpdateInput) {
        const product = await prisma.product.update({
            where:{
                id
            },
            data
        })
        return product    
    }
   async findByPartName(id: string, part_name: string){
        const products = await prisma.product.findMany({
            where:{
                user_id: id,
                description: {
                    contains: part_name,
                    mode: "insensitive"
                }
            },
            orderBy:{
                description: "asc"
            }
        })
        return products
    }
}