import { ContractRepository } from "@/repositories/contract-repository";
import { Prisma } from "@prisma/client";

export class UpdateContractById{
    constructor(private contractRepository: ContractRepository){}

    async execute(id: string, data: Prisma.ContractUpdateInput){
        const contract = await this.contractRepository.updateById(id,data)
        return {
            contract
        }
    }
}