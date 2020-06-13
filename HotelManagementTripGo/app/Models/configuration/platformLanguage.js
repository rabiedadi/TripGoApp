const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const platformLanguage = new Schema({
    abbreviation: {
        type: String,
        trim: true,
        required: true
    },
});

module.exports = mongoose.model('platformLanguage', platformLanguage);
