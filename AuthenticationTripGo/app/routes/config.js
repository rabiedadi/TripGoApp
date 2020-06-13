const express = require('express');
const router = express.Router();
const configController = require('../controllers/config');

router.post('/SERI', configController.sendConfigImmediately);
router.post('/initiate', configController.initiate);

module.exports = router;
