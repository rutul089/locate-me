
const express = require('express');
const userRoute = express.Router();
const mongoose = require('mongoose')
const User = require("../models/usermodel")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserController = require("../controller/user.controller");

const checkAuth = require("../middleware/check-auth")


//-- Signup route 
userRoute.post("/signup", UserController.user_signup)

//-- Request handler 
userRoute.post("/login", UserController.user_login)

//-- T0 get all user
userRoute.get("/getallusers", UserController.get_alluser)

//== To get specific user
userRoute.get("/:userID", checkAuth, UserController.get_user)

//-- Change pwd 
userRoute.post("/changepassword", checkAuth, UserController.user_changepwd)

//-- Forgot pwd 
userRoute.post("/forgotpassword/:email", UserController.user_forgotpwd);
//-- TODO delete user , edit user tolle
module.exports = userRoute;