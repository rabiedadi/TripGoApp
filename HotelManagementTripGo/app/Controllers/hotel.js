const hotelModel = require('../Models/hotel');
const mongoose = require('mongoose');
let resError = {};

module.exports = {
    addConfirmedPhone:function(req, res, next){
        hotelModel.create(req.body, function (err, hotel) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, hotel, addConfirmedPhone'; resError.err = err;
                next(resError);
            }else {
                res.status(200).json({_id: hotel._id});
            }
        });
    },

    hotelNameExist:function(req, res, next){

        hotelModel.findOne({name: req.body.name}, function (err, hotel) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, hotel, hotelNameExist'; resError.err = err;
                next(resError);
            }else {
                if (hotel){
                    if (hotel.creationStep !== 0){
                        next();
                    }else {
                        resError.status = 409; resError.message = 'hotel name already exist'; resError.code = 19;
                        resError.path = 'hotelAPI, hotel, hotelNameExist'; resError.err = err;
                        next(resError);
                    }
                }else{
                    next();
                }
            }
        });
    },

    basicInfo:function (req, res, next) {
        hotelModel.findOneAndUpdate({_id: req.params.realEstate_id}, req.body, {upsert: true, new: true},function (err, hotel) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, hotel, BasicInfo'; resError.err = err;
                next(resError);
            }else {
                req.hotel = hotel;
                next();
            }
        });
    },

    insertHotelInfo:function (req, res, next) {
        hotelModel.findOneAndUpdate({_id: req.params.realEstate_id}, req.body, {new: true}, function (err, hotel) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, hotel, insertHotelInfo'; resError.err = err;
                next(resError);
            }else {
                req.hotel = hotel;
                next();
            }
        });
    },

    updateRoomTypeNumber:function (req, res, next) {
        let roomTypes = new Set();
        req.body.forEach(room => {
            roomTypes.add(room.roomType);
        });

        hotelModel.findOneAndUpdate({_id: req.params.realEstate_id}, {roomTypeNumber: roomTypes.size}, {new: true, projection:{roomTypeNumber: 1}}, function (err, hotel) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, hotel, updateRoomTypeNumber'; resError.err = err;
                next(resError);
            }else {
                next();
            }
        });
    },

    getAllForUser:function (req, res, next) {
        hotelModel.find({userGroup_id: mongoose.Types.ObjectId(req.params.userGroup_id)}, {name: 1, province: 1, starsNumber: 1, globalNote: 1, offersNumber: 1, roomsNumber: 1}, function (err, hotels) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, hotel, getAllForUser'; resError.err = err;
                next(resError);
            }else {
                res.status(200).json(hotels);
            }
        });
    },

    incrementCreationStep:function (req, res, next){
        let creationStep ;
        if (req.myRooms) creationStep = 1; else creationStep = req.hotel.creationStep;
        if (req.currentStep === creationStep) {
            hotelModel.findOneAndUpdate({_id: req.params.realEstate_id}, { $inc: { creationStep: 1 }}, {new: true}, function (err, hotel) {
                if(err){
                    resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                    resError.path = 'hotelAPI, hotel, getAllForUser'; resError.err = err;
                    next(resError);
                }else {
                    if (req.myRooms) res.status(200).json(req.myRooms);else res.status(200).json(hotel)
                }
            });
        }else {
            if (req.myRooms) res.status(200).json(req.myRooms);else res.status(200).json(req.hotel);
        }
    },

    getProfile:function (req, res, next) {
        //aggregate with offers and translate if the language is not english
        hotelModel.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function (err, hotel) {
            if(err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, hotel, getProfile'; resError.err = err;
                next(resError);
            }else {
                res.status(200).json(hotel);
            }
        });
    },


};
