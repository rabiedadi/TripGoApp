const express = require('express');
const router = express.Router();
const room = require('../Controllers/room');
const auth = require('../Controllers/auth');
const validation = require('../validation/room');
const hotel = require('../Controllers/hotel');

router.post('/:realEstate_id',auth.verifyToken, validation.roomCreate, room.create, hotel.updateRoomTypeNumber, hotel.incrementCreationStep);

// router.get('/:language/BriefInfo',auth.verifyToken, globalFunctions.getLanguageId, room.getBriefInformation);
// router.put('/:id',auth.verifyToken, room.edit);
// router.delete('/:id',auth.verifyToken, room.delete);

module.exports = router;
