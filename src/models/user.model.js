const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema ( {
  nombreCompleto: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  correo: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [
      /.+\@.+\..+/,
      "Por favor ingrese un correo válido",
    ] /* expresion regular */,
    lowercase: true,
  },
  hashContrasena: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  fechaNacimiento: {
    type: Date,
  },
  
  rol: {
    type: String,
    enum: ["usuario", "admin", "vendedor"],
    default: "usuario",
  },
  estadoCuenta: {
    type: String,
    enum: ["activo", "inactivo", "baneado"],
    default: "inactivo",
  },
  ultimoAcceso: {
    type: Date,
    default: Date.now,
  },
  
  historialClanes: [
    {
      clanID: Schema.Types.ObjectId,
    //   ref: "Clan",
    },
  ],
  preferencias: [{ type: String }],
  
  strikes: { 
    type: Number,
    default: 0,
    min: 0,
    max: 3
  },

  miembrode: [
    {
      clanID: Schema.Types.ObjectId,
    //   ref: "Clan",
    },
  ],

  administradorde: [
    {
      clanID: Schema.Types.ObjectId,
    //   ref: "Clan",
    },
  ],

  username: {
    type: String
  },


});
// en mongoose.model("aqui va el nombre de la coleccion o del modelo","esquema")
const User = mongoose.model("User",userSchema);

module.exports = {User}