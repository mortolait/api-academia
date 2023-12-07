/*
  Warnings:

  - You are about to drop the column `quantity` on the `PaymentOnSale` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `PaymentOnSale` table. All the data in the column will be lost.
  - Added the required column `type` to the `PaymentOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `PaymentOnSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentOnSale" DROP COLUMN "quantity",
DROP COLUMN "serviceId",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
