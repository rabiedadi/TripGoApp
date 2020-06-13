const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const translation = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    language: {
        type: String,
        trim: true,
        required: true
    },
    trans: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('translation', translation);
