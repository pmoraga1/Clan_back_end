
// IMPORTACIONES
const EXPRESS = require("express");

// importacion de paquete dotenv y ocupamos metodo config para que
// nuetra app tenga disponible las variables de entorno 
require("dotenv").config();

const {connectDB} = require("./src/config/database/connectDB.js")

// importacion de enrutador de usuarios
const { userRouter } = require("./src/routes/users.routes.js");


// INSTANCIAS
const app = EXPRESS();
// nos trajimos desde las variables de entorno, el puerto
// que va estar ecuchando las peticiones de nuestra app
const PUERTO = process.env.PUERTO;
connectDB()

// MIDDLEWARES
// es el metodo json de express que nos sirve para poder recibir 
// objetos json dentro del cuerpo de las peticiones 
app.use(EXPRESS.json());

// RUTAS
// middleware para rutas. 
// todas las rutas que empiecen con /users 
// se van a ir al archivo userRouter
app.use("/users", userRouter);
// creamos el escuchador de nuestra app
// que va estar levantando nuestra app en cierto puerto
// escuchara las peticiones que le enviemos
// estas peticiones las va estar levantando en nuestro PUERTO llamado PUERTO
// que va estar en nuestra variable de entorno
app.listen(PUERTO, () => {
  console.log(`${PUERTO} listening`);
});
