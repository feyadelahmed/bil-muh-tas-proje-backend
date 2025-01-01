const router = require("express").Router();
const ApiError = require("../utils/ApiError");
const girisMiddleware = require("../utils/girisMiddleware");
const odemeService = require("../services/odeme.service");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;

router.post("/webhook", async (req, res, next) => {
  const event = req.body;
  res.sendStatus(200);
  if (event.type == "charge.succeeded") {
    const {paid, receipt_url} = event.data.object;
    const {kullaniciId, odemeId} = event.data.object.metadata;
    const odeme = await odemeService.odemeTamamla(odemeId, parseInt(kullaniciId), receipt_url, paid);
    console.log(odeme);
  } 
});

router.post("/session", girisMiddleware, async (req, res, next) => {
  try {
    const {urun} = req.body;
    const odeme = await odemeService.odemeBasla(urun.id);

    const session = await stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          kullaniciId: req.kullanici.id,
          odemeId: odeme.id,
        },
      },
      line_items: [
        {
          price_data: {
            currency: "TRY",
            product_data: {
              name: urun.ad,
              images: [urun.resim]
            },
            unit_amount: urun.fiyat * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${FRONTEND_DOMAIN}/odeme/success/${odeme.id}`,
      cancel_url: `${FRONTEND_DOMAIN}/odeme/cancel/${odeme.id}`,
    });
    res.json({
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/fatura/:odemeId", async (req, res, next) => {
  try {
    const odemeId = req.params.odemeId;
    const odeme = await odemeService.faturaGetir(odemeId);
    res.json({
      odeme,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;