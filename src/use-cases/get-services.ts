import { serviceRepository } from "@/repositories/service-repository";

export class GetServicesUseCase{
    constructor(private serviceRepository: serviceRepository){}
    async execute(id:string){
        const services = await this.serviceRepository.findAll(id)
        return services
    }
}