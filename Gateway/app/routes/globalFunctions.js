const express = require('express');
const router = express.Router();
const globalFunctions = require('../Controllers/globalFunctions');
const authController = require('../Controllers/auth');
const MFController = require('../Controllers/middleFunctions');
const validation = require('../validation/globalFunctions');


router.post('/sendSMS/', authController.verifyToken, validation.sendSMS, globalFunctions.sendSMS);
router.get('/checkConfirmationCode/:id',authController.verifyToken, validation.verifySMS, globalFunctions.verifySMS , MFController.createUserIfNotExists, MFController.sendPhoneRequestConfirmed);

module.exports = router;
