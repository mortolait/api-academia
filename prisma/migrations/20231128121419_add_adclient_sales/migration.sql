/*
  Warnings:

  - Added the required column `idClient` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "idClient" TEXT NOT NULL;
