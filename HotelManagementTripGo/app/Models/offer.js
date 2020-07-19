const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const Offer = new Schema({
    hotel: {
        type: Schema.ObjectId,
        required: true
    },
    room: {
        type: Schema.ObjectId,
        required: true
    },
    services: [{type: String}],
    reserved: [{dateIn: Date, dateOut: Date}]
});

module.exports = mongoose.model('Offer', Offer);
