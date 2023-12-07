/*
  Warnings:

  - Added the required column `total_received` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'PENDING', 'PARTIALLY_PAID');

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "outstandingBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "statusPayment" "PaymentStatus" NOT NULL DEFAULT 'PAID',
ADD COLUMN     "total_received" DOUBLE PRECISION NOT NULL;
