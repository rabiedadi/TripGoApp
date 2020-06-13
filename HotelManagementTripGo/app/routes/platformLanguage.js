const express = require('express');
const router = express.Router();
const platformLanguage = require('../Controllers/platformLanguage');


router.post('/', platformLanguage.createPlatformLanguage);
router.get('/', platformLanguage.getAllPlatformLanguage);

module.exports = router;
