// IMPORTACIONES
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/config/database/connectDB.js");
const { userRouter } = require("./src/routes/users.routes.js");
const { clanRouter } = require("./src/routes/clan.routes.js");
const  accountsRouter = require("./src/routes/accounts.routes.js");
const cors = require("cors");
const mercadopago = require ("mercadopago")
// SDK de Mercado Pago
const  { MercadoPagoConfig } = require ('mercadopago') 
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'TEST-4308655814863998-030117-2696beaebc55c541ce5d66ca17f213f4-72855761' });



app.post("/create-Preference", (req,res)=>{
  const preference = new Preference(client);
// los items vienen del front 
  preference.create({
    body: {
      items: [
        {
          title: 'Mi producto',
          quantity: 1,
          unit_price: 4500
        }
      ],
    }
  })
  .then((response)=>{
    res.json({
      id:response.body.id
    })
  })
  .catch(console.log);
})



// INSTANCIAS
const app = express();
const PUERTO = process.env.PORT || 3000; // Si el puerto no está definido en el archivo .env, usa el puerto 3000
connectDB();





// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTAS
app.use("/users", userRouter);
app.use("/clan", clanRouter);
app.use("/accounts", accountsRouter);

// Iniciar el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor en ejecución en el puerto ${PUERTO}`);
});


