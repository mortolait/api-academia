/*
  Warnings:

  - Added the required column `code` to the `Contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contracts" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "code" TEXT NOT NULL;
