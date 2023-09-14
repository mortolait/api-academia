-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('masculino', 'feminino', 'outro');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativo', 'inativo', 'excluido', 'suspenso');

-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "sex" "Sex" NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "plan" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");
