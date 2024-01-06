-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idCashOpen_fkey" FOREIGN KEY ("idCashOpen") REFERENCES "cash_registers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
