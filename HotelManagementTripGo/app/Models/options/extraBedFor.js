const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ExtraBedFor = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    reference: {
        type: String,
        trim: true,
        required: true
    },
    language: {
        type: String,
        trim: true,
        required: true
    },
    range: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ExtraBedFor', ExtraBedFor);
