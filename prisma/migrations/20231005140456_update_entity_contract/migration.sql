/*
  Warnings:

  - You are about to drop the column `end_date` on the `Contracts` table. All the data in the column will be lost.
  - You are about to drop the column `sale_id` on the `Contracts` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Contracts` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Contracts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Contracts` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_per_installment` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installments` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Contracts` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Contracts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_id` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contracts" DROP CONSTRAINT "Contracts_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "Contracts" DROP CONSTRAINT "Contracts_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_user_id_fkey";

-- DropForeignKey
ALTER TABLE "gyms" DROP CONSTRAINT "gyms_user_id_fkey";

-- DropIndex
DROP INDEX "Contracts_sale_id_key";

-- DropIndex
DROP INDEX "Sales_contract_id_key";

-- AlterTable
ALTER TABLE "Contracts" DROP COLUMN "end_date",
DROP COLUMN "sale_id",
DROP COLUMN "start_date",
DROP COLUMN "student_id",
DROP COLUMN "title",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "amount_per_installment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "installments" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "product_id" TEXT,
ADD COLUMN     "service_id" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;
