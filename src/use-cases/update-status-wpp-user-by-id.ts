import { UsersRepository } from "@/repositories/users-repository";

export class UpdateStatusWppUserById{
    constructor(private userRepository: UsersRepository){}

    async execute(id: string){
        const user = this.userRepository.updateStatusWpp(id)
        return {
            user
        }
    }
}