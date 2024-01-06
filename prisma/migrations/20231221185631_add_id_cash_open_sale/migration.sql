/*
  Warnings:

  - Added the required column `idCashOpen` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "idCashOpen" TEXT NOT NULL;
