const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.get("/", (req, res) => {
  res.json({status: "ok"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  console.log("Server is running at http://localhost:3000");
});