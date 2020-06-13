const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const creditCard = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('creditCard', creditCard);
