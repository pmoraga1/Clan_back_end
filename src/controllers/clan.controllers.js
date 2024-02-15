const { encrypt, compareEncryptedData } = require("../helpers/encrypt.js");
const {Clan} = require("../models/clan.model.js");
const { User } = require("../models/user.model.js");

const createClan = async (req,res) => {
    const { admin, usuarioCredencialesClan, contrasenaClan, plataformaClan } = req.body;
    if (!admin || !usuarioCredencialesClan || !contrasenaClan || !plataformaClan ) {
        return res.status(403).json({ error: "Complete los campos admin, usuarioCredencialesClan, plataformaClan"});
       }
    try {
        const adminUser = await User.findOne({ correo: admin.toLowerCase()});

        if (!adminUser) {
            return res.status(404).json({ mensaje: "El administrador especificado no existe" });
        }

        const hashedContrasenaClan = await encrypt(contrasenaClan);
        const nuevoClan = new Clan({
          admin: adminUser._id,
          usuarioCredencialesClan: usuarioCredencialesClan,
          hashContrasenaClan: hashedContrasenaClan,
          plataformaClan: plataformaClan
    });
        await nuevoClan.save();
     return  res.status(201).json({
        mensaje: "Registro de Clan exitoso",
        status: "OK",
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
      return res.status(403).json({ 
          mensaje: "Clan ya existe, por favor ingrese otro",
        });
        
      }
     return res.status(500).json({
        mensaje: "ERROR DE SERVIDOR",
      });
    }
};

const editClan = () => {
  
}

const deleteClan = async (req,res) =>{
    const {clanId} = req.body
    try {
        const clan = await Clan.findByIdAndDelete(clanId);
        if (!clan){
        return res.status(404).json({ mensaje: "Clan no encontrado" });
    }
    return res.status(200).json({ mensaje: "Clan eliminado correctamente" });

    } catch (error){
        console.error("Error al eliminar el clan:", error);
        return res.status(500).json({ mensaje: "Error servidor al eliminar el clan" });
    }
}

const getClan = () => {
}

module.exports = {createClan, editClan, deleteClan, getClan}