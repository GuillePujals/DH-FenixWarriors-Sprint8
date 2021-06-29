const express = require('express');
const router = express.Router();
const destinationController = require('../controller/destinationController');

router.get('/', destinationController.list);
//router.get('/', destinationController.new);
router.post('/', destinationController.create);

module.exports = router;