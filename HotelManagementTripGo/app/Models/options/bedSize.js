const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const bedSize = new Schema({
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
        height: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        }
});

module.exports = mongoose.model('bedSize', bedSize);
