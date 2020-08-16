const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const Offer = new Schema({
    destination:[String],
    reserved: [{dateIn: Date, dateOut: Date}],
    offerCapacityAdults:{
        type: Number,
        required: true
    },
    offerCapacityChildren:{
        type: Number,
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        required: true
    },
    room: {
        type: Schema.ObjectId,
        required: true
    },
    services: [{type: String}],

});

module.exports = mongoose.model('Offer', Offer);
