import { PrismaServiceRepository } from "../../repositories/prisma/prisma-service-repository"
import { RegisterServiceUseCase } from "../register-service"
export function makeRgisterServiceUseCase(){
    const prismaServiceRepository = new PrismaServiceRepository()
    const registerServiceUseCase = new RegisterServiceUseCase(prismaServiceRepository)
    return registerServiceUseCase
}