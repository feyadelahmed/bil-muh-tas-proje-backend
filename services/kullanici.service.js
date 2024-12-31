const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function kullaniciadiIleKullaniciProfilGetir(kullaniciadi) {
  const kullanici = await prisma.kullanici.findFirst({
    where: {
      kullaniciadi,
    },
    include: {
      urunler: {
        include: {
          kullanici: {
            select: {
              kullaniciadi: true,
            },
          },
          odeme: true,
        },
      },
      odemeler: {
        include: {
          urun: true,
        }
      },
    }
  })
  kullanici.urunler = kullanici.urunler.filter(urun => !urun.odeme || !urun.odeme.durum);
  return kullanici;
}

async function kullaniciIdIleKullaniciGetir(id) {
  const kullanici = await prisma.kullanici.findFirst({
    where: {
      id,
    },
  })
  return kullanici;
}

async function kullaniciadiIleKullaniciGetir(kullaniciadi) {
  const kullanici = await prisma.kullanici.findFirst({
    where: {
      kullaniciadi,
    },
  })
  return kullanici;
}

async function yeniKullaniciOlustur(ad, soyad, kullaniciadi, sifre) {
  const kullanici = await prisma.kullanici.create({
    data: {
      ad,
      soyad,
      kullaniciadi,
      sifre,
    }
  });
  return kullanici;
}

async function kullaniciadiIleKullaniciSil(kullaniciadi) {
  const kullanici = await prisma.kullanici.delete({
    where: {
      kullaniciadi,
    }
  });

  return kullanici;
}

async function  kullaniciadiIleKullaniciGuncelle(kullaniciadi, guncelBilgiler) {
  const kullanici = await prisma.kullanici.update({
    where: {
      kullaniciadi,
    },
    data: guncelBilgiler,
  });

  return kullanici;
}

module.exports = {
  kullaniciIdIleKullaniciGetir,
  kullaniciadiIleKullaniciGetir,
  yeniKullaniciOlustur,
  kullaniciadiIleKullaniciSil,
  kullaniciadiIleKullaniciGuncelle,
  kullaniciadiIleKullaniciProfilGetir,
}