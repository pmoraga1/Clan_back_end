const express = require('express')
const clanRouter = express.Router()
const {createClan, getClan, editClan, deleteClan} = require("../controllers/clan.controllers.js")

clanRouter.post("/create", createClan)

clanRouter.patch("/edit", editClan)

clanRouter.delete("/delete", deleteClan)

clanRouter.get("/get", getClan)

module.exports = {clanRouter};