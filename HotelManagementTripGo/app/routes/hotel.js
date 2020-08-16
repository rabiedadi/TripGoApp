const express = require('express');
const router = express.Router();
const hotel = require('../Controllers/hotel');
const room = require('../Controllers/room');
const auth = require('../Controllers/auth');
const offer = require('../Controllers/offer');
const platformLanguages = require('../Controllers/platformLanguage');
const hotelValidation = require('../validation/hotel');
const roomValidation = require('../validation/room');



router.post('/',auth.verifyToken, hotelValidation.addConfirmedPhone, hotel.addConfirmedPhone);
router.post('/:realEstate_id',auth.verifyToken, hotelValidation.basicInfo, hotel.hotelNameExist, hotel.basicInfo, hotel.incrementCreationStep);
router.post('/room/:realEstate_id',auth.verifyToken, roomValidation.roomCreate, room.create, hotel.incrementCreationStep);
router.put('/instSer/:realEstate_id',auth.verifyToken, hotelValidation.installationServices, hotel.insertHotelInfo, hotel.incrementCreationStep);
router.put('/equipment/:realEstate_id',auth.verifyToken, hotelValidation.equipment, hotel.insertHotelInfo, hotel.incrementCreationStep);
router.put('/images/:realEstate_id',auth.verifyToken, hotelValidation.images, hotel.insertHotelInfo, hotel.incrementCreationStep);
router.put('/policy/:realEstate_id',auth.verifyToken, hotelValidation.policy, hotel.insertHotelInfo, hotel.incrementCreationStep);
router.put('/payment/:realEstate_id',auth.verifyToken, hotelValidation.payment, hotel.insertHotelInfo, hotel.incrementCreationStep);

router.get('/:userGroup_id',auth.verifyToken, hotel.getAllForUser);
router.get('/profil/:id',auth.verifyToken, hotel.getHotelProfile);
router.get('/:language/search',auth.verifyToken, hotel.search, hotel.sendSearchRequest);

module.exports = router;
