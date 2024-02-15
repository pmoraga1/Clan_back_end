const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const clanSchema = new Schema ({
    //id:{
    //    type: String,
    //    unique: true
    //},
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
        type: String,
        enum: ["Netflix", "HBO Max", "Disney +", "Spotify", "Youtube Premium"],
        required: true
    },

    estadoClan: {
        type: String,
        enum: ["activo", "inactivo"],
        default: "inactivo",
      },

    miembros: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]


    
})

const Clan = mongoose.model("Clan", clanSchema)

module.exports = {Clan}