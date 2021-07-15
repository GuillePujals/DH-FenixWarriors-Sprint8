const express = require('express');
const router = express.Router();
const controladorUser = require('../controller/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userValidation = require ('../middlewares/userValidate');
const uploadFile = require('../middlewares/multerMiddleware');
const userLogginValidate = require ('../middlewares/userLogginValidate');



// Formulario de registro
router.get('/register', guestMiddleware, controladorUser.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), userValidation, controladorUser.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, controladorUser.login);

// Procesar de login
router.post('/login', userLogginValidate, controladorUser.loginProcess);

// Perfil del usuario
router.get('/profile', authMiddleware, controladorUser.profile);

//Logout
router.get('/logout', controladorUser.logout);

//edición Profile
router.get ('/editUser',authMiddleware, controladorUser.edit);
router.put ('/editUser', uploadFile.single('avatar'), controladorUser.update)


module.exports = router;