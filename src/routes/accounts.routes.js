const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accounts.controller");

// Ruta para crear una nueva cuenta compartida
router.post("/", accountsController.createSharedAccount);

// Ruta para editar una cuenta compartida existente
router.patch("/:id", accountsController.editSharedAccount);

// Ruta para obtener todas las cuentas
router.get("/getAllAccounts", accountsController.getAllAccounts);

// Ruta para obtener una sola cuenta por ID
router.get("/getAccountById/:id", accountsController.getAccountById);


module.exports = router;
