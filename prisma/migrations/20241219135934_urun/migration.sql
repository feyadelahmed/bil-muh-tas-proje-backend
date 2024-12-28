/*
  Warnings:

  - You are about to drop the column `resim` on the `Urun` table. All the data in the column will be lost.
  - Added the required column `kategori` to the `Urun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Urun" DROP COLUMN "resim",
ADD COLUMN     "kategori" TEXT NOT NULL,
ADD COLUMN     "materyal" TEXT,
ADD COLUMN     "renk" TEXT;

-- CreateTable
CREATE TABLE "Resim" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "urunid" INTEGER NOT NULL,

    CONSTRAINT "Resim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resim_id_key" ON "Resim"("id");

-- AddForeignKey
ALTER TABLE "Resim" ADD CONSTRAINT "Resim_urunid_fkey" FOREIGN KEY ("urunid") REFERENCES "Urun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
