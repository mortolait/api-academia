/*
  Warnings:

  - The required column `id` was added to the `ContractOnSale` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ProductOnSale` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ServiceOnSale` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "ContractOnSale" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductOnSale" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceOnSale" ADD COLUMN     "id" TEXT NOT NULL;
