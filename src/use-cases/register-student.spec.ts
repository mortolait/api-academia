import { beforeAll, describe, it,expect } from "vitest";
import { InMemoryStudentRepository } from "../repositories/in-memory/in-memory-student-repository";
import { RegisterStudentUseCase } from "./register-student";

let studentRepository: InMemoryStudentRepository;
let sut: RegisterStudentUseCase;

describe ("Register student", () => {
	beforeAll(() => {
		studentRepository = new InMemoryStudentRepository();
		sut = new RegisterStudentUseCase(studentRepository);
	});
	it("Should register student ", async () => {
        
		const student = {
			name: "joao da silva",
			last_name: "da silva",
			email: "email@teste.com",
			phone: "999999999",
		};

		const { studentRegister } =  await sut.execute(student);

		expect(studentRegister.id).toEqual(expect.any(String));
	});

	it("should not register student with same email", async () => {

		await sut.execute({
			name: "Joao",
			last_name: "da silva",
			email: "email@joao.com",
			phone: "999999999",
		});

		await expect(()=> 
			sut.execute({
				name: "joao da silva",
				last_name: "da silva",
				email: "email@joao.com",
				phone: "999999999"
			})
		).rejects.toBeInstanceOf(Error);
	});
});
