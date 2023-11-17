import { PrismaContractRepository } from "../../repositories/prisma/prisma-contract-repository"
import { RegisterContract } from "../../use-cases/register-contract"

export function makeRegisterContractUseCase(){
    const prismaContractRepository = new PrismaContractRepository ()
    const registerContract = new RegisterContract(prismaContractRepository)
    return registerContract
}