-- CreateTable
CREATE TABLE "CashRegisterTransaction" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "paymentForm" TEXT,
    "date_at" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "idCashRegister" TEXT NOT NULL,

    CONSTRAINT "CashRegisterTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashRegisterTransaction" ADD CONSTRAINT "CashRegisterTransaction_idCashRegister_fkey" FOREIGN KEY ("idCashRegister") REFERENCES "cash_registers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
