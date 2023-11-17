import { Prisma, Service } from "@prisma/client"

export interface serviceRepository{
    create(data: Prisma.ServiceCreateInput):Promise<Service>
    findAll(id: string): Promise<Service[]>
    updateById(id: string,data: Prisma.ServiceUpdateInput): Promise<Service>
}