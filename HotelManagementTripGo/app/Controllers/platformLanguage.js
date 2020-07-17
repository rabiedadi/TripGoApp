const platformLanguageModel = require('../Models/configuration/platformLanguage');
const mongoose = require('mongoose');
let resError = {};

module.exports = {
    getAllPlatformLanguage: function(req, res, next){
        platformLanguageModel.find({}, {_id:0}, function (err, platformLanguage) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, platformLanguages, getAllPlatformLanguage'; resError.err = err;
                next(resError);
            }else {
                res.status(200).json(platformLanguage);
            }
        });
    },

    getPlatformLanguage: function(req, res, next){
        platformLanguageModel.findOne({_id: req.params.id}, function (err, platformLanguage) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'platformLanguage => getPlatformLanguage';
                next(err);
            }else {
                res.status(200).json(platformLanguage);
            }
        });
    },
    editPlatformLanguage: function(req, res, next){
        platformLanguageModel.findOneAndUpdate({_id: req.params.id}, {new: true}, function (err, platformLanguage) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'platformLanguage => editPlatformLanguage';
                next(err);
            }else {
                res.status(200).json(platformLanguage);
            }
        });
    },
    createPlatformLanguage: function(req, res, next){
        //for test, must be deleted
        req.body._id = mongoose.Types.ObjectId(req.body._id);
        platformLanguageModel.create(req.body, function (err, platformLanguage) {
            if (err){
                err.status = 400;
                err.message = 'Bad request';
                err.path = 'PlatformLanguage => createPlatformLanguage';
                next(err);
            }else {
                res.status(200).json(platformLanguage);
            }
        });
    },

};
