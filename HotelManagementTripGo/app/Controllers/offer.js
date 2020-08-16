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
        let itemsProcessed = 0;
        hotels = JSON.parse(JSON.stringify(req.hotels));
        req.hotels.forEach(function(part, index, theArray) {


            offerModel.find({hotel: theArray[index]._id}, function (err, offers) {
                if (err){
                    resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                    resError.path = 'hotelAPI, offer, getOffersOfHotel'; resError.err = err;
                    next(resError);
                }else {
                    req.hotels[index].set('offers', offers);
                    console.log(hotels[index])
                    console.log(offers)
                    console.log(hotels[index].offers)
                }
            })

            itemsProcessed++;
            if(itemsProcessed === theArray.length) {
                next();
            }

        });





    }
};
