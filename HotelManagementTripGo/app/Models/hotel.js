const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const Hotel = new Schema({
    name:               {type: String, trim: true},
    starsNumber:        {type: Number},
    address:            {type: String, trim: true},
    city:               {type: String, trim: true},
    province:           {type: String, trim: true},
    phone:              {type: String, trim: true},
    email:              {type: String, trim: true},
    services:           [{type: String}],
    parking:            {type: String},
    breakfast:          {type: String},
    speakingLanguages:  [{type: String}],
    extraBedCount:      {type: Number},
    extraBed:           [{for:{type: String}, price: {type: Number}}],
    otherEquipment:     [{type: String}],
    images:             [{type: String}],
    policy:             {cancelingDays:{type: Number}, paymentTime:{type: String}},
    checkIn:            {from:{type: Number}, to:{type: Number}},
    checkOut:           {from:{type: Number}, to:{type: Number}},
    animals:            {type: Boolean},
    creditCards:        [String],
    invoiceName:        {type: String},
    rooms:              [String],
    userGroup_id:       {type: Schema.ObjectId, required: true},
    creationStep:       {type: Number, default: 0},
    phoneConfirmed:     {type: Boolean},

    globalNote:         {type: Number},
    serviceScore:       {score:{type: Number}, betterThen:{type: Number}},
    staffScore:         {score:{type: Number}, betterThen:{type: Number}},
    mailServiceScore:   {score:{type: Number}, betterThen:{type: Number}},
    locationScore:      {score:{type: Number}, betterThen:{type: Number}},
    lessExpensiveThan:  {type: Number},

    offersNumber:       {type: Number, default : 0},
    roomsNumber:       {type: Number, default : 0},
    roomTypeNumber:     {type: Number, default : 0},

    comments: [{fullName: String, date: Date, text: String}],
});

module.exports = mongoose.model('Hotel', Hotel);
