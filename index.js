
// IMPORTACIONES
const EXPRESS = require("express");
require("dotenv").config();
const {connectDB} = require("./src/config/database/connectDB.js")
const { userRouter } = require("./src/routes/users.routes.js")
const { clanRouter } = require("./src/routes/clan.routers.js")
const cors = require("cors");


// INSTANCIAS
const app = EXPRESS();
const PUERTO = process.env.PUERTO;
connectDB()

// MIDDLEWARES
app.use(cors())
app.use(EXPRESS.json());

// RUTAS
app.use("/users", userRouter);
app.use("/clan", clanRouter);
app.listen(PUERTO, () => {
  console.log(`${PUERTO} listening `);
});



