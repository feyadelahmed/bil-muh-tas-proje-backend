const express = require('express');
require('dotenv').config();
const cors = require('cors');

const kullaniciRoute = require('./routes/kullanici.route');
const urunRoute = require('./routes/urun.route');
const yorumRoute = require('./routes/yorum.route');
const odemeRoute = require('./routes/odeme.route');
const ApiError = require('./utils/ApiError');
const { getRes, staticData } = require('./test-api-calls');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/kullanici", kullaniciRoute)
app.use("/urun", urunRoute)
app.use("/yorum", yorumRoute)
app.use("/odeme", odemeRoute)

app.get("/", (req, res) => {
  res.json({status: "ok"});
});

app.get("/a", async (req, res) => {
  try {
    const data = await getRes();
    
    if (data.includes(undefined)) {
      res.json(staticData);
    } else {
      res.json(data);
    }
  } catch (error) {
  }
})

app.use((error, req, res, next) => {
  console.log(error);
  let errorMsg = "";
  if (error.code === 'P2002') {
    errorMsg = `${error.meta.target[0]} zaten mevcut.`;
  }

  if (error instanceof ApiError) {
    errorMsg = error.message;
  }

  if (error.name == "JsonWebTokenError") {
    errorMsg = "izinsiz erişim";
  }

  if (errorMsg.length === 0) {
    errorMsg = "bilinmeyen bir hata oluştu";
  }

  res.json({
    error: true,
    errorMsg,
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log("Server is running at http://localhost:3000");
});