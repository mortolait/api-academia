/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_code_key" ON "Products"("code");
