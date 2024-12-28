const router = require("express").Router();
const ApiError = require("../utils/ApiError");
const hashing = require("../utils/hashing");
const jwt = require("../utils/jwt");
const cloudinary = require("../utils/cloudinary");
const girisMiddleware = require("../utils/girisMiddleware");
const kullaniciService = require("../services/kullanici.service");
const multer  = require('multer')
const upload = multer();

router.get("/profil/:kullaniciadi", async (req, res, next) => {
  try {
    const kullaniciadi = req.params.kullaniciadi;
    
    const profil = await kullaniciService.kullaniciadiIleKullaniciProfilGetir(kullaniciadi);
    if (!profil) {
      throw new ApiError("kullanıcı bulunamadı.");
    }
    profil.sifre = undefined;
    res.json({
      profil,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let {ad, soyad, kullaniciadi, sifre} = req.body;

    if (!ad || !ad.trim()) throw new ApiError("ad boş olmaz.");
    if (!soyad || !soyad.trim()) throw new ApiError("soyad boş olmaz.");
    if (!kullaniciadi || !kullaniciadi.trim()) throw new ApiError("kullanıcıadı boş olmaz.");
    if (!sifre || !sifre.trim()) throw new ApiError("şifre boş olmaz.");
    ad = ad.trim();
    soyad = soyad.trim();
    kullaniciadi = kullaniciadi.trim().toLowerCase();

    const hashlanmisSifre = hashing.sifreHashla(sifre);
    const yeniKullanici = await kullaniciService.yeniKullaniciOlustur(ad, soyad, kullaniciadi, hashlanmisSifre);
    yeniKullanici.sifre = undefined;
    res.json({
      error: false,
      kullanici: yeniKullanici,
    });
  } catch (error) {
     next(error);
  }
});

router.post('/giris', async (req, res, next) => {
  try {
    let {kullaniciadi, sifre} = req.body;

    if (!kullaniciadi || !kullaniciadi.trim()) throw new ApiError("kullanıcıadı boş olmaz.");
    if (!sifre || !sifre.trim()) throw new ApiError("şifre boş olmaz.");

    kullaniciadi = kullaniciadi.trim().toLowerCase();

    const kullanici = await kullaniciService.kullaniciadiIleKullaniciGetir(kullaniciadi);
    if (!kullanici) {
      throw new ApiError("hatalı kullanıcıadı veya şifre.");
    }

    const sifreDogruMu = hashing.sifreDogrula(sifre, kullanici.sifre);
    if (!sifreDogruMu) {
      throw new ApiError("hatalı kullanıcıadı veya şifre.");
    }

    const token = jwt.jwtTokenOlustur(kullanici.id);
    kullanici.sifre = undefined;
    kullanici.token = token;
    res.json({
      error: false,
      kullanici: kullanici,
    });
  } catch (error) {
     next(error);
  }
});

router.delete("/", girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    const silinenKullanici = await kullaniciService.kullaniciadiIleKullaniciSil(kullanici.kullaniciadi);
    silinenKullanici.sifre = undefined;
    res.json({
      kullanici: silinenKullanici,
    })
    
  } catch (error) {
    next(error);
  }
})

router.patch('/', girisMiddleware, upload.single('resim'), async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    const {ad, soyad, sifre} = req.body;
    const resim = req.file;
    
    const guncelBilgiler = {};
    if (ad && ad.trim()) {
      guncelBilgiler.ad = ad.trim();
    }

    if (soyad && soyad.trim()) {
      guncelBilgiler.soyad = soyad.trim();
    }

    if (sifre && sifre.trim()) {
      guncelBilgiler.sifre = hashing.sifreHashla(sifre);
    }

    if (resim) {
      const url = await cloudinary.upload(resim);
      guncelBilgiler.resim = url;
    }

    const guncelKullanici = await kullaniciService.kullaniciadiIleKullaniciGuncelle(kullanici.kullaniciadi, guncelBilgiler);

    res.json({
      error: false,
      kullanici: guncelKullanici,
    });
  } catch (error) {
     next(error);
  }
});

module.exports = router;