const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    group:{
        type: Schema.ObjectId,
        required: true
    }
});


module.exports = mongoose.model('User', UserSchema);
