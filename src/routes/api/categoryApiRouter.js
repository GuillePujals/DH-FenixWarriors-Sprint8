const express = require('express');
const router = express.Router();
const categoryApiControler = require('../../controller/api/categoriesApiController');

router.get('/', categoryApiControler.list);
router.get('/count/', categoryApiControler.count);

module.exports = router;