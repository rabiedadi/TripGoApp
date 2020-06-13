const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
let resError = {};


module.exports = {
    authenticate: function(req, res, next) {
        userModel.findOne({email: { $eq: req.body.login } }, function(err, user){
            if (err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, auth, authenticate, find user'; resError.err = err;
                next(resError);
            } else {
                if(user) {
                        if(bcrypt.compareSync(req.body.password, user.password)){
                            req.user_id = user._id;
                            next();
                        }else {
                            resError.status = 401; resError.message = 'Incorrect email or password'; resError.code = 2;
                            resError.path = 'AuthAPI, auth, authenticate, compare password';
                            next(resError)
                        }
                }else{
                    resError.status = 401; resError.message = 'Incorrect email or password'; resError.code = 2;
                    resError.path = 'AuthAPI, auth, authenticate, user not exist';
                    next(resError);
                }
            }
        });
    },

    generateTokens: function (req, res, next) {
        const accessToken = jwt.sign({user_id: req.user_id}, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.ACCESS_LIFE });
        const refreshToken = jwt.sign({user_id: req.user_id}, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.REFRESH_LIFE });
        userModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.user_id)},{$push:{refreshTokens: refreshToken}},function (err, user) {
            if (err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, auth, generateTokens, find user to update refresh token'; resError.err = err;
                next(resError);
            }else
                res.status(200).json({accessToken:accessToken, refreshToken:refreshToken});
        });
    },

    generateAccessToken: function (req, res, next) {
        const token = jwt.sign({user_id: req.user_id}, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.ACCESS_LIFE });
        res.status(200).json({accessToken:token});
    },

    verifyRefreshToken: function (req, res, next) {
        let token = req.body.refreshToken;
        if(!token){
            resError.status = 400; resError.message = 'token is required'; resError.code = 4;
            resError.path = 'AuthAPI, auth, verifyRefreshToken, token dont exist';
            next(resError);
        } else {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.JWT_REFRESH_KEY, function (err, decoded) {
                if (err){
                    resError.status = 401; resError.message = 'Invalid Token'; resError.code = 3;
                    resError.path = 'AuthAPI, auth, verifyRefreshToken, token verification failed'; resError.err = err;
                    next(resError)
                }
                else
                {
                    req.user_id = decoded.user_id;
                    next();
                }
            });
        }
    },

    verifyAccessToken: function (req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if(!token){
            resError.status = 400; resError.message = 'token is required'; resError.code = 4;
            resError.path = 'AuthAPI, user, verifyAccessToken, token dont exist';
            next(resError);
        } else {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, decoded) {
                if (err){
                    resError.status = 401; resError.message = 'Invalid Token'; resError.code = 3;
                    resError.path = 'AuthAPI, auth, verifyAccessToken, token verification failed'; resError.err = err;
                    next(resError)
                }
                else
                {
                    req.user_id = decoded.user_id;
                    next();
                }
            });
        }
    },

    tokenForUserExist:function(req, res, next){
        userModel.findOne({_id: req.user_id, refreshTokens: req.body.refreshToken}, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, auth, tokenForUserExist, find user'; resError.err = err;
                next(resError);
            }else {
                if(user){
                    next();
                }else{
                    resError.status = 401; resError.message = 'Invalid Token'; resError.code = 3;
                    resError.path = 'AuthAPI, auth, tokenForUserExist, user dont exist';
                    next(resError)
                }
            }
        });
    },

    logout:function (req, res, next) {
        userModel.findOneAndUpdate({_id: req.user_id}, {$pull: {refreshTokens: req.body.refreshToken}}, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, auth, logout, find user'; resError.err = err;
                next(resError);
            }else{
                res.status(200).json({msg: "disconnected"})
            }
        });
    },

    logoutAll:function (req, res, next) {
        userModel.findOneAndUpdate({_id: req.user_id}, {refreshTokens: []}, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, auth, logoutAll, find user'; resError.err = err;
                next(resError);
            }else{
                res.status(200).json({msg: "disconnected"})
            }
        });
    },

};
