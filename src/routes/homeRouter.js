const express = require('express');
const router = express.Router();
const controladorHome = require('../controller/homeController');

router.get('/', controladorHome.show);
router.post('/', controladorHome.buscar);
router.post('/email', controladorHome.email);

module.exports = router;