const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function yorumIdIleYorumGetir(id) {
  const yorum = await prisma.yorum.findFirst({
    where: {
      id,
    },
    include: {
      urun: true,
      cevap: true,
    }
  });
  return yorum;
}

async function yorumYaz(metin, kullaniciId, urunId) {
  const yorum = await prisma.yorum.create({
    data: {
      metin,
      urunId,
      kullaniciId,
    }
  });
  return yorum;
}

async function yorumIdIleYorumSil(id) {
  const yorum = await prisma.yorum.delete({
    where: {
      id,
    }
  });
  return yorum;
}

async function cevapIdIleCevapGetir(id) {
  const cevap = await prisma.cevap.findFirst({
    where: {
      id,
    },
    include: {
      yorum: {
        include: {
          urun: true,
        }
      }
    }
  });
  return cevap;
}

async function cevapYaz(metin, yorumId) {
  const cevap = await prisma.cevap.create({
    data: {
      metin,
      yorumId,
    }
  });
  return cevap;
}

async function cevapIdIleCevapSil(id) {
  const cevap = await prisma.cevap.delete({
    where: {
      id,
    }
  });
  return cevap;
}

module.exports = {
  yorumIdIleYorumGetir,
  cevapIdIleCevapGetir,
  yorumYaz,
  yorumIdIleYorumSil,
  cevapYaz,
  cevapIdIleCevapSil,
}

