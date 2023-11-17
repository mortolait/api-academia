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
            },
            orderBy:{
                full_name:"asc"
            }
        });
        return students;
    }
    async updateById(id: string, data: Prisma.StudentUpdateInput): Promise<Student> {
        console.log({id,data});
        const student = await prisma.student.update({
            where:{
                id
            },
            data
        });

        return student;
    }
    async deleteById(id: string): Promise<Student> {  
        const student = await prisma.student.delete({
            where:{
                id
            }
        });

        return student;
    }
    async findByEmailAndId(email: string, id: string): Promise<Student | null> {
        const student = await prisma.student.findFirst({
            where:{
                email,
                id:{
                    not:id
                }
            }
        })

        return student;
    }
    convertLead(id: string): Promise<Student> {
        const student = prisma.student.update({
            where:{
                id
            },
            data:{
                type:"client"
            }
        });

        return student;
    }
    async FindByName(id: string, namePart: string):Promise<Student[]>{
        const students = await prisma.student.findMany({
            where:{
                user_id: id,
                full_name: {
                    contains: namePart,
                    mode: "insensitive"
                }
            },
            orderBy:{
                full_name:"asc"
            }
        });
        return students;
    }
}