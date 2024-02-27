const express = require("express");
const userRouter = express.Router();
const {registerUser,editUser,deleteUser,getUserByEmail,logInUser,strikesUserById} = require ("../controllers/users.controller.js");
const { auth } = require("../middlewares/auth.js");


userRouter.post("/register",registerUser);

userRouter.patch("/edit/:id",auth,editUser);

userRouter.delete("/delete/:id",auth,deleteUser);

userRouter.get("/get",auth,getUserByEmail);

userRouter.post("/login",logInUser);

userRouter.patch("/strikes",auth,strikesUserById);


module.exports = { userRouter };
