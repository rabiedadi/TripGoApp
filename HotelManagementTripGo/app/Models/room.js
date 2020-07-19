const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const Room = new Schema({
    roomType: {
        type: String,
        required: true
    },
    available: {
        type: Number,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    roomCustomName: {
        type: String
    },
    smoking: {
        type: Boolean,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    roomCount: {
        type: Number,
        required: true
    },
    bathRoomCount: {
        type: Number,
        required: true
    },
    livingRoomCount: {
        type: Number,
        required: true
    },
    beds:[{
        bedSize: {
            type: String,
            required: true
        },
        bedCount:{
            type: Number,
            required: true
        }
    }],
    roomCapacity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        required: true
    },

});

module.exports = mongoose.model('Room', Room);
