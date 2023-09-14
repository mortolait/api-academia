import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";
import { beforeEach, describe, it, expect} from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credations-error";

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("authenticate use case", ()=>{
	beforeEach(()=>{
		userRepository = new InMemoryUserRepository();
		sut = new AuthenticateUseCase(userRepository);
	});
	it("should to be able authenticate", async ()=> {
		await userRepository.create({
			name: "Lucas teste",
			email: "lucas@teste.com",
			password_hash: await hash("senha123",6)
		});

		const { user } = await sut.execute({
			email: "lucas@teste.com",
			password: "senha123"
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should to be able authenticate with wrong email",async ()=>{
		await expect(()=>
			sut.execute({
				email: "teste@emailwrong.com",
				password: "senha123"
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should to be able authenticate with wrong password", async ()=>{
		await userRepository.create({
			name: "testeWithEmail",
			email: "teste@wrongpass.com",
			password_hash: await hash("senha123",6)
		});
		expect (()=>
			sut.execute({
				email: "teste@wrongpass.com",
				password: "senha12"
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});