import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID} from "node:crypto";
export class InMemoryUserRepository implements UsersRepository{
	public items: User[] = [];

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user:User = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			role: data.role || "MEMBER",
			create_at: new Date(),
		};

		this.items.push(user);

		return Promise.resolve(user);
	}

	async findByEmail(email: string){
		const user = this.items.find(u => u.email == email);

		if(!user){
			return null; 
		}
		return user;
	}
}