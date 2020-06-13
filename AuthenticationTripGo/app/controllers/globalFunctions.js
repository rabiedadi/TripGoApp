const userModel = require('../models/user');
const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);
const config = require('../../config/configDB');
const { HotelManagAPI: HotelManagAPI } = config;
let resError = {};

module.exports = {

    emailExist: function(req, res, next){
        userModel.findOne({ email: { $eq : req.body.email} }, function (err, user) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'AuthAPI, GF, emailExist, find user'; resError.err = err;
                next(resError);
            }else {
                if (user){
                    resError.status = 409; resError.message = 'email already exist'; resError.code = 8;
                    resError.path = 'AuthAPI, GF, emailExist, find user'; resError.err = err;
                    next(resError);
                }else {
                    next();
                }
            }
        });
    },
};
