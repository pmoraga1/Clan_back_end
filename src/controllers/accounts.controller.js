const Account = require("../models/accounts.model");

//Crear una cuenta
const createSharedAccount = async (req, res) => {
  try {
    const { nombreCuenta, precio, numUsuarios, detalles, imagenUrl } = req.body;
    const newAccount = new Account({
      nombreCuenta,
      precio,
      numUsuarios,
      detalles,
      imagenUrl,
    });
    const savedAccount = await newAccount.save();
    res.status(201).json({
      mensaje: "Cuenta creada",
      savedAccount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la cuenta compartida" });
  }
};

//Editar una cuenta

const editSharedAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const { nombreCuenta, precio, numUsuarios, detalles, imagenUrl } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      { nombreCuenta, precio, numUsuarios, detalles, imagenUrl },
      { new: true }
    );
    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar la cuenta compartida" });
  }
};

//Ver todas las cuentas que hay

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las cuentas" });
  }
};

//Ver una sola cuenta por ID

const getAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id);
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cuenta" });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({
        error: "No se encontró la cuenta",
      });
    }
    return res.status(200).json({
      mensaje: "Cuenta eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la cuenta",
    });
  }
};

module.exports = {
  createSharedAccount,
  editSharedAccount,
  getAllAccounts,
  getAccountById,
  deleteAccount,
};
