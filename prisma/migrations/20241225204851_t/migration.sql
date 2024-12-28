/*
  Warnings:

  - You are about to drop the `Resim` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resim` to the `Urun` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resim" DROP CONSTRAINT "Resim_urunid_fkey";

-- AlterTable
ALTER TABLE "Urun" ADD COLUMN     "resim" TEXT NOT NULL;

-- DropTable
DROP TABLE "Resim";
