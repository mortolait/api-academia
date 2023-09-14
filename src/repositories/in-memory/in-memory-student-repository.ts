import { randomUUID } from "node:crypto";
import { Prisma, Student } from "@prisma/client";
import { StudentRepository } from "../student-repository";

export class InMemoryStudentRepository implements StudentRepository{
	public items: Student[] = [];

	async create(data: Prisma.StudentCreateInput): Promise<Student>{
		const student: Student= {
			id: randomUUID(),
			name: data.name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
			date_of_birth: new Date(data.date_of_birth),
			status: data.status || "ativo",
			plan: data.plan,
			enrollment_date: new Date(data.enrollment_date),
			expiration_date: new Date(data.expiration_date),
			sex: data.sex || "masculino",
			create_at: new Date()
		};

		this.items.push(student);

		return Promise.resolve(student) ;    
	}

	async findByEmail(email: string){
		const student = this.items.find((student) => student.email === email);

		if(!student){
			return null;
		}

		return Promise.resolve(student);	
	}
}