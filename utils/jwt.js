const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtTokenSecret = process.env.JWT_TOKEN_SECRET;

function jwtTokenOlustur(id) {
  return jwt.sign({id}, jwtTokenSecret);
}

function jwtTokenDogrula(token) {
  return jwt.verify(token, jwtTokenSecret);
}

module.exports = {
  jwtTokenOlustur,
  jwtTokenDogrula,
}
