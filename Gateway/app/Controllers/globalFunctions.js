const config = require('../../config/configDB');
const { messageBird_API_KEY: messageBird_API_KEY } = config;
const messageBird = require('messagebird')(`${messageBird_API_KEY}`);
let resError = {};

module.exports = {

    sendSMS: function (req, res, next) {
        // messageBird.verify.create(req.body.phone, {
        //     originator: 'TripGo',
        //     template: 'Your verification code is %token.'
        // }, function (err, response) {
        //     if (err) {
        //         resError.status = 500; resError.message = 'failure  sending SMS'; resError.code = 16;
        //         resError.path = 'gatewayAPI, GB, sendSMS'; resError.err = JSON.stringify(err);
        //         next(resError);
        //     }else
        //     res.status(200).json(response);
        // });

        res.status(200).json({_id: "d87b765e64a24878a4441dc50b81ed12", recipient: 213550197395, status: "sent"});
    },

     verifySMS: function (req, res, next) {
        // ID returned upon creating the verify.
        let id = req.params.id;
        // User provided token to validate.
        let token = req.query.token;
        // messageBird.verify.verify(id, token, function (err, resp) {
        //     if (err) {
        //         resError.status = 500; resError.message = 'Unexpected ERROR'; resError.code = 1;
        //         resError.path = 'gatewayAPI, GB, sendSMS'; resError.err = err;
        //         next(resError);
        //     } else {
        //         if (resp.status === "verified"){
        //             req.body.phone= resp.recipient;
        //             next();
        //         }
        //         else{
        //             resError.status = 400; resError.message = 'failed phone verification'; resError.code = 17;
        //             resError.path = 'gatewayAPI, GB, sendSMS'; resError.err = err;
        //             next(resError);
        //         }
        //     }
        // });
         req.body.phone = "213550197395";
         next();
    },
};
