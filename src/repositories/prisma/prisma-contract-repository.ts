import { Contract, Prisma } from '@prisma/client';
import { ContractRepository } from '../contract-repository'

import { prisma } from "../../lib/prisma";

export class PrismaContractRepository implements ContractRepository {
    async create(data: Prisma.ContractCreateInput) {
        const contract = await prisma.contract.create({
            data
        })
        return contract
    }
    async findAll(user_id: string) {
        const contracts = await prisma.contract.findMany({
            where: {
                user_id
            },
            orderBy:{
                description:"asc"
            }
        })
        return contracts
    }
    async updateById(id: string, data: Prisma.ContractUpdateInput) {
        {
            const contract = await prisma.contract.update({
                where: {
                    id
                },
                data
            })
            return contract
        }
    }
    async findById(id: string){
        const contract = await prisma.contract.findUnique({
            where:{
                id
            }
        })
        return contract
    }
}