const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function urunOustur(
  kullaniciId,
  ad,
  kategori,
  fiyat,
  aciklama,
  marka,
  durum,
  il,
  ilce,
  renk,
  materyal,
  resim) {
    const urun = await prisma.urun.create({
      data: {
        kullaniciId,
        ad,
        kategori,
        fiyat,
        aciklama,
        marka,
        durum,
        il,
        ilce,
        renk,
        materyal,
        resim,
      },
      include: {
        kullanici: {
          select: {
            kullaniciadi: true,
          }
        },
      }
    });
    return urun;
}

async function urunIdIleUrunGetir(id) {
  const urun = await prisma.urun.findFirst({
    where: {
      id,
    },
    include: {
      kullanici: {
        select: {
          kullaniciadi: true,
          ad: true,
          soyad: true,
          resim: true,
        }
      },
      yorumlar: {
        include: {
          kullanici: true,
          cevap: true,
        }
      }
    }
  });
  return urun;
}

async function urunIdIleKullanicininUrunuSil(id, kullaniciId) {
  const urun = await prisma.urun.delete({
    where: {
      id,
      kullaniciId,
    }
  });
  return urun;
}

async function  urunGuncelle(id, guncelBilgiler) {
  const urun = await prisma.urun.update({
    where: {
      id,
    },
    data: guncelBilgiler,
  });

  return urun;
}

async function urunGorunumArttir(id) {
  const urun = await prisma.urun.update({
    where: {
      id,
    },
    data: {
      gorunum: {
        increment: 1,
      }
    },
    include: {
      kullanici: {
        select: {
          kullaniciadi: true,
          ad: true,
          soyad: true,
          resim: true,
        }
      },
      yorumlar: {
        include: {
          kullanici: true,
          cevap: true,
        }
      }
    }
  });

  return urun;
}

async function tumUrunleriGetir() {
  const urunler = await prisma.urun.findMany({
    include: {
      kullanici: {
        select: {
          kullaniciadi: true,
          ad: true,
          soyad: true,
          resim: true,
        }
      },
      yorumlar: {
        include: {
          kullanici: true,
          cevap: true,
        }
      },
      odeme: true,
    }
  });
  return urunler;
}

module.exports = {
  urunOustur,
  urunIdIleUrunGetir,
  tumUrunleriGetir,
  urunIdIleKullanicininUrunuSil,
  urunGuncelle,
  urunGorunumArttir,
}

