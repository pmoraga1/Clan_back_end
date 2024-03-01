const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const clanSchema = new Schema ({

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    fechaCreacion:{
        type: Date,
        default: Date.now
    },

    usuarioCredencialesClan:{
        type: String,
        required: true,
        lowercase: true
    },

    hashContrasenaClan:{
        type: String,
        required: true,
    },

    plataformaClan:{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },

    estadoClan: {
        type: String,
        enum: ["activo", "inactivo"],
        default: "activo",
      },

    miembros: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    clanCompleto: {
        type: Boolean,
        default: false
    },

    cuposClan: {
        type: Number,
        required: true
    },

    tipoClan: {
        type: String,
        enum: ["publico", "privado"],
        required: true
      },

    
})

const Clan = mongoose.model("Clan", clanSchema)

module.exports = {Clan}