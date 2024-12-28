-- AlterTable
ALTER TABLE "Urun" ADD COLUMN     "gorunum" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "satanId" INTEGER;

-- CreateTable
CREATE TABLE "Yorum" (
    "id" SERIAL NOT NULL,
    "metin" TEXT NOT NULL,
    "kullaniciId" INTEGER NOT NULL,
    "urunId" INTEGER NOT NULL,

    CONSTRAINT "Yorum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cevap" (
    "id" SERIAL NOT NULL,
    "metin" TEXT NOT NULL,
    "yorumId" INTEGER NOT NULL,

    CONSTRAINT "Cevap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Yorum_id_key" ON "Yorum"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cevap_id_key" ON "Cevap"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cevap_yorumId_key" ON "Cevap"("yorumId");

-- AddForeignKey
ALTER TABLE "Urun" ADD CONSTRAINT "Urun_satanId_fkey" FOREIGN KEY ("satanId") REFERENCES "Kullanici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yorum" ADD CONSTRAINT "Yorum_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yorum" ADD CONSTRAINT "Yorum_urunId_fkey" FOREIGN KEY ("urunId") REFERENCES "Urun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cevap" ADD CONSTRAINT "Cevap_yorumId_fkey" FOREIGN KEY ("yorumId") REFERENCES "Yorum"("id") ON DELETE CASCADE ON UPDATE CASCADE;
