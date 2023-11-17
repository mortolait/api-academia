import { ContractRepository } from "../repositories/contract-repository"

interface ContractRequestBody {
    description: string,
    amount: number,
    installments: number,
    code: string,
    active: boolean
    user_id: string,
    amount_per_installment: number
}

export class RegisterContract {
    constructor(private contractRepository: ContractRepository) { }

    async execute({ amount, description,code,active, installments,user_id,amount_per_installment }: ContractRequestBody) {
      const contract = await this.contractRepository.create({
            amount,
            description,
            installments,
            user_id,
            code,
            active,
            amount_per_installment
        })  

        return {
            contract 
        }
    }
}