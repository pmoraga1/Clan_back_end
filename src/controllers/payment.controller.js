// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require('mercadopago');
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
const mercadopago = require ("mercadopago")
const {Account} = require ('../models/accounts.model.js')
const {Clan} = require ('../models/clan.model.js')


const preferencesMercadoPago = async (req, res) => {
  const { clanId, precio } = req.body;

  if (!clanId || !precio) {
    return res.status(403).json({ error: "Complete clanId y precio" });
  }

  try {
    const preference = new Preference(client)
    const respuesta = await preference.create  ({
      body:{
        items: [
          {
            title: clanId,
            unit_price: parseInt(precio),
            currency_id: "CLP",
            quantity: 1
          },
        ],
      }
    })
console.log(respuesta)
    res.json({
      id: respuesta.id,
      init_point: respuesta.init_point
    })

  } catch (error) {
    console.error("Error en preferencesMercadoPago:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  preferencesMercadoPago,
};


