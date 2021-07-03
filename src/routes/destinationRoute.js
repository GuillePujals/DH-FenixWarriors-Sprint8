const express = require('express');
const router = express.Router();
const destinationController = require('../controller/destinationController');
const destinationValidate = require('../middlewares/destinationsValidate');

router.get('/', destinationController.list);
router.get('/create', destinationController.new);
router.post('/',destinationValidate, destinationController.create);
router.delete('/delete/:id', destinationController.delete);

module.exports = router;