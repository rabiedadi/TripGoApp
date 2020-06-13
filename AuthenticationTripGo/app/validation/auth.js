let resError = {};

module.exports = {
     login:function (req, res, next) {
         if (req.body.login && req.body.password){
             next();
         }else {
             resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
             resError.path = 'AuthAPI, auth(V), login';
             next(resError);
         }
     },

    signUp:function (req, res, next) {
        if (req.body.fullName && req.body.password && req.body.email){
            if (req.body.emailConfirmed || req.body.refreshTokens) {
                resError.status = 401; resError.message = 'unauthorized modification'; resError.code = 10;
                resError.path = 'AuthAPI, auth(V), signUp, unauthorized fields';
                next(resError);
            }else {
                next();
            }
        }else {
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'AuthAPI, auth(V), signUp, fields required';
            next(resError);
        }
    },

};
