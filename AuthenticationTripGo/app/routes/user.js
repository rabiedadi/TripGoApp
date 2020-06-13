const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const path = require('path');
const multer = require('multer');
const validation = require('../validation/user');
let resError = {};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'app/public/');
    },
    filename: function (req, file, cb) {
        if (file){
            let customName = req.user_id + Date.now() +  path.extname(file.originalname);
            req.body.image = customName;
            cb(null, customName);
        }
    }
});

const upload = multer({storage:storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            resError.status = 422; resError.message = 'invalid file format'; resError.code = 13;
            resError.path = 'AuthAPI, user, upload image root';  resError.endPoint = req.originalUrl;
            return callback(resError);
        }
        callback(null, true)
    }
    ,limits:{fileSize:1024*1024}}); // 10MO size

router.get('/', authController.verifyAccessToken, userController.getUser);
router.put('/', authController.verifyAccessToken, validation.updateUser, upload.single('image'), userController.updateUser);
router.put('/password',authController.verifyAccessToken, validation.password, userController.verifyOldPassword, userController.updatePassword);
router.get('/sendVerificationEmail', authController.verifyAccessToken, userController.sendVerificationEmail);
router.post('/VerifyEmail', authController.verifyAccessToken, validation.verifyEmail, userController.verifyEmail);



module.exports = router;


