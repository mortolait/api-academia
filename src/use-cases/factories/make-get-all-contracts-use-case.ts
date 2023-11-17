import { PrismaContractRepository } from "../../repositories/prisma/prisma-contract-repository";
import { GetContracts } from "../get-contracts"

export function makeGetAllContractsUseCase(){
    const prismaContractRpository = new PrismaContractRepository()
    const getContracts = new GetContracts(prismaContractRpository)
    return getContracts
}
