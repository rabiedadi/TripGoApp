const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth');
const middleFunctionsController = require('../Controllers/middleFunctions');
const multer = require('multer');
const path = require('path');
let resError = {};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'app/public/');
    },
    filename: function (req, file, cb) {
        let customName = req.params.realEstate_id+'.zip';
        cb(null, customName);
    }
});

const upload = multer({storage:storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if(ext !== '.zip') {
            resError.status = 422; resError.message = 'invalid file format'; resError.code = 13;
            resError.path = 'gatewayAPI, realEstate, upload images';  resError.endPoint = req.originalUrl;
            return callback(resError);
        }
        callback(null, true)
    },limits:{fileSize:30*1024*1024}}); // 30MO size


router.post('/hotel/:realEstate_id', authController.verifyToken, middleFunctionsController.sendRequest);
router.post('/hotel/room/:realEstate_id', authController.verifyToken, middleFunctionsController.sendRequest);
router.put('/hotel/instSer/:realEstate_id', authController.verifyToken, middleFunctionsController.sendRequest);
router.put('/hotel/Equipment/:realEstate_id', authController.verifyToken, middleFunctionsController.sendRequest);
router.put('/hotel/images/:realEstate_id', authController.verifyToken, upload.single('images'), middleFunctionsControllecdr.sendImagesAdding);
router.put('/hotel/policy/:realEstate_id', authController.verifyToken, middleFunctionsController.sendRequest);
router.put('/hotel/payment/:realEstate_id', authController.verifyToken, middleFunctionsController.sendRequest);

router.get('/establishment', authController.verifyToken, middleFunctionsController.getRealEstatesForOwner);
router.get('/hotel/profil/:id', authController.verifyToken, middleFunctionsController.getHotelProfile);

module.exports = router;
