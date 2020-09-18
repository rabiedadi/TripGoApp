const express = require('express');
const router = express.Router();
const rec = require('../Controllers/reccommande');

router.get('/get', rec.recommend);
router.get('/send', rec.sendFile);

module.exports = router;
