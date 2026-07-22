-- CreateEnum
CREATE TYPE "job_model" AS ENUM ('hybrid', 'remote', 'on-site');

-- CreateEnum
CREATE TYPE "job_status" AS ENUM ('saved', 'applied', 'interviewing', 'rejected');

-- CreateTable
CREATE TABLE "job_opportunities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "company_id" UUID NOT NULL,
    "description" TEXT,
    "model" "job_model" NOT NULL,
    "status" "job_status" NOT NULL,

    CONSTRAINT "job_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "job_opportunities_company_id_idx" ON "job_opportunities"("company_id");

-- AddForeignKey
ALTER TABLE "job_opportunities" ADD CONSTRAINT "job_opportunities_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
