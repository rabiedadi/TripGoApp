const fs = require('fs');
const schedule = require('node-schedule');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const j = schedule.scheduleJob('35 00 * * *', function () {
    let date = new Date();
    let todayFile = path.join(__dirname,'../var/'+ date.getDate() +'-'+ (date.getMonth()+1) + '-' + date.getFullYear()+'.txt');

    fs.writeFileSync(todayFile, '');

    let yesterdayFile = path.join(__dirname,'../var/'+ (date.getDate()-1) +'-'+ (date.getMonth()+1) + '-' + date.getFullYear()+'.txt');
    if (fs.existsSync(yesterdayFile)) {
        fs.readFile( yesterdayFile, function(err, data) {
            const msg = {to: 'o.hamidi@esi-sba.dz', from: 'oussolr32@gmail.com', subject: 'Error logs', text: '...',
                html: '<strong>Link :</strong>',
                attachments : [{filename: date.getDate() +'-'+(date.getMonth()+1)+'hotelReport.txt',
                    content: data.toString('base64'),
                    type: 'application/txt',
                    disposition: 'attachment',
                    contentId: 'myId'
                }],
            };
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            sgMail.send(msg).then(() => {
            }).catch((err) => {
                console.log(err)
            })
        })
    }
});

module.exports = {
    notFound : function(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        err.path = "hotelAPI";
        next(err);
    },
    handleOthers : function(err, req, res, next) {

        if(err.status === 404)
            res.status(404).json({message: '404 Not found',err:err.errors,path : "hotelAPI"});
        else{
            let date = new Date();

            err.endPoint = req.originalUrl;
            err.reqBody = req.body;
            err.method = req.method;
            err.date = date;

            if(err.message === 'File too large'){
                err.status = 413; err.code = 12;
            }

            if(process.env.NODE_ENV === 'dev' )
            {
                res.status(err.status|| 500).json(err);
                console.log(err);
            }


            else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'prod'){
                // res.status(err.status|| 500).json({message: err.message, code:err.code,});
                res.status(err.status|| 500).json(err);
                let todayFile = path.join(__dirname,'../var/'+ date.getDate() +'-'+ (date.getMonth()+1) + '-' + date.getFullYear()+'.txt');
                if (!fs.existsSync(todayFile)) fs.writeFileSync(todayFile, '');
                fs.appendFile(todayFile, '\n'+JSON.stringify(err)+'\n', function (error) {
                    if (err) console.log(error)
                });
            }
        }
    }
}
