const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controller/cartController');
const cartValidation = require ('../middlewares/cartValidation');


router.get('/:id', authMiddleware, cartController.detail);


module.exports = router;