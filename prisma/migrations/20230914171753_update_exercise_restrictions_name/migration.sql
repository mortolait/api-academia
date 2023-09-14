/*
  Warnings:

  - You are about to drop the column `exerciseRestrictions` on the `Students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "exerciseRestrictions",
ADD COLUMN     "exercise_restrictions" TEXT;
