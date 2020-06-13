const express = require('express');
const router = express.Router();
const options = require('../Controllers/options');
const platformLanguages = require('../Controllers/platformLanguage');



router.post('/bedSize', options.createBedSize);
router.put('/bedSize/addLanguage/:ref', options.addLanguageBedSize, options.addTranslation);
router.get('/:language/bedSize', options.getAllBedSize);

router.post('/breakfastOption', options.createBreakfastOption);
router.put('/breakfastOption/addLanguage/:ref', options.addLanguageBreakfastOption, options.addTranslation);
router.get('/:language/breakfastOption', options.getAllBreakfastOptions);

router.post('/extraBedFor', options.createExtraBedFor);
router.put('/extraBedFor/addLanguage/:ref', options.addLanguageExtraBedFor, options.addTranslation);
router.get('/:language/extraBedFor', options.getAllExtraBedsFor);

router.post('/otherEquipment', options.createOtherEquipment);
router.put('/otherEquipment/addLanguage/:ref', options.addLanguageOtherEquipment, options.addTranslation);
router.get('/:language/otherEquipment', options.getAllOtherEquipment);

router.post('/parkingOption', options.createParkingOption);
router.put('/parkingOption/addLanguage/:ref', options.addLanguageParkingOption, options.addTranslation);
router.get('/:language/parkingOption', options.getAllParkingOptions);

router.post('/paymentTime', options.createPaymentTime);
router.put('/paymentTime/addLanguage/:ref', options.addLanguagePaymentTime, options.addTranslation);
router.get('/:language/paymentTime', options.getAllPaymentTimes);

router.post('/roomCustomName', options.createRoomCustomName);
router.put('/roomCustomName/addLanguage/:ref', options.addLanguageRoomCustomName, options.addTranslation);
router.get('/:language/roomCustomName', options.getAllRoomCustomNames);

router.post('/roomName', options.createRoomName);
router.put('/roomName/addLanguage/:ref', options.addLanguageRoomName, options.addTranslation);
router.get('/:language/roomName', options.getAllRoomNames);

router.post('/roomType', options.createRoomType);
router.put('/roomType/addLanguage/:ref', options.addLanguageRoomType, options.addTranslation);
router.get('/:language/roomType', options.getAllRoomTypes);

router.post('/service', options.createService);
router.put('/service/addLanguage/:ref', options.addLanguageService, options.addTranslation);
router.get('/:language/service', options.getAllServices);

router.post('/speakingLanguage', options.createSpeakingLanguage);
router.put('/speakingLanguage/addLanguage/:ref', options.addLanguageSpeakingLanguage, options.addTranslation);
router.get('/:language/speakingLanguage', options.getAllSpeakingLanguages);

router.post('/creditCard', options.createCreditCard);
router.get('/creditCard', options.getAllCreditCards);

router.post('/initiate', options.initiate);





module.exports = router;
