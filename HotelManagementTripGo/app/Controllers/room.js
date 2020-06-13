const roomModel = require('../Models/room');
const hotelModel = require('../Models/hotel');
const mongoose = require('mongoose');
let resError = {};

module.exports = {
    create: function(req, res, next){
        const myRoomsPromises = req.body.map(async room => {
            let myRoom = {};
            room.hotel = req.params.realEstate_id;
            myRoom = await roomModel.create(room);
            hotelModel.findOneAndUpdate({_id: req.params.realEstate_id}, {$push:{rooms:myRoom._id}}, function (err, hotel) {
                if (err){
                    resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
                    resError.path = 'hotelAPI, room, create'; resError.err = err;
                    next(resError);
                }
            });
            return myRoom;
        });

        Promise.all(myRoomsPromises).then(function (myRooms) {
            req.myRooms = myRooms;
            next();
        }).catch(err => {
            resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
            resError.path = 'hotelAPI, room, create, promises'; resError.err = err;
            next(resError);
        })
    },

    getBriefInformation: function(req, res, next){
        roomModel.aggregate([
            {
                $match:{
                    hotel: req.realEstate_id
                }
            },
            {
                $lookup: {
                    from: "roomnames",
                    let: {
                        roomName: "$roomName"
                    },
                    pipeline: [{$match: {$expr:{$and:[{$eq: ["$language", req.languageId]}, {$eq:["$$roomName", "$reference"]}]}},}],
                    as: "roomName"
                }
            }]).project({_id: 1, 'roomName.name':1, available: 1 }).exec(function (err, rooms) {
                if (err){
                    err.status = 400;
                    err.message = 'Bad request';
                    err.path = 'options => getAllPlatformLanguage';
                    next(err);
                }else {
                    res.status(200).json(rooms)
                }
        })
    },
    edit: function(req, res, next){
        roomModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, req.body, {new:true}, function (err, room) {
            if (err){
                err.status = 400;
                err.message = 'Bad req95uest';
                err.path = 'options => getAllPlatformLanguage';
                next(err);
            }else {
                res.status(200).json(room)
            }
        })
    },
    delete: function(req, res, next){
        roomModel.delete({_id: mongoose.Types.ObjectId(req.params.id)}, function (err, room) {
            if (err){
                err.status = 400;
                err.message = 'Bad req95uest';
                err.path = 'options => getAllPlatformLanguage';
                next(err);
            }else {
                res.status(200).json(room)
            }
        })
    }
};
