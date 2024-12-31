const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function odemeBasla(urunId) {
  const odeme = await prisma.odeme.upsert({
    where: {
      urunId,
    },
    update: {
      urunId,
    },
    create: {
      urunId,
    },
  });
  return odeme;
}

async function odemeTamamla(id, kullaniciId, dekont, durum) {
  const odeme = await prisma.odeme.update({
    where: {
      id,
    },
    data: {
      dekont,
      kullaniciId,
      durum,
    }
  });
  return odeme;
}

async function faturaGetir(id) {
  const odeme = await prisma.odeme.findFirst({
    where: {
      id,
    },
  });
  return odeme;
}

module.exports = {
  odemeBasla,
  odemeTamamla,
  faturaGetir,
}
