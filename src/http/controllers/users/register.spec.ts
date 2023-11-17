import request from "supertest";
import { afterAll, beforeAll, describe,expect,it } from "vitest";

import { app } from "../../../app";

describe("Register (e2e)", ()=>{
	beforeAll(async ()=>{
		app.ready();
	});

	afterAll(async () => {
		app.close();
	});

	it("should be able to register a user", async ()=> {
		const response = await request(app.server).post("/users").send({
			name: "lucas teste",
			email: "email@tscdcfds.com",
			password: "senha123"
		});
		expect(response.statusCode).toEqual(201);
	});
});