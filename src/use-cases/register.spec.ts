import { beforeAll, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register-user";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";

let userRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("register use case", ()=> {
	beforeAll(()=>{
		userRepository = new InMemoryUserRepository();
		sut = new RegisterUseCase(userRepository);
	});

	it("should to register", async ()=>{
		const { user } = await sut.execute({
			name: "joao da silva",
			email: "joao@email.com",
			password: "senha123",
		});

		expect(user.id).toEqual(expect.any(String));
	});
});