const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    image: {
        type: String,
        trim: true,
        default: "default_profile.jpg"
    },
    phone: {
        type: String,
        trim: true,
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    refreshTokens: [{
        type: String,
        trim: true,
    }]
});
// hash user password before saving into database
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema);
