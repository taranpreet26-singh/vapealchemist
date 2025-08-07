-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('Disposables', 'Ejuices', 'Devices', 'Accessories');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "category" "public"."Category" NOT NULL DEFAULT 'Disposables';
