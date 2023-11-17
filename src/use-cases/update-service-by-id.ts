import { serviceRepository } from "@/repositories/service-repository";
import { Prisma, Service } from "@prisma/client";

export class UpdateServiceById{
    constructor(private serviceRepository: serviceRepository){}

    async execute(service: Prisma.ServiceUpdateInput){
        const updatedService = await this.serviceRepository.updateById(service.id as any , service)
        return {
            updatedService
        }
    }
}