-- CreateTable
CREATE TABLE "PaymentOnSale" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PaymentOnSale_pkey" PRIMARY KEY ("saleId")
);

-- AddForeignKey
ALTER TABLE "PaymentOnSale" ADD CONSTRAINT "PaymentOnSale_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
