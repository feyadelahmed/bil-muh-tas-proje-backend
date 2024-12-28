const router = require("express").Router();
const ApiError = require("../utils/ApiError");
const cloudinary = require("../utils/cloudinary");
const girisMiddleware = require("../utils/girisMiddleware");
const urunService = require("../services/urun.service");
const multer  = require('multer')
const upload = multer();

function fiyatValidasyonu(fiyat) {
  if (isNaN(fiyat) || isNaN(parseFloat(fiyat))) return false;
  let parcalar = fiyat.split(".");
  if (parcalar.length > 1 && parcalar[1].length > 2) return false;
  return true; 
};

router.post("/", girisMiddleware, upload.single('resim') ,async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    let {
      ad,
      kategori,
      fiyat,
      aciklama,
      marka,
      durum,
      renk,
      materyal,
      il,
      ilce,
    } = req.body;
    const resim = req.file;

    if (!ad || !ad.trim()) throw new ApiError('ad boş olmaz');
    if (!kategori || !kategori.trim()) throw new ApiError('kategori boş olmaz');
    if (!fiyat || !fiyat.trim()) throw new ApiError('fiyat boş olmaz');
    if (!aciklama || !aciklama.trim()) throw new ApiError('aciklama boş olmaz');
    if (!marka || !marka.trim()) throw new ApiError('marka boş olmaz');
    if (!durum || !durum.trim()) throw new ApiError('durum boş olmaz');
    if (!il || !il.trim()) throw new ApiError('il boş olmaz');
    if (!ilce || !ilce.trim()) throw new ApiError('ilce boş olmaz');
    if (!resim) throw new ApiError('resim boş olmaz');

    if(!fiyatValidasyonu(fiyat)) throw new ApiError('fiyat "12.34" Şekilde bir sayi olmalidir');
    
    ad = ad.trim();
    kategori = kategori.trim();
    fiyat = parseFloat(fiyat);
    aciklama = aciklama.trim();
    marka = marka.trim();
    durum = durum.trim();
    il = il.trim();
    ilce = ilce.trim();

    if (renk && renk.trim()) renk = renk.trim();
    if (materyal && materyal.trim()) materyal = materyal.trim();

    const resimUrl = await cloudinary.upload(resim);
    
    const urun = await urunService.urunOustur(
      kullanici.id,
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
      resimUrl,
    );
    
    res.json({
      urun,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    let urun = await urunService.urunIdIleUrunGetir(id);
    if (!urun) throw new ApiError("urun bulunamadı");
    urun = await urunService.urunGorunumArttir(id);
    res.json({
      urun,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const urunler = await urunService.tumUrunleriGetir();
    res.json({
      urunler,
    });
  } catch (error) {
    next(error);
  }
})


router.delete("/:id", girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    const id = parseInt(req.params.id);
    const urun = await urunService.urunIdIleKullanicininUrunuSil(id, kullanici.id);
    res.json({
      urun,
    });
  } catch (error) {
    if (error.code == 'P2025') {
      next(new ApiError("urun bulunamadı veya kullanıcıya ait değil"));
    } else {
      next(error);
    }
  }
});

router.patch("/:id", girisMiddleware, upload.single('resim') ,async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const kullanici = req.kullanici;

    const existUrun = await urunService.urunIdIleUrunGetir(id);
    if (existUrun.kullaniciId != kullanici.id) {
      throw new ApiError("yetkisiz erişim");
    }

    let {
      ad,
      kategori,
      fiyat,
      aciklama,
      marka,
      durum,
      renk,
      materyal,
      il,
      ilce,
    } = req.body;
    const resim = req.file;

    const guncelBilgiler = {};
    if (ad) { guncelBilgiler.ad = ad.trim();}
    if (kategori) { guncelBilgiler.kategori = kategori.trim();}
    if (fiyat) { 
      if(!fiyatValidasyonu(fiyat)) throw new ApiError('fiyat "12.34" Şekilde bir sayi olmalidir');
      guncelBilgiler.fiyat = fiyat.trim();
    }
    if (aciklama) { guncelBilgiler.aciklama = aciklama.trim();}
    if (marka) { guncelBilgiler.marka = marka.trim();}
    if (durum) { guncelBilgiler.durum = durum.trim();}
    if (il) { guncelBilgiler.il = il.trim();}
    if (ilce) { guncelBilgiler.ilce = ilce.trim();}
    if (renk) { guncelBilgiler.renk = renk.trim();}
    if (materyal) { guncelBilgiler.materyal = materyal.trim();}

    if (resim) {
      const resimUrl = await cloudinary.upload(resim);
      guncelBilgiler.resim = resimUrl;
    }
    
    const urun = await urunService.urunGuncelle(id, guncelBilgiler);
    
    res.json({
      urun,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;