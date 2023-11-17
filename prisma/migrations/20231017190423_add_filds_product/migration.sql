/*
  Warnings:

  - You are about to drop the column `amount` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Products` table. All the data in the column will be lost.
  - Added the required column `allows_sale_without_stock` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_quantity` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimum_quantity` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_price` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selling_price` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('ativo', 'inativo');

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "amount",
DROP COLUMN "title",
ADD COLUMN     "allows_sale_without_stock" BOOLEAN NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "current_quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "minimum_quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "purchase_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "selling_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "StatusProduct" NOT NULL;
