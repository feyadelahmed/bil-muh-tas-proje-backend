const kullaniciService = require("../services/kullanici.service");
const ApiError = require("./ApiError");
const jwt = require("./jwt");

module.exports = async function(req, res, next) {
  try {
    const token = req.headers.token;
    
    if (!token) throw new ApiError('izinsiz erişim');

    const jwtVerileri = jwt.jwtTokenDogrula(token);
    if (!jwtVerileri) throw new ApiError('izinsiz erişim');

    const kullanici = await kullaniciService.kullaniciIdIleKullaniciGetir(jwtVerileri.id);
    if (!kullanici) throw new ApiError('izinsiz erişim');

    req.kullanici = kullanici;  
    next();
  } catch (error) {
    next(error);
  }
}