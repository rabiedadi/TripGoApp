const userModel = require('../models/user');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const config = require('../../config/configDB');
const { FrontAPI: FrontAPI } = config;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let resError = {};

module.exports = {
    createUser: function(req, res, next){
        userModel.create(req.body, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, user, createUser'; resError.err = err;
                next(resError);
            }else {
                req.user_id = user._id;
                next();
            }
        });

    },

    getUser: function(req, res, next){
        userModel.findOne({_id: mongoose.Types.ObjectId(req.user_id)}, {fullName: 1, email: 1, phone: 1, image: 1, emailConfirmed: 1}, function (err, user) {
            if(err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, user, getUser'; resError.err = err;
                next(resError);
            }else{
                res.status(200).json(user);
            }
        })
    },

    updateUser: function(req, res, next){
        if(req.body.email){
            req.body.emailConfirmed = false
        }
        console.log(req.body)
        userModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.user_id)}, req.body, {new: true, projection: {fullName: 1, email: 1, phone: 1, image: 1, emailConfirmed: 1}}, function (err, user) {
            if(err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, user, updateUser'; resError.err = err;
                next(resError);
            }else
                res.status(200).json(user);
        })
    },

    verifyOldPassword: function(req, res, next){
        userModel.findOne({_id: req.user_id}, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, user, verifyOldPassword, find user ';
                next(resError);
            }
            else {
                if (user) {
                    if (bcrypt.compareSync(req.body.old_password, user.password)) next();
                    else {
                        resError.status = 400; resError.message = 'incorrect old password'; resError.code = 14;
                        resError.path = 'AuthAPI, user, verifyOldPassword, failed comparing passwords';
                        next(resError);
                    }
                }
                    else {
                        resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                        resError.path = 'AuthAPI, user, verifyOldPassword, user not exist';
                        next(resError);
                    }
                }
            });
    },

    updatePassword: function(req, res, next) {
        userModel.findOneAndUpdate({_id: req.user_id}, {password: bcrypt.hashSync(req.body.new_password, 10)}, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, user, updatePassword, find user';
                next(resError);
            }
            else {
                if (user) res.status(200).json({message: "Password updated successfully"});
                else {
                    resError.status = 400; resError.message = 'incorrect old password'; resError.code = 14;
                    resError.path = 'AuthAPI, user, updatePassword, user not exist';
                    next(resError);
                }
            }
        });
    },

    sendVerificationEmail: function (req, res, next) {
        let link = FrontAPI + "/profile/verifyEmail/" + jwt.sign({user_id: req.user_id}, process.env.JWT_KEY, { expiresIn: process.env.REFRESH_LIFE });
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        userModel.findOne({_id: req.user_id}, {email: 1, emailConfirmed: 1}, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, user, sendVerificationEmail, find user'; resError.err = err;
                next(resError);
            }else {
                if (user) {
                    if (!user.emailConfirmed){
                        const msg = {to: user.email, from: 'oussolr32@gmail.com', subject: 'verification Email', text: '...',
                            html: '<strong><a href="'+link+'">verification link</a></strong>',
                        };
                        sgMail.send(msg).then(() => {
                            res.status(200).json({msg: "email sent"})
                        }).catch((err) => {
                            resError.status = 500; resError.message = 'failure sending mail'; resError.code = 6;
                            resError.path = 'AuthAPI, user, sendVerificationEmail, send mail'; resError.err = err;
                            next(resError);
                        })
                    }else{
                        resError.status = 403; resError.message = 'email already verified'; resError.code = 15;
                        resError.path = 'AuthAPI, user, sendVerificationEmail, email verified'; resError.err = err;
                        next(resError);
                    }
                }
            }
        });
    },

    verifyEmail: function (req, res, next) {
        jwt.verify(req.body.token, process.env.JWT_KEY, function (err, decoded) {
            if(err) {
                resError.status = 403; resError.message = 'verification link expired'; resError.code = 7;
                resError.path = 'AuthAPI, user, verifyEmail, link expired'; resError.err = err;
                next(resError);
            }
            else
            {
                userModel.findOneAndUpdate({_id: decoded.user_id}, {emailConfirmed: true}, {new: true, projection: {fullName: 1, email: 1, phone: 1, emailConfirmed: 1}}, function (err, user) {
                    if(err){
                        resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                        resError.path = 'AuthAPI, user, verifyEmail, find user'; resError.err = err;
                        next(resError);
                    }else {
                        if (user) res.status(200).json(user)
                    }
                })
            }
        });
    }
};
