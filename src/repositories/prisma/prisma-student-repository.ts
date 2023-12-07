import { $Enums, Prisma, Student } from "@prisma/client";
import { StudentRepository } from "../student-repository";

import { prisma } from "../../lib/prisma";

enum Status {
    ativo,
    inativo,
    excluido,
    suspenso
}
export class PrismaStudentRepository implements StudentRepository {
    async create(data: Prisma.StudentCreateInput) {
        const student: Student = await prisma.student.create({
            data
        });
        return student
    }

    async findByEmail(email: string): Promise<Student | null> {
        const student = await prisma.student.findUnique({
            where: {
                email
            }
        })

        return student;
    }

    async findById(id: string): Promise<Student | null> {
        let student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                contracts: true
            }
        });

        if (student === null) {
            return null;
        }

        const today = new Date();
        let newStatus = 'contract_inactive'; // Define o status padrão como inativo

        for (let contract of student.contracts) {
            const startDate = new Date(contract.startDate);
            const endDate = new Date(contract.endDate);
            const twoDaysBeforeEnd = new Date(endDate);
            twoDaysBeforeEnd.setDate(twoDaysBeforeEnd.getDate() - 2);
            if (today >= twoDaysBeforeEnd && today < endDate) {
                newStatus = 'contract_to_expire';
                break; // Se um contrato prestes a expirar for encontrado, interrompe a iteração
            }
            if (startDate <= today && endDate > today) {
                newStatus = 'contract_active';
                break; // Se um contrato ativo for encontrado, interrompe a iteração
            }




        }

        const studentUpdated = await prisma.student.update({
            where: {
                id: student.id
            },
            data: {
                statusContract: newStatus
            }
        });

        return studentUpdated;
    }


    async findAll(id: string): Promise<Student[]> {
        const students = await prisma.student.findMany({
            where: {
                user_id: id,
            },
            include: {
                contracts: true,
            },
        });

        const today = new Date();

        for (const student of students) {
            if (student.type === 'client') {
                if (student.contracts.length == 0) {
                    await prisma.student.update({
                        where: {
                            id: student.id,
                        },
                        data: {
                            statusContract: 'contract_inactive'
                        },
                    });
                }
                for (const contract of student.contracts) {
                    let newStatus;

                    if (contract.endDate < today) {
                        newStatus = 'contract_inactive';
                    } else if (contract.endDate > today) {
                        const twoDaysBeforeEnd = new Date(contract.endDate);
                        twoDaysBeforeEnd.setDate(twoDaysBeforeEnd.getDate() - 2);

                        newStatus = today >= twoDaysBeforeEnd ? 'contract_to_expire' : 'contract_active';
                    }

                    if (newStatus) {
                        await prisma.student.update({
                            where: {
                                id: student.id,
                            },
                            data: {
                                statusContract: newStatus
                            },
                        });
                    }
                }
            }
            else {
                await prisma.student.update({
                    where: {
                        id: student.id,
                    },
                    data: {
                        statusContract: 'contract_contract'
                    },
                });
            }
        }
        const updatedStudents = await prisma.student.findMany({
            where: {
                user_id: id,
            },
            include: {
                contracts: true,
            },
        });
        const sortedStudents = updatedStudents
            .map(student => ({
                ...student,
                orderPriority: student.statusContract === 'contract_to_expire' ? 0 : 1
            }))
            .sort((a, b) => {
                if (a.orderPriority !== b.orderPriority) {
                    return a.orderPriority - b.orderPriority;
                }
                return a.full_name.localeCompare(b.full_name);
            });
        return sortedStudents;
    }



    async updateById(id: string, data: Prisma.StudentUpdateInput): Promise<Student> {
        console.log({ id, data });
        const student = await prisma.student.update({
            where: {
                id
            },
            data
        });

        return student;
    }
    async deleteById(id: string): Promise<Student> {
        const student = await prisma.student.delete({
            where: {
                id
            }
        });

        return student;
    }
    async findByEmailAndId(email: string, id: string): Promise<Student | null> {
        const student = await prisma.student.findFirst({
            where: {
                email,
                id: {
                    not: id
                }
            }
        })

        return student;
    }
    convertLead(id: string): Promise<Student> {
        const student = prisma.student.update({
            where: {
                id
            },
            data: {
                type: "client"
            }
        });

        return student;
    }
    async FindByName(id: string, namePart: string): Promise<Student[]> {
        const students = await prisma.student.findMany({
            where: {
                user_id: id,
                full_name: {
                    contains: namePart,
                    mode: "insensitive"
                }
            },
            orderBy: {
                full_name: "asc"
            }
        });
        return students;
    }
}

