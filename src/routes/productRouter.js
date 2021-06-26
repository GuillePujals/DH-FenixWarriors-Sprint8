const express = require('express');
const router = express.Router();
const productValidate = require('../middlewares/productValidate');
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

router.get('/create', controladorproduct.create);
router.get('/', controladorproduct.list);
router.post('/', upload.single('foto'), productValidate, controladorproduct.store);

module.exports = router;