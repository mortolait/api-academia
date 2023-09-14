/*
  Warnings:

  - The values [masculino,feminino,outro] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `enrollment_date` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Students` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('male', 'female', 'other');
ALTER TABLE "Students" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
COMMIT;

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "enrollment_date",
DROP COLUMN "last_name",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "exerciseRestrictions" TEXT,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "goals" TEXT,
ADD COLUMN     "medical_history" TEXT,
ADD COLUMN     "medications" TEXT,
ADD COLUMN     "referral" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3);
