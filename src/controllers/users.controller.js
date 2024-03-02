// importaciones
const { encrypt, compareEncryptedData } = require("../helpers/encrypt.js");
const { generateUserToken } = require("../helpers/generateToken.js");
const { User } = require("../models/user.model.js");
const { generateUserName } = require("../helpers/generateUserName.js");

// controladores
const registerUser = async (req, res) => {
  const { nombreCompleto, correo, contrasena } = req.body;
  if (!nombreCompleto || !correo || !contrasena) {
    return res
      .status(403)
      .json({
        error: "Complete los campos nombreCompleto, correo, contrasena",
      });
  }
  try {
    const hashedPassword = await encrypt(contrasena);
    const nuevoUsuario = new User({
      nombreCompleto: nombreCompleto,
      correo: correo,
      hashContrasena: hashedPassword,
      username: generateUserName(),
      miembrode: []
    });
    const token = generateUserToken(nuevoUsuario);
    await nuevoUsuario.save();
    return res.status(201).json({
      mensaje: "Registro exitoso",
      status: "OK",
      data: token,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(403).json({
        mensaje: "Correo ya existe, por favor ingrese otro",
      });
    }
    return res.status(500).json({
      mensaje: "ERROR DE SERVIDOR",
    });
  }
};

const strikesUserById = async (req, res) => {
  const { id } = req.body;
  console.log("estoy imprimiendo el id", id);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario con este id no existe",
      });
    }

    if (user.strikes < 3) {
      console.log(user);
      user.strikes = user.strikes + 1;
      if (user.strikes == 3) {
        user.estadoCuenta = "baneado";
      }
      console.log(user.strikes);
      user.save();
      return res.status(200).json({
        mensaje: "Se ha sumado un strike a este usario",
      });
    }
    return res.status(403).json({
      mensaje: "Usuario ha sido baneado, no puede sumar mas strikes",
    });
  } catch (error) {
    return res.status(500).send("error");
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  console.log("estoy imprimiendo el id", id);
  
  // console.log(
  //   "estoy imprimiendo nombreCompleto, contrasena",
  //   nombreCompleto,
  //   contrasena
  // );

  // if (!nombreCompleto) {
  //   return res.status(403).json({ error: "Complete el campo nombreCompleto" });
  // }

  try {
    const user = await User.findByIdAndUpdate(id,req.body,{new:true});

    // if (!user) {
    //   return res.status(404).json({
    //     mensaje: "Usuario con este id no existe",
    //   });
    // }

    // if (contrasena) {
    //   const hashedPassword = await encrypt(contrasena);
    //   user.hashContrasena = hashedPassword;
    // }

    // user.nombreCompleto = nombreCompleto;
    // await user.save();

    return res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      data: generateUserToken(user),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "ERROR DE SERVIDOR",
    });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario con este id no existe",
      });
    }

  
    return res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "ERROR DE SERVIDOR",
    });
  }
};




const getUserByEmail = async (req, res) => {
  const { correo } = req.body;
  if (!correo) {
    return res.status(403).json({ error: "Debe ingresar un correo" });
  }
  try {
    const usuarioEncontrado = await User.findOne({ correo: correo });
    if (!usuarioEncontrado) {
      return res.status(404).json({
        mensaje: `no existe usuario con el correo ${correo}`,
      });
    }
    // es para borrar la propiedad hash contrasena
    delete usuarioEncontrado.hashContrasena;
    return res.status(200).json({
      mensaje: "Usuario encontrado",
      data: usuarioEncontrado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "ERROR DE SERVIDOR",
    });
  }
};

const getUserById = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id)
    if(!user){
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }
    return res.status(200).json({  
      mensaje: "Usuario encontrado", 
      data: { 
        user,
      }
    });
  }
  catch (error) {
    console.error("Error al obtener el usuario", 
    error
    );
    return res.status(500).json({ 
      mensaje: "Error de servidor al obtener el usuario" 
    });
  }}



const logInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({
      mensaje: "Debe ingresar email y password",
    });
  }
  try {
    const userExists = await User.findOne({ correo: email });
    console.log(userExists);
    if (!userExists) {
      return res.status(404).json({
        mensaje: "Credenciales no validas",
      });
    }
    const validatedPassword = await compareEncryptedData(
      password,
      userExists.hashContrasena
    );
    if (!validatedPassword) {
      return res.status(404).json({
        mensaje: "Credenciales no validas",
      });
    }
    const accessToken = generateUserToken(userExists);
    return res.status(200).json({
      accessToken,
      mensaje: "Inicio de sesión correcto",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Error en Servidor",
    });
  }
};

module.exports = {
  registerUser,
  editUser,
  deleteUser,
  getUserByEmail,
  logInUser,
  strikesUserById,
  getUserById
};
