const mercadopago = require ("mercadopago")
const  { MercadoPagoConfig } = require ('mercadopago') 
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
const {Account} = require ('../models/accounts.model.js')
const {Clan} = require ('../models/clan.model.js')



const preferencesMercadoPago = async (req, res) => {
  const { clanId, precio } = req.body;

  if (!clanId || !precio) {
    return res.status(403).json({ error: "Complete clanId, precio" });
  }

  try {
    const preference = new mercadopago.Preference();

    preference.create({
      items: [
        {
          title: clanId,
          unit_price: parseFloat(precio),
          quantity: 1,
        },
      ],
    })
      .then((response) => {
        res.json({
          id: response.body.id,
        });
      })
      .catch((error) => {
        console.error("Error creating Mercado Pago preference:", error);
        res.status(500).json({ error: "Error creating Mercado Pago preference" });
      });

  } catch (error) {
    console.error("Error in preferencesMercadoPago:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  preferencesMercadoPago,
};


