const offerModel = require('../Models/offer');
const mongoose = require('mongoose');
let resError = {};

module.exports = {
    getRoomsServices: function (req, res, next){

    },

    addOffer: function (req, res, next) {
        req.body.hotel = req.params.hotel_id;
        req.body.room = req.params.room_id;
        offerModel.create(req.body, function (err, offer) {
            if (err){
                resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                resError.path = 'hotelAPI, offer, addOffer'; resError.err = err;
                next(resError);
            }else {
                res.status(200).json(offer);
            }
        })
    },

    getOffersOfHotel: function (req, res, next){
        req.hotels.forEach(hotel => {
            offerModel.find({hotel: hotel._id}, function (err, offers) {
                if (err){
                    resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                    resError.path = 'hotelAPI, offer, getOffersOfHotel'; resError.err = err;
                    next(resError);
                }else {
                    hotel.offers = offers;
                }
            })
        })
    }
};
