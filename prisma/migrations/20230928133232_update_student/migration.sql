/*
  Warnings:

  - You are about to drop the column `address` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `expiration_date` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "address",
DROP COLUMN "expiration_date",
DROP COLUMN "payment_method",
DROP COLUMN "plan",
DROP COLUMN "start_date",
ADD COLUMN     "document" TEXT;
