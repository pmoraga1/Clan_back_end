const {Clan} = require("../models/clan.models.js");

const createClan = () => {
    const {usuarioAdmin, usuarioCredenciales, contrasenaCredenciales, plataformaClan} = req.body
    res.status(201).json({usuarioAdmin, usuarioCredenciales, contrasenaCredenciales, plataformaClan})
    
}

const getClan = () => {

}

const editClan = () => {
  
}

const deleteClan = () =>{

}

module.exports = {createClan, editClan, getClan, deleteClan}