const mongoose = require('mongoose')
const Schema = mongoose.Schema
const clanSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    usuarioAdmin: {
        type: String,
        required: true,
        trim: true,
        match:  [/.+\@.+\..+/]
    },
    
    fechaCreacion:{
        type: Date,
        required: true
    },
    usuarioCredenciales:{
        type: String,
        required: true,
        lowercase: true

    },
    contrasenaCredenciales:{
        type: String,
        required: true,
        trim: true
    },
    plataformaClan:{
        type: String,
        enum: ['Netflix', 'HBO Max', 'Disney +', 
        'Spotify', 'Youtube Premium'],
        required: true
    },
    usuariosClan:[{
        type: String,
    }],
    strikes:[{
        type: String
    }],
    estadoClan:{

    }
})

const Clan = mongoose.model("Clan", clanSchema)

module.exports = {Clan}