-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortInfo" TEXT NOT NULL,
    "puffs" TEXT NOT NULL,
    "nicotineStrength" TEXT NOT NULL,
    "eLiquidCapacity" TEXT NOT NULL,
    "battery" TEXT NOT NULL,
    "features" TEXT[],
    "flavors" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "public"."Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "public"."Product"("id");
