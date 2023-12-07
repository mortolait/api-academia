/*
  Warnings:

  - Added the required column `id_client` to the `ContractOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_client` to the `PaymentOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_client` to the `ProductOnSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_client` to the `ServiceOnSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContractOnSale" ADD COLUMN     "id_client" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentOnSale" ADD COLUMN     "id_client" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductOnSale" ADD COLUMN     "id_client" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceOnSale" ADD COLUMN     "id_client" TEXT NOT NULL;
