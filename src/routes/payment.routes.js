const express = require("express");
const paymentRouter = express.Router();
const {
  preferencesMercadoPago,
} = require("../controllers/payment.controller.js");
const { auth } = require("../middlewares/auth.js");

paymentRouter.post("/create-Preference", auth, preferencesMercadoPago);

module.exports = { paymentRouter };
