const request = require('request');
const config = require('../../config/configDB');
const { HotelManageAPI: HotelManageAPI } = config;
const { AuthAPI: AuthAPI } = config;
const HotelURL = `${HotelManageAPI}`;
const mongoose = require('mongoose');
const userModel = mongoose.model('User');
const path = require('path');
const fs = require('fs');
const extract = require('extract-zip');
let resError = {};;;;;

module.exports = {
    createUserIfNotExists:function (req, res, next){
        console.log(req.user_id)
        userModel.findOneAndUpdate({_id: req.user_id}, {_id:req.user_id, group: mongoose.Types.ObjectId()}, {upsert: true, new:true, setDefaultsOnInsert: true}, function (err, user) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'gatewayAPI, MF, createUserIfNotExists'; resError.err = err;
                next(resError);
            }else {
                if (user){
                    req.body.userGroup_id = user.group;
                    next()
                }else {
                    resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                    resError.path = 'gatewayAPI, MF, createUserIfNotExists, cannot fin user'; resError.err = err;
                    next(resError);
                }
            }
        });
    },

    sendPhoneRequestConfirmed:function(req, res, next){
        const requestOptions = {
            uri: HotelURL + '/hotel',
            body: JSON.stringify(req.body),
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': req.headers['authorization']}
        };
        request(requestOptions, function (err, response) {
            if (err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'gatewayAPI, MF, sendPhoneRequestConfirmed'; resError.err = err;
                next(resError);
            } else {
                if(response.statusCode === 200){
                    res.status(200).json({status:"verified", hotel_id:JSON.parse(response.body)._id});
                }else{
                    resError.status = 400; resError.message = 'failed phone verification'; resError.code = 17;
                    resError.path = 'gatewayAPI, MF, phone verification failed'; resError.err = JSON.parse(response.body);
                    next(resError);
                }
            }
        });
    },

        sendRequest:function(req, res, next){
        const requestOptions = {
            uri: HotelURL + req.originalUrl,
            body: JSON.stringify(req.body),
            method: req.method,
            headers: {'Content-Type': 'application/json', 'Authorization': req.headers['authorization']}
        };
        request(requestOptions, function (err, response) {
            if (err) {
                if(err.path && err.code && err.message){
                    resError.status = err.status; resError.message = err.message; resError.code = err.code;
                    resError.path = 'gatewayAPI, MF, sendRequest -'+ err.path; resError.err = err.err;
                    next(resError);
                }else{
                    resError.status = 500; resError.message = 'inter APIs connection error'; resError.code = 10;
                    resError.path = 'gatewayAPI, MF, sendRequest'; resError.err = err;
                    next(resError);
                }
            } else {
                res.status(response.statusCode).json(JSON.parse(response.body))
            }
        });
    },


    sendImagesAdding:function(req, res, next){
        const src = path.join(__dirname, '../public/'+req.params.realEstate_id+'.zip');
        const dest = path.join(__dirname, '../public/images/'+ req.params.realEstate_id);
        if (!fs.existsSync(path.join(__dirname, '../public/'))) fs.mkdirSync(path.join(__dirname, '../public/'));
        else if (!fs.existsSync(path.join(__dirname, '../public/images/'))) fs.mkdirSync(path.join(__dirname, '../public/images/'));
        else if (!fs.existsSync(dest)) fs.mkdirSync(dest);

        (async () => {
            await extract(src, { dir: dest });

            await fs.readdir(dest, function (err, files) {
                if (err) {
                    resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                    resError.path = 'gatewayAPI, MF, sendImagesAdding, cannot read images folder'; resError.err = err;
                    next(resError);
                }else {
                    req.body.images = files;
                    const requestOptions = {
                        uri: HotelURL + req.originalUrl,
                        body: JSON.stringify(req.body),
                        method: req.method,
                        headers: {'Content-Type': 'application/json', 'Authorization': req.headers['authorization']}
                    };
                    request(requestOptions, function (err, response) {
                        if (err) {
                            if(err.path && err.code && err.message){
                                resError.status = err.status; resError.message = err.message; resError.code = err.code;
                                resError.path = 'gatewayAPI, MF, sendImagesAdding -'+ err.path; resError.err = err.err;
                                next(resError);
                            }else{
                                resError.status = 500; resError.message = 'inter APIs connection error'; resError.code = 10;
                                resError.path = 'gatewayAPI, MF, sendImagesAdding'; resError.err = err;
                                next(resError);
                            }
                        } else {
                            res.status(response.statusCode).json(JSON.parse(response.body))
                        }
                    });
                }
            });
        await fs.unlink(src, function (err) {
            if (err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'gatewayAPI, MF, sendImagesAdding, delete zip file'; resError.err = err;
                next(resError);
            }
        });
        })().catch(err => {
            resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
            resError.path = 'gatewayAPI, MF, sendImagesAdding, synchronizing commands'; resError.err = err;
            next(resError);
        });
    },

    getRealEstatesForOwner:function (req, res, next) {
        const requestOptions = {
            uri: HotelURL+"/hotel/"+req.user.group,
            method: req.method,
            headers: {'Content-Type': 'application/json', 'Authorization': req.headers['authorization']}
        };
        request(requestOptions, function (err, response) {
            if (err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'gatewayAPI, MF, getRealEstatesForOwner, send request'; resError.err = err;
                next(resError);
            } else {
                if (response.statusCode === 200){
                    let result = JSON.parse(response.body);
                    result.forEach(hotel =>{
                       hotel.type = 'hotel'
                    });
                    res.status(200).json(result)
                }else
                    res.status(response.statusCode).json(JSON.parse(response.body))
            }
        });
    },

    getHotelProfile: function (req, res, next) {
        const requestOptions = {
            uri: HotelURL+"/hotel/"+req.params.language+"/profile/"+req.params.id,
            method: req.method,
            headers: {'Content-Type': 'application/json', 'Authorization': req.headers['authorization']}
        };
        request(requestOptions, function (err, response) {
            if (err) {
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'gatewayAPI, MF, getHotelProfile, send request'; resError.err = err;
                next(resError);
            } else {
                res.status(response.statusCode).json(JSON.parse(response.body))
            }
        });
    }
};
