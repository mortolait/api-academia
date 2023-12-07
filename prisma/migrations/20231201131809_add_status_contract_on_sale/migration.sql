/*
  Warnings:

  - Added the required column `status` to the `ContractOnSale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusContract" AS ENUM ('active', 'inactive', 'queue');

-- AlterTable
ALTER TABLE "ContractOnSale" ADD COLUMN     "status" "StatusContract" NOT NULL;
