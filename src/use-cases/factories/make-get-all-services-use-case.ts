import { PrismaServiceRepository} from "../../repositories/prisma/prisma-service-repository"
import { GetServicesUseCase } from "../get-services"

export function makeGetAllServicesUseCase(){
    const prismaServiceRepository = new PrismaServiceRepository()
    const getServicesUseCase = new GetServicesUseCase(prismaServiceRepository)
    return getServicesUseCase
}