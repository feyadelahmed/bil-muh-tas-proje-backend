const router = require("express").Router();
const ApiError = require("../utils/ApiError");
const girisMiddleware = require("../utils/girisMiddleware");
const yorumService = require("../services/yorum.service");

router.post("/", girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    const {metin, urunId} = req.body;
    const yorum = await yorumService.yorumYaz(metin, kullanici.id, urunId);
    return res.json({
      yorum,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/cevap", girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    let {metin, yorumId} = req.body;
    yorumId = parseInt(yorumId);
    const yorum = await yorumService.yorumIdIleYorumGetir(yorumId);
    if (yorum.urun.kullaniciId != kullanici.id) {
      throw new ApiError("yetkisiz erişim");
    };
    const cevap = await yorumService.cevapYaz(metin, yorumId);
    return res.json({
      cevap,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:yorumId", girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    const yorumId = parseInt(req.params.yorumId);
    const yorum = await yorumService.yorumIdIleYorumGetir(yorumId);
    if (yorum.kullaniciId != kullanici.id) {
      throw new ApiError("yetkisiz erişim");
    }
    const silinenYorum = await yorumService.yorumIdIleYorumSil(yorumId);
    return res.json({
      yorum: silinenYorum,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/cevap/:cevapId", girisMiddleware, async (req, res, next) => {
  try {
    const kullanici = req.kullanici;
    const cevapId = parseInt(req.params.cevapId);
    const cevap = await yorumService.cevapIdIleCevapGetir(cevapId);
    if (cevap.yorum.urun.kullaniciId != kullanici.id) {
      throw new ApiError("yetkisiz erişim");
    }
    const silinenCevap = await yorumService.cevapIdIleCevapSil(cevapId);
    return res.json({
      cevap: silinenCevap,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;