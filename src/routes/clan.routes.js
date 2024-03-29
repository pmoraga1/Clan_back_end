const express = require("express");
const clanRouter = express.Router();
const {
  createClan,
  deleteClan,
  getClan,
  addMember,
  deleteMember,
  editCredentials,
  deleteCredentials,
  getAllClan,
} = require("../controllers/clan.controllers.js");
const { auth } = require("../middlewares/auth.js");

clanRouter.post("/create", auth, createClan);

clanRouter.patch("/addmember", auth, addMember);

clanRouter.patch("/deletemember", auth, deleteMember);

clanRouter.patch("/editcredentials", auth, editCredentials);

clanRouter.patch("/deletecredentials/:clanId", auth, deleteCredentials);

clanRouter.delete("/delete/:clanId", auth, deleteClan);

clanRouter.get("/get/:clanId", getClan);

clanRouter.get("/getAll/:userId", auth, getAllClan);

module.exports = { clanRouter };
