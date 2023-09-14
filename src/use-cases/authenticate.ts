import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credations-error";

interface authenticateRequest{
    email: string,
    password: string
}
interface authenticateResponse{
    user: User
}
export class AuthenticateUseCase{
	constructor(private userRepository:UsersRepository ){}

	async execute({email,password}:authenticateRequest):Promise<authenticateResponse>{
		const user = await this.userRepository.findByEmail(email);
        
		if(!user){
			throw new InvalidCredentialsError();
		}

		const passwordMatches = await compare(password,user.password_hash);

		if(!passwordMatches){
			throw new InvalidCredentialsError();
		}

		return{
			user
		};
	}
}