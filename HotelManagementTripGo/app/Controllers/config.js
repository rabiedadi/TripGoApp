const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
let resError = {};

module.exports = {
    sendConfigImmediately: function (req, res, next) {
        let date = new Date();
        let todayFile = path.join(__dirname,'../var/'+ date.getDate() +'-'+ (date.getMonth()+1) + '-' + date.getFullYear()+'.txt');

        if (fs.existsSync(todayFile)) {
            fs.readFile( todayFile, function(err, data) {
                const msg = {to: 'o.hamidi@esi-sba.dz', from: 'oussolr32@gmail.com', subject: 'Error logs', text: '...',
                    attachments : [{filename: date.getDate()+'-'+(date.getMonth()+1)+'hotelReport.txt',
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
                        resError.path = 'hotelAPI, config, sendConfigImmediately'; resError.err = err;
                        next(resError);
                    }else {
                        res.status(200).json({message: "sent"});
                    }
                })
            })
        }else {
            res.status(200).json({message: "report not exist"});
        }
    }
};
