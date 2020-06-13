let resError = {};

module.exports = {
    updateUser:function (req, res, next) {
        if(req.body.emailConfirmed || req.body.password || req.body.refreshTokens) {
            resError.status = 401; resError.message = 'unauthorized modification'; resError.code = 10;
            resError.path = 'AuthAPI, user(V), updateUser, unauthorized fields';
            next(resError);
        }
        else    next();
    },

    password:function (req, res, next) {
        if(req.body.old_password && req.body.new_password) {
            if (req.body.old_password === req.body.new_password){
                resError.status = 400; resError.message = 'new password cannot be the old'; resError.code = 5;
                resError.path = 'AuthAPI, auth(V), password';
                next(resError);
            }else {
                next();
            }
        }
        else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'AuthAPI, auth(V), password';
            next(resError);
        }
    },

    verifyEmail:function (req, res, next) {
        if(req.body.token) {
            next();
        }
        else{
            resError.status = 400; resError.message = 'Data validation Error'; resError.code = 9;
            resError.path = 'AuthAPI, auth(V), password, verifyEmail';
            next(resError);
        }
    }


};
