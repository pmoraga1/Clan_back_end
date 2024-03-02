const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  nombreCuenta: {
    type: String,
    required: true,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  numUsuarios: {
    type: Number,
    required: true,
  },
  detalles: {
    type: Object,
    required: true,
  },
  imagenUrl: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
