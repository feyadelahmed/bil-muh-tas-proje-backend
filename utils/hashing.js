const bcrypt = require('bcrypt');

function sifreHashla(sifre) {
  return bcrypt.hashSync(sifre, 12);
}

function sifreDogrula(sifre, hashlanmisSifre) {
  return bcrypt.compareSync(sifre, hashlanmisSifre);
}

module.exports = {
  sifreHashla,
  sifreDogrula,
};