/*
  Warnings:

  - Added the required column `code` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "code" TEXT NOT NULL;
