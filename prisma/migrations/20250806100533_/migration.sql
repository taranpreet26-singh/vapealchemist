-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('Latest', 'Old');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "status" "public"."ProductStatus" NOT NULL DEFAULT 'Latest';
