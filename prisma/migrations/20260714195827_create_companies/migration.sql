-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);
