import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UpdateStatusWppUserById } from '../update-status-wpp-user-by-id'

export function makeUpdateStatusWpp(){
    const userRepository = new PrismaUsersRepository()
    const updateStatusWppUserById = new UpdateStatusWppUserById(userRepository)
    return updateStatusWppUserById
}