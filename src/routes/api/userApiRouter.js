const express = require('express');
const router = express.Router();
const userApiController = require('../../controller/api/usersApiController');

router.get('/', userApiController.list);




module.exports = router;