const Account = require("../models/accounts.model");


//Crear una cuenta
const createSharedAccount = async (req, res) => {
  try {
    const { nombreCuenta, precio, numUsuarios, detalles } = req.body;
    const newAccount = new Account({ nombreCuenta, precio, numUsuarios, detalles });
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la cuenta compartida" });
  }
};

//Editar una cuenta

const editSharedAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const { nombreCuenta, precio, numUsuarios, detalles } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      { nombreCuenta, precio, numUsuarios, detalles },
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


module.exports = {
  createSharedAccount,
  editSharedAccount,
  getAllAccounts,
};



