import { PrismaServiceRepository } from "../../repositories/prisma/prisma-service-repository"
import { UpdateServiceById } from "../update-service-by-id"

export function makeUpdateServiceByIdUseCase(){
    const prismaServiceRepository = new PrismaServiceRepository()
    const updateServiceById = new UpdateServiceById(prismaServiceRepository)
    return updateServiceById
}