import { PrismaContractRepository } from '../../repositories/prisma/prisma-contract-repository'
import { GetContractById } from "../get-contract-by-Id"

export function makeGetContractByIdUseCase(){
    const prismaContractRepository = new PrismaContractRepository()
    const getContractById = new GetContractById(prismaContractRepository)

    return getContractById
}