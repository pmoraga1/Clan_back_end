const express = require('express')
const clanRouter = express.Router()
const {createClan, editClan, deleteClan} = require("../controllers/clan.controllers.js")

clanRouter.get("/create", createClan)

clanRouter.patch("/edit", editClan)

clanRouter.delete("/delete", deleteClan)

module.exports = {clanRouter};