const mongoose = require("mongoose")
const User = require("../models/usermodel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.user_login = (req, res, next) => {

    User.findOne({ userEmail: req.body.userEmail })
        .exec()
        .then(user => {
            //-- Checkign for user
            if (user.length < 1) {
                return res.status(404).json({
                    isSuccess: false,
                    message: "No user found..",
                    error_code: 100
                });
            }

            //-- This wil compare entered password and password from database
            bcrypt.compare(req.body.userPassword, user.userPassword, (err, result) => {
                if (err) {
                    //-- Failed block
                    return res.status(404).json({
                        isSuccess: false,
                        message: "No user found..",
                        error_code: 100
                    });
                } else {
                    //-- Sucess Block
                    if (result) {
                        //-- for Jason Web Token (JWT)
                        const token = jwt.sign(
                            {
                                userEmail: user.userEmail,
                                userID: user.userID
                            },
                            process.env.JWT_KEY,
                            { expiresIn: "7d" }
                        );
                        //-- Password Match
                        return res.status(200).json({
                            Data: {
                                userData: user,
                                Token: token
                            },
                            isSuccess: true,
                            message: "",
                            error_code: 0
                        });
                    } else {
                        //-- Password Do not match
                        return res.status(404).json({
                            isSuccess: false,
                            message: "No user found..",
                            error_code: 100
                        });
                    }
                }
            });
        })
        .catch(err => {
            res.status(401).json({
                isSuccess: false,
                message: "No user found..",
                error_code: 100
            });
        });
}

exports.user_signup = (req, res, next) => {

    const date = new Date();
    let id = 1;
    const sec =
        date.getHours() +
        date.getMinutes() +
        date.getUTCSeconds() +
        date.getSeconds();


    User.findOne()
        .select("userID")
        .sort("-userID")
        .exec()
        .then(user => {
            if (user.userID > 0) {
                id = user.userID + 1;
                console.log(id);
            }
        })
        .catch(err => {
            id = 1;
        });

    User.find({ userEmail: req.body.userEmail })
        .exec()
        .then(user => {
            //-- Check for user is exist or not
            if (user.length >= 1) {
                return res.status(200).json({
                    isSuccess: false,
                    message: "User already exists..",
                    error_code: 101
                });
            } else {
                //--- Converting normal password to hash value
                bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            isSuccess: false,
                            message: err,
                            error_code: 101
                        });
                    } else {
                        const user = new User({
                            // categoryID: parseInt(new mongoose.Types.ObjectId()),
                            userID: id,
                            userName: req.body.userName,
                            userEmail: req.body.userEmail,
                            userPassword: hash,
                            userRole: req.body.userRole
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    isSuccess: true,
                                    message: "",
                                    error_code: 0
                                });
                            })
                            .catch(err => {
                                res.status(400).json({
                                    isSuccess: false,
                                    message: "Something went wrong",
                                    error_code: 101
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });

}

exports.get_alluser = (req, res,next) => {
    User.find()
        .exec()
        .then(response => {
            res.status(200).json({
                Data: {
                    users: response
                },
                isSuccess: true,
                Message: "",
                error_code: 0
            });
        })
        .catch(err => {
            console.log(err + "Get err");
            res.status(500).json({
                isSuccess: false,
                error_code: 101,
                message: "CATEGORY_NOT_FOUND_ERR"
            });
        });
}