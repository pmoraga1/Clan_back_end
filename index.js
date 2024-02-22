// IMPORTACIONES
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/config/database/connectDB.js");
const { userRouter } = require("./src/routes/users.routes.js");
const { clanRouter } = require("./src/routes/clan.routes.js");
const  accountsRouter = require("./src/routes/accounts.routes.js");
const cors = require("cors");

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


