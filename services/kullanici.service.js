const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function kullaniciadiIleKullaniciProfilGetir(kullaniciadi) {
  const kullanici = prisma.kullanici.findFirst({
    where: {
      kullaniciadi,
    },
    include: {
      urunler: {
        include: {
          kullanici: {
            select: {
              kullaniciadi: true,
            }
          },
        },
      }
    }
  })
  return kullanici;
}

async function kullaniciIdIleKullaniciGetir(id) {
  const kullanici = prisma.kullanici.findFirst({
    where: {
      id,
    },
  })
  return kullanici;
}

async function kullaniciadiIleKullaniciGetir(kullaniciadi) {
  const kullanici = prisma.kullanici.findFirst({
    where: {
      kullaniciadi,
    },
  })
  return kullanici;
}

async function yeniKullaniciOlustur(ad, soyad, kullaniciadi, sifre) {
  const kullanici = prisma.kullanici.create({
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
  const kullanici = prisma.kullanici.delete({
    where: {
      kullaniciadi,
    }
  });

  return kullanici;
}

async function  kullaniciadiIleKullaniciGuncelle(kullaniciadi, guncelBilgiler) {
  const kullanici = prisma.kullanici.update({
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