/*
  Warnings:

  - Added the required column `value` to the `ContractOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueDiscount` to the `ContractOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `ProductOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueDiscount` to the `ProductOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `ServiceOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueDiscount` to the `ServiceOnSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContractOnSale" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valueDiscount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ProductOnSale" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valueDiscount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ServiceOnSale" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valueDiscount" DOUBLE PRECISION NOT NULL;
