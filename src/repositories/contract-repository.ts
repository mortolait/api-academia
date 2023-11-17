import { Contract, Prisma } from "@prisma/client";

export interface ContractRepository{
    create(data: Prisma.ContractCreateInput): Promise<Contract>
    findAll(user_id: string): Promise<Contract[]>
    updateById(id: string, data: Prisma.ContractUpdateInput): Promise<Contract>
    findById(id: string): Promise<Contract | null>
}