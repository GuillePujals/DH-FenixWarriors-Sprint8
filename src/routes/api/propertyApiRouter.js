const express = require('express');
const router = express.Router();
const propertyApiControler = require('../../controller/api/propertyApiController');

router.get('/', propertyApiControler.list);
//router.get('/:id')



module.exports = router;