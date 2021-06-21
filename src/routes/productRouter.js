const express = require('express');
const router = express.Router();

const controladorproduct = require('../controller/productController');



//2. 2. /products/create (GET) Formulario de creación de productos
router.get('/create', controladorproduct.create);
router.get('/', controladorproduct.list);

module.exports = router;