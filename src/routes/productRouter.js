const express = require('express');
const router = express.Router();
const productValidate = require('../middlewares/productValidate');

const controladorproduct = require('../controller/productController');



//2. 2. /products/create (GET) Formulario de creación de productos
router.get('/create', controladorproduct.create);
router.get('/', controladorproduct.list);
router.post('/', productValidate, controladorproduct.store);

module.exports = router;