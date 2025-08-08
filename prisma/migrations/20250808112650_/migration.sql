-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "discount" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "price" TEXT NOT NULL DEFAULT '0';
