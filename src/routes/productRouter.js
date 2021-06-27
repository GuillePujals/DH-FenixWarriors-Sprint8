const express = require('express');
const router = express.Router();
const productValidate = require('../middlewares/productValidate');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

const controladorproduct = require('../controller/productController');

//Configuración de multer para archivo de producto
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/img/products'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/create',authMiddleware, controladorproduct.create);
//3. /products/:id (GET) Detalle de un producto particular
router.get('/:id', controladorproduct.detalleCrud);
router.get('/', controladorproduct.list);
router.post('/', upload.single('foto'), productValidate, controladorproduct.store);

module.exports = router;