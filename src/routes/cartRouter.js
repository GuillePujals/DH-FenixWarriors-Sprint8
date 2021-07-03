const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controller/cartController');


router.get('/:id', authMiddleware, cartController.detail);


module.exports = router;