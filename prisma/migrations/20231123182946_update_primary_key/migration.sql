/*
  Warnings:

  - The primary key for the `PaymentOnSale` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PaymentOnSale" DROP CONSTRAINT "PaymentOnSale_pkey",
ADD CONSTRAINT "PaymentOnSale_pkey" PRIMARY KEY ("id");
