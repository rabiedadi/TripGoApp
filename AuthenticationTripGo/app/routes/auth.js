const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const globalFunctionsController = require('../controllers/globalFunctions');
const authController = require('../controllers/auth');
const authValidation = require('../validation/auth');

router.post('/signUp', authValidation.signUp, globalFunctionsController.emailExist, userController.createUser, authController.generateTokens);
router.post('/login', authValidation.login, authController.authenticate, authController.generateTokens);
router.get('/token/refresh',authController.verifyRefreshToken, authController.tokenForUserExist, authController.generateAccessToken);
router.post('/logout',authController.verifyRefreshToken,authController.logout);
router.post('/logoutAll',authController.verifyAccessToken, authController.logoutAll);


module.exports = router;
