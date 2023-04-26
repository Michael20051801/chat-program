-- CreateTable
CREATE TABLE "googleusers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "description" TEXT,
    "hashedRt" TEXT,

    CONSTRAINT "googleusers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "googleusers_email_key" ON "googleusers"("email");
