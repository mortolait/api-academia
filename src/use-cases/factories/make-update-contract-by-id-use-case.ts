import { PrismaContractRepository } from "../../repositories/prisma/prisma-contract-repository"
import { UpdateContractById } from "../update-contract-by-id"

export function makeUpdateContractById(){
    const prismaContractRepository = new PrismaContractRepository()
    const updateContractById = new UpdateContractById(prismaContractRepository)
    return  updateContractById
}