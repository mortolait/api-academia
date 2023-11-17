import { Prisma,Student } from "@prisma/client";

export interface StudentRepository{
    create(data: Prisma.StudentCreateInput): Promise<Student>
    findByEmail(email: string): Promise<Student | null>
    findByEmailAndId(email: string, id: string): Promise<Student | null>
    findById(id: string): Promise<Student | null>
    findAll(id:string): Promise<Student[]>
    updateById(id: string, data: Prisma.StudentUpdateInput): Promise<Student>
    deleteById(id: string): Promise<Student>
    convertLead(id: string): Promise<Student>
    FindByName(id: string,namePart: string): Promise<Student[] | null>
}