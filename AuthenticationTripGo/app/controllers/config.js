const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const user = require('../models/user');
const mongoose = require('mongoose');
let resError = {};

module.exports = {
    sendConfigImmediately: function (req, res, next) {
        let date = new Date();
        let todayFile = path.join(__dirname,'../var/'+ date.getDate() +'-'+ (date.getMonth()+1) + '-' + date.getFullYear()+'.txt');

        if (fs.existsSync(todayFile)) {
            fs.readFile( todayFile, function(err, data) {
                const msg = {to: 'o.hamidi@esi-sba.dz', from: 'oussolr32@gmail.com', subject: 'Error logs', text: '...',
                    attachments : [{filename: date.getDate()+'-'+(date.getMonth()+1)+'authReport.txt',
                        content: data.toString('base64'),
                        type: 'application/txt',
                        disposition: 'attachment',
                        contentId: 'myId'
                    }],
                };
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                sgMail.send(msg).then(() => {
                }).catch((err) => {
                    if(err){
                        resError.status = 400; resError.message = 'failure sending mail'; resError.code = 6;
                        resError.path = 'AuthAPI, config, sendConfigImmediately'; resError.err = err;
                        next(resError);
                    }else {
                        res.status(200).json({message: "sent"});
                    }
                })
            })
        }else {
            res.status(200).json({message: "report not exist"});
        }
    },
    initiate:function (req, res, err) {
        user.create({_id:mongoose.Types.ObjectId('5edfdea8b920270019e9a612'), phone:"550197395", fullName:"Hamidi Oussama", email:"o.hamidi@esi-sba.dz", emailConfirmed:true, password:"123456789"}, function (err) { if (err) console.log(err)})
        user.create({_id:mongoose.Types.ObjectId('5edfdea8b920270019e9a613'), phone:"550197395", fullName:"Daddi baba Rabie", email:"r.daddibaba@esi-sba.dz", emailConfirmed:true, password:"123456789"}, function (err) { if (err) console.log(err)})
        user.create({_id:mongoose.Types.ObjectId('5edfdea8b920270019e9a614'), phone:"550197395", fullName:"Benkhlifa Islam", email:"i.benkhelifa@esi-sba.dz", emailConfirmed:true, password:"123456789"}, function (err) { if (err) console.log(err)})
        user.create({_id:mongoose.Types.ObjectId('5edfdea8b920270019e9a615'), phone:"550197395", fullName:"Mecheref youcef", email:"a.mecheref@esi-sba.dz", emailConfirmed:true, password:"123456789"}, function (err) { if (err) console.log(err)})
        user.create({_id:mongoose.Types.ObjectId('5edfdea8b920270019e9a616'), phone:"550197395", fullName:"Benhabra Islam", email:"a.benhabra@esi-sba.dz", emailConfirmed:true, password:"123456789"}, function (err) { if (err) console.log(err)})
        user.create({_id:mongoose.Types.ObjectId('5edfdea8b920270019e9a617'), phone:"550197395", fullName:"Tamma Rafik", email:"b.tamma@esi-sba.dz", emailConfirmed:true, password:"123456789"}, function (err) { if (err) console.log(err)})
    }
};
