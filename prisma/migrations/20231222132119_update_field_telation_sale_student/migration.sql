/*
  Warnings:

  - You are about to drop the column `studentId` on the `Sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_studentId_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "studentId";

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
