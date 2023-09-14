import { $Enums, Prisma, Student } from "@prisma/client";
import { StudentRepository } from "../student-repository";

import { prisma } from "../../lib/prisma";

export class PrismaStudentRepository implements StudentRepository {
    async create(data: Prisma.StudentCreateInput){
        const student:Student = await prisma.student.create({
            data
        });
        return student
    }
    
    async findByEmail(email: string): Promise<Student | null> {
        const student = await prisma.student.findUnique({
            where:{
                email
            }
        })

        return student;
    }
}