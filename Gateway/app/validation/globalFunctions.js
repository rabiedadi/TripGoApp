let resError = {};

module.exports = {
    sendSMS: function(req, res, next){
        if (req.body.hasOwnProperty('phone')){
            next()
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'gatewayAPI, middleFunctions(V), sendSMS';
            next(resError);
        }
    },

    verifySMS: function(req, res, next){
        if (req.params.hasOwnProperty('id') && req.query.hasOwnProperty('token')){
            next()
        }else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'gatewayAPI, middleFunctions(V), verifySMS';
            next(resError);
        }
    },
};
