-- CreateTable
CREATE TABLE "Kullanici" (
    "id" SERIAL NOT NULL,
    "ad" VARCHAR(255) NOT NULL,
    "soyad" VARCHAR(255) NOT NULL,
    "kullaniciadi" VARCHAR(255) NOT NULL,
    "sifre" VARCHAR(512) NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_id_key" ON "Kullanici"("id");
