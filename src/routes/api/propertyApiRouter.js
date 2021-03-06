const express = require('express');
const router = express.Router();
const propertyApiControler = require('../../controller/api/propertyApiController');

router.get('/', propertyApiControler.list);
router.get('/:id', propertyApiControler.detail);



module.exports = router;