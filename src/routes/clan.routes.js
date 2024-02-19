const express = require('express')
const clanRouter = express.Router()
const {createClan, editClan, deleteClan, getClan, addMember, deleteMember, editCredentials, deleteCredentials} = require("../controllers/clan.controllers.js")

clanRouter.post("/create", createClan)

clanRouter.patch("/edit", editClan)

clanRouter.patch("/addmember", addMember)

clanRouter.patch("/deletemember", deleteMember)

clanRouter.patch("/editcredentials", editCredentials)

clanRouter.patch("/deletecredentials", deleteCredentials)

clanRouter.delete("/delete", deleteClan)

clanRouter.get("/get", getClan)

module.exports = {clanRouter};