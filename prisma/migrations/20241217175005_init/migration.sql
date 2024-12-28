/*
  Warnings:

  - You are about to drop the column `image` on the `Kullanici` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kullanici" DROP COLUMN "image",
ADD COLUMN     "resim" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Urun" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "fiyat" DECIMAL(65,30) NOT NULL,
    "aciklama" TEXT NOT NULL,
    "marka" TEXT NOT NULL,
    "durum" TEXT NOT NULL,
    "il" TEXT NOT NULL,
    "ilce" TEXT NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "resim" TEXT NOT NULL DEFAULT '',
    "tarih" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Urun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Urun_id_key" ON "Urun"("id");

-- AddForeignKey
ALTER TABLE "Urun" ADD CONSTRAINT "Urun_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE CASCADE ON UPDATE CASCADE;
