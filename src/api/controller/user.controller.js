const mongoose = require("mongoose")
const User = require("../models/usermodel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");

var generator = require('generate-password');
let password = generator.generate({
    length: 6,
    numbers: true,
    symbols:true
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'richardderamus63@gmail.com',
        pass: "Navkar@123"
    }
});

var mailOptions = {
    from: 'richardderamus63@gmail.com',
    to: 'rutul089@gmail.com',
    subject: 'Sending email test',
    text: 'This is test text'
}

exports.user_login = (req, res, next) => {

    User.findOne({ userEmail: req.body.userEmail })
        .exec()
        .then(user => {
            //-- Checkign for user
            if (user.length < 1) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "No user found..",
                    error_code: 100
                });
            }

            //-- This wil compare entered password and password from database
            bcrypt.compare(req.body.userPassword, user.userPassword, (err, result) => {
                if (err) {
                    //-- Failed block
                    return res.status(200).json({
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
                        return res.status(200).json({
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
                            userRole: req.body.userRole,
                            phoneNumber: req.body.phoneNumber
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


exports.get_alluser = (req, res, next) => {
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

//-- To get specific product form product list
exports.get_user = (req, res, next) => {
    const id = req.params.userID;

    var query = User.findOne({
        userID: id
    });

    query
        .exec()
        .then(response => {
            if (response) {
                res.status(200).json({
                    Data: {
                        users: response
                    },
                    isSuccess: true,
                    ErrorCode: 0,
                    message: ""
                });
            } else {
                return res.status(200).json({
                    isSuccess: false,
                    ErrorCode: 11,
                    message: "No user found"
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                isSuccess: false,
                ErrorCode: 11,
                message: "No user found"
            });
        })

}

//-- Function for changing user password 
exports.user_changepwd = (req, res, next) => {
    const newPwd = req.body.userNewPassword
    User.findOne({ userID: req.body.userID })
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
                        bcrypt.hash(req.body.userNewPassword, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json({
                                    isSuccess: false,
                                    message: err,
                                    error_code: 101
                                });
                            } else {
                                user.userPassword = hash;
                                user
                                    .save()
                                    .then(result => {
                                        console.log(result);
                                        res.status(200).json({
                                            isSuccess: true,
                                            message: "Your user password has been changed",
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
                    } else {
                        //-- Password Do not match
                        return res.status(404).json({
                            isSuccess: false,
                            message: "Old password incorrect",
                            error_code: 101
                        });
                    }
                }
            });
        }).catch(err => {
            res.status(401).json({
                isSuccess: false,
                message: "No user found..",
                error_code: 100
            });
        });
}

//-  function for genrating new password 
exports.user_forgotpwd = (req, res, next) => {

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(400).json({
                isSuccess: false,
                message: "No user found..",
                error_code: 100,
                data: err
            });
        } else {
            return res.status(200).json({
                isSuccess: true,
                message: "No user found..",
                error_code: 100,
                data: info
            });
        }
    })


    //- Send user passward on email
    



}
