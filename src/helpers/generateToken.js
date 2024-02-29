const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_JWT


const generarPrimerToken = () => {
    const token = jwt.sign({hola:"untexto"},"miSuperSecreto")
    return token
}

const generateUserToken = ({nombreCompleto, correo, rol, username, historialClanes, miembrode, administradorde, _id }) => {
    const token = jwt.sign({nombreCompleto, correo, rol, username, historialClanes, miembrode, administradorde,_id},secret)
    return token
}

module.exports={generarPrimerToken, generateUserToken}
