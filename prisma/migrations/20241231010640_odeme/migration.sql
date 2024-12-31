/*
  Warnings:

  - You are about to drop the column `satanId` on the `Urun` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Urun" DROP CONSTRAINT "Urun_satanId_fkey";

-- AlterTable
ALTER TABLE "Urun" DROP COLUMN "satanId";

-- CreateTable
CREATE TABLE "Odeme" (
    "id" TEXT NOT NULL,
    "urunId" INTEGER NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "dekont" TEXT,
    "durum" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Odeme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Odeme_id_key" ON "Odeme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Odeme_urunId_key" ON "Odeme"("urunId");

-- AddForeignKey
ALTER TABLE "Odeme" ADD CONSTRAINT "Odeme_urunId_fkey" FOREIGN KEY ("urunId") REFERENCES "Urun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odeme" ADD CONSTRAINT "Odeme_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE CASCADE ON UPDATE CASCADE;
