-- AddForeignKey
ALTER TABLE "ContractOnSale" ADD CONSTRAINT "ContractOnSale_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
