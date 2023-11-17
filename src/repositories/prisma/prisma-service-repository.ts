import { Prisma } from "@prisma/client";
import { serviceRepository } from "../service-repository";
import { prisma } from "@/lib/prisma";

export class PrismaServiceRepository implements serviceRepository {
    async create(data: Prisma.ServiceCreateInput) {
        const service = await prisma.service.create({
            data
        })
        return service
    }
    async findAll(id: string){
        const services = await prisma.service.findMany({
            where:{
                user_id: id
            },
            orderBy:{
                title:"asc"
            }
        })

        return services
    }
   async updateById(id: string,data: Prisma.ServiceUpdateInput){
        const updatedService = await prisma.service.update({
            where:{
                id
            },
            data
        })
        return updatedService
    }
}