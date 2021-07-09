const path = require('path');
const {body} = require ('express-validator');
const {User} = require('../database/models');

const validations = [
    
    body('email')
        .custom( (value, {req}) =>{
            console.log(1);
        })
        .notEmpty().withMessage('Debe ingresar su E-mail')
        .isEmail().withMessage('Debe ingresar un E-mail válido'),
    body('contraseña').notEmpty().withMessage('Debe ingresar una contraseña')
]

module.exports = validations;