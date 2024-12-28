/*
  Warnings:

  - A unique constraint covering the columns `[kullaniciadi]` on the table `Kullanici` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Kullanici" ALTER COLUMN "ad" SET DATA TYPE TEXT,
ALTER COLUMN "soyad" SET DATA TYPE TEXT,
ALTER COLUMN "kullaniciadi" SET DATA TYPE TEXT,
ALTER COLUMN "sifre" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_kullaniciadi_key" ON "Kullanici"("kullaniciadi");
