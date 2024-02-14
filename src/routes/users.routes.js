const express = require("express");
const userRouter = express.Router();
const {registerUser,editUser,deleteUser,getUserByEmail,logInUser,strikesUserById} = require ("../controllers/users.controller.js");
const { auth } = require("../middlewares/auth.js");


userRouter.post("/register",registerUser);

userRouter.patch("/edit",auth, editUser);

userRouter.delete("/delete", auth ,deleteUser);

userRouter.get("/get",auth,getUserByEmail);

userRouter.post("/login",logInUser);

userRouter.patch("/strikes",strikesUserById);

module.exports = { userRouter };
