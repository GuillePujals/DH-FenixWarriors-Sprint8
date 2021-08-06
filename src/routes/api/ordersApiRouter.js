const express = require('express');
const router = express.Router();
const ordersApiControler = require('../../controller/api/ordersApiController');

router.get('/total', ordersApiControler.total);
router.get('/', ordersApiControler.list);

module.exports = router;