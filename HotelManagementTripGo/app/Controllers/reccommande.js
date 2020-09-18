const roomModel = require('../Models/room');
const HR = require('../Models/HotelRec');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
let resError = {};
let H = [{}];
let nums = [];
let y = 0
let x = 0

module.exports = {
    recommend: function(req, res, next){
        HR.find({}, function (err, hotels) {

            x=Math.floor(Math.random() * Math.floor(30))
            H[0] = new Object(hotels[x])
            nums [0] = x
            for (let i = 1; i < 5; i++) {
                y = Math.floor(Math.random() * Math.floor(30))
                while (nums.includes(y)){
                    y = Math.floor(Math.random() * Math.floor(30))
                }
                nums[i] = y
                H[i] = new Object(hotels[nums[i]]);
                H[i].score = Math.floor(Math.random() * (85 - 55) + 55)
            }
            console.log(nums)
            res.status(200).json(H.sort((a, b) => b.score - a.score))

        })
    },

    sendFile: function (req, res, next){
        let todayFile = path.join(__dirname,'../var/FactureBooking0113652.pdf');

        fs.readFile( todayFile, function(err, data) {
            const msg = {to: 'o.hamidi@esi-sba.dz', from: 'oussolr32@gmail.com', subject: 'TripGo facture de reservation N°0113652', text: '...',
                attachments : [{filename: 'FactureBooking0113652.pdf',
                    content: data.toString('base64'),
                    type: 'application/txt',
                    disposition: 'attachment',
                    contentId: 'myId'
                }],
            };
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            sgMail.send(msg).then(() => {
            }).catch((err) => {
                    resError.status = 400; resError.message = 'failure sending mail'; resError.code = 6;
                    resError.path = 'hotelAPI, config, sendConfigImmediately'; resError.err = err;
                    next(resError);

            })
            res.status(200).json({message: "sent"});
        })
    }
}
