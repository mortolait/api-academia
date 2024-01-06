-- CreateEnum
CREATE TYPE "TypeCashRegister" AS ENUM ('open', 'close');

-- CreateTable
CREATE TABLE "cash_registers" (
    "id" TEXT NOT NULL,
    "open_date" TIMESTAMP(3) NOT NULL,
    "close_date" TIMESTAMP(3),
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "final_balance" DOUBLE PRECISION NOT NULL,
    "total_income" DOUBLE PRECISION NOT NULL,
    "total_expense" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "TypeCashRegister" NOT NULL DEFAULT 'close',

    CONSTRAINT "cash_registers_pkey" PRIMARY KEY ("id")
);
