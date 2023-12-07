/*
  Warnings:

  - You are about to drop the column `amount` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `contract_id` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `total_amount` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_student_id_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "amount",
DROP COLUMN "contract_id",
DROP COLUMN "description",
DROP COLUMN "end_date",
DROP COLUMN "product_id",
DROP COLUMN "service_id",
DROP COLUMN "start_date",
DROP COLUMN "student_id",
DROP COLUMN "title",
ADD COLUMN     "total_amount" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "ProductOnSale" (
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductOnSale_pkey" PRIMARY KEY ("saleId","productId")
);

-- CreateTable
CREATE TABLE "ContractOnSale" (
    "saleId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "ContractOnSale_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "ServiceOnSale" (
    "saleId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceOnSale_pkey" PRIMARY KEY ("saleId","serviceId")
);

-- AddForeignKey
ALTER TABLE "ProductOnSale" ADD CONSTRAINT "ProductOnSale_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnSale" ADD CONSTRAINT "ProductOnSale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractOnSale" ADD CONSTRAINT "ContractOnSale_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractOnSale" ADD CONSTRAINT "ContractOnSale_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOnSale" ADD CONSTRAINT "ServiceOnSale_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOnSale" ADD CONSTRAINT "ServiceOnSale_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
