import { ContractRepository } from "@/repositories/contract-repository";

export class GetContractById{
    constructor(private contractRepository:ContractRepository){}

    async execute(id: string){
        const contract = await this.contractRepository.findById(id)
        return{
            contract
        }
    }
}