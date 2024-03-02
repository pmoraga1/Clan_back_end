const { encrypt } = require("../helpers/encrypt.js");
const { Clan } = require("../models/clan.model.js");
const { User } = require("../models/user.model.js");

const createClan = async (req, res) => {
  const {
    admin,
    usuarioCredencialesClan,
    contrasenaClan,
    plataformaClan,
    cuposClan,
    tipoClan,
  } = req.body;
  if (
    !admin ||
    !usuarioCredencialesClan ||
    !contrasenaClan ||
    !plataformaClan ||
    !cuposClan ||
    !tipoClan
  ) {
    return res.status(403).json({
      error:
        "Complete los campos admin, usuarioCredencialesClan, plataformaClan, cuposClan y tipoClan",
    });
  }
  try {
    const adminUser = await User.findOne({ correo: admin.toLowerCase() });

    if (!adminUser) {
      return res
        .status(404)
        .json({ mensaje: "El administrador especificado no existe" });
    }

    const hashedContrasenaClan = await encrypt(contrasenaClan);
    const nuevoClan = new Clan({
      admin: adminUser._id,
      usuarioCredencialesClan: usuarioCredencialesClan,
      hashContrasenaClan: hashedContrasenaClan,
      plataformaClan: plataformaClan,
      cuposClan: cuposClan,
      tipoClan: tipoClan,
    });
    adminUser.administradorde.push(nuevoClan._id);
    await User.findByIdAndUpdate(adminUser._id, adminUser);
    await nuevoClan.save();
    return res.status(201).json({
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

const addMember = async (req, res) => {
  const { clanId, userId } = req.body;
  try {
    if (!clanId || !userId) {
      return res.status(403).json({
        error: "Complete los campos clanId y userId",
      });
    }
    const clan = await Clan.findById(clanId);
    const memberUser = await User.findOne({ _id: userId });

    if (clan.clanCompleto) {
      return res.status(403).json({
        error: "El clan está completo, no hay cupos disponibles",
      });
    } else {
      clan.miembros.push(userId);
      memberUser.miembrode.push(clan._id);
      await User.findByIdAndUpdate(memberUser._id, memberUser);

      if (clan.miembros.length === clan.cuposClan) {
        clan.clanCompleto = true;
      }

      await clan.save();

      return res.status(200).json({
        mensaje: "Miembro añadido correctamente",
        clan,
      });
    }
  } catch (error) {
    console.error("Error al añadir miembro al clan:", error);
    return res.status(500).json({
      mensaje: "Error servidor al añadir miembro al clan",
    });
  }
};

const deleteMember = async (req, res) => {
  const { clanId, userId } = req.body;
  try {
    if (!clanId || !userId) {
      return res
        .status(403)
        .json({ error: "Complete los campos clanId y userId" });
    }
    const clan = await Clan.findById(clanId);
    if (!clan) {
      return res.status(404).json({ error: "Clan no encontrado" });
    }
    if (!clan.miembros.includes(userId)) {
      return res.status(404).json({
        error: "El usuario no es miembro de este clan",
      });
    }

    clan.miembros.pull(userId);

    await clan.save();

    return res.status(200).json({
      mensaje: "Miembro eliminado correctamente del clan",
    });
  } catch (error) {
    console.error("Error al añadir miembro al clan:", error);
    return res.status(500).json({
      mensaje: "Error servidor al añadir miembro al clan",
    });
  }
};

const deleteClan = async (req, res) => {
  const { clanId } = req.params;
  try {
    const clan = await Clan.findByIdAndDelete(clanId);
    if (!clan) {
      return res.status(404).json({
        mensaje: "Clan no encontrado",
      });
    }
    return res.status(200).json({
      mensaje: "Clan eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar el clan:", error);
    return res.status(500).json({
      mensaje: "Error servidor al eliminar el clan",
    });
  }
};

const editCredentials = async (req, res) => {
  const { clanId, usuarioCredencialesClan, contrasenaClan } = req.body;
  try {
    if (!clanId || !usuarioCredencialesClan || !contrasenaClan) {
      return res.status(400).json({
        error:
          "Complete los campos clanId, usuarioCredencialesClan y contrasenaClan",
      });
    }

    const clan = await Clan.findById(clanId);
    if (!clan) {
      return res.status(404).json({
        error: "Clan no encontrado",
      });
    }

    clan.usuarioCredencialesClan = usuarioCredencialesClan;
    clan.hashContrasenaClan = await encrypt(contrasenaClan);

    await clan.save();

    return res
      .status(200)
      .json({ mensaje: "Credenciales del clan actualizadas correctamente" });
  } catch (error) {
    console.error("Error al editar las credenciales del clan:", error);
    return res.status(500).json({
      mensaje: "Error del servidor al editar credenciales",
    });
  }
};

const deleteCredentials = async (req, res) => {
  const { clanId } = req.params;
  try {
    const clan = await Clan.findById(clanId);
    if (!clan) {
      return res.status(404).json({
        mensaje: "Clan no encontrado",
      });
    }
    clan.usuarioCredencialesClan = null;
    clan.hashContrasenaClan = null;

    await clan.save();
    return res.status(200).json({
      mensaje: "Credenciales eliminadas correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar las credenciales:", error);
    return res.status(500).json({
      mensaje: "Error del servidor al eliminar credenciales",
    });
  }
};

const getClan = async (req, res) => {
  const { clanId } = req.params;
  try {
    const clan = await Clan.findById(clanId);
    if (!clan) {
      return res.status(404).json({
        mensaje: "Clan no encontrado",
      });
    }
    return res.status(200).json({
      mensaje: "Clan encontrado",
      data: {
        clan,
      },
    });
  } catch (error) {
    console.error("Error al obtener el clan:", error);
    return res.status(500).json({
      mensaje: "Error de servidor al obtener el clan",
    });
  }
};
const getAllClan = async (req, res) => {
  const { userId } = req.params;
  const { plataforma } = req.query;
  try {
    const clanes = await Clan.find({
      plataformaClan: plataforma,
      admin: { $ne: userId },
    });
    return res.status(200).json({
      mensaje: "Clanes encontrados",
      data: clanes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Error de servidor al obtener los clanes",
    });
  }
};

module.exports = {
  createClan,
  deleteClan,
  getClan,
  addMember,
  deleteMember,
  editCredentials,
  deleteCredentials,
  getAllClan,
};
