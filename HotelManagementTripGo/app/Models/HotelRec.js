const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const HotelRec = new Schema({
    name: String,
    stars: Number,
    city: String,
    score: Number
})
module.exports = mongoose.model('HotelRec', HotelRec);
