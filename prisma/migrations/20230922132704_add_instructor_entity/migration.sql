-- CreateTable
CREATE TABLE "Intructors" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "education" TEXT,
    "certifications" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "start_date" TIMESTAMP(3),
    "status" "Status",
    "sex" "Sex",
    "salary" DOUBLE PRECISION,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Intructors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Intructors_email_key" ON "Intructors"("email");
