
const express = require('express');
const userRoute = express.Router();
const mongoose = require('mongoose')
const User = require("../models/usermodel")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserController = require("../controller/user.controller") ;

//-- Signup route 
userRoute.post("/signup", UserController.user_signup)

//-- Request handler 
userRoute.post("/login", UserController.user_login)

//-- TODO get all user , delete user , edit user tolle , get sinle user


module.exports = userRoute;