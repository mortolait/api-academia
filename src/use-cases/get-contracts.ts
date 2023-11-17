import { ContractRepository } from "@/repositories/contract-repository";

export class GetContracts{
    constructor(private contractRepository:ContractRepository){}

    async execute(user_id: string){
        const contracts = await this.contractRepository.findAll(user_id)
        return {
            contracts
        }
    }
}