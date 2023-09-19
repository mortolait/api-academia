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

    async findById(id: string): Promise<Student | null> {
        const student = await prisma.student.findUnique({
            where:{
                id
            }
        })

        return student;
    }
    async findAll(id: string):Promise<Student[]>{
        const students = await prisma.student.findMany({
            where:{
                user_id: id
            }
        });
        return students;
    }
    async deleteById(id: string): Promise<Student> {  
        const student = await prisma.student.delete({
            where:{
                id
            }
        });

        return student;
    }
}