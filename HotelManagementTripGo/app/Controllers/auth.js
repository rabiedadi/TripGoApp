const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let resError = {};

module.exports = {

    verifyToken: function (req, res, next) {
        console.log(req.headers['authorization'])
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if(!token){
            resError.status = 400; resError.message = 'token is required'; resError.code = 4;
            resError.path = 'AuthAPI, user, verifyAccessToken, token dont exist';
            next(resError);
        } else {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, decoded) {
                if (err){
                    resError.status = 401; resError.message = 'Invalid Token'; resError.code = 3;
                    resError.path = 'AuthAPI, auth, verifyAccessToken, token verification failed'; resError.err = err;
                    next(resError)
                }
                else{
                    req.user_id = mongoose.Types.ObjectId(decoded.user_id);
                    req.token = token;
                    next();
                }
            });
        }
    }
};
