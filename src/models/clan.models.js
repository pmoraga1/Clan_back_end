const mongoose = require ('mongoose')
const clanScheme = {
    id:{
        type: String,
        required: true,
        unique: true
    },
    nombreAdmin: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
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
        required: true
    }
    


}

const Clan = mongoose.model("Clan", )