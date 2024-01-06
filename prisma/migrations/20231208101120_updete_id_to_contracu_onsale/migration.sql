/*
  Warnings:

  - The primary key for the `ContractOnSale` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ContractOnSale" DROP CONSTRAINT "ContractOnSale_pkey",
ADD CONSTRAINT "ContractOnSale_pkey" PRIMARY KEY ("id");
