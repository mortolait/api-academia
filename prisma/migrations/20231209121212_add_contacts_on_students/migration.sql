-- CreateTable
CREATE TABLE "ContactOnStudent" (
    "id" TEXT NOT NULL,
    "id_student" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ContactOnStudent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactOnStudent" ADD CONSTRAINT "ContactOnStudent_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
