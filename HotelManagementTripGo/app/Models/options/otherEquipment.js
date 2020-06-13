const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const OtherEquipment = new Schema({
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
    }
});

module.exports = mongoose.model('OtherEquipment', OtherEquipment);
