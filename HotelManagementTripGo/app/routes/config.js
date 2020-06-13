const express = require('express');
const router = express.Router();
const configController = require('../Controllers/config');

router.post('/SERI', configController.sendConfigImmediately);

module.exports = router;
