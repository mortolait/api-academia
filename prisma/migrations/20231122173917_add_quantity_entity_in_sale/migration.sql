/*
  Warnings:

  - Added the required column `quantity` to the `ProductOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueDiscount` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ServiceOnSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOnSale" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "valueDiscount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ServiceOnSale" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;
