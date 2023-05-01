/*
  Warnings:

  - The primary key for the `googleusers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "googleusers" DROP CONSTRAINT "googleusers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "googleusers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "googleusers_id_seq";

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "sent" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ;
