const jwt = require('jsonwebtoken');
const url = require('url');
const mongoose = require('mongoose');
const userModel = require('../models/user');
let resError = {};



module.exports = {

    verifyToken: function (req, res, next) {


        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if(!token){
            resError.status = 400; resError.message = 'token is required'; resError.code = 4;
            resError.path = 'gatewayAPI, auth, verifyRefreshToken, token dont exist';
            next(resError);
        } else {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, decoded) {
                if (err){
                    resError.status = 401; resError.message = 'Invalid Token'; resError.code = 3;
                    resError.path = 'gatewayAPI, auth, verifyRefreshToken, token verification failed'; resError.err = err;
                    next(resError)
                }
                else{
                    userModel.findOne({_id: mongoose.Types.ObjectId(decoded.user_id)}, function (err, user) {
                        if(err){
                            resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                            resError.path = 'gatewayAPI, auth, verifyToken, user not found'; resError.err = err;
                            next(resError);
                        }else {
                            req.user = user;
                            req.user_id = decoded.user_id;
                            next();
                        }
                    });
                }
            });
        }
    }
};
