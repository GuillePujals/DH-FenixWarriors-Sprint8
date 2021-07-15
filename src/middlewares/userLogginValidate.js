const path = require('path');
const {body} = require ('express-validator');
const {User} = require('../database/models');

//


const validations = [
    
    body('email')
        .notEmpty().withMessage('Debes ingresar un e-mail')
        .isEmail().withMessage('Debes ingresar un E-mail válido')
        .custom(async (value, {req}) =>{
            let existe = await User.findOne ({
                where: {
                    mail : req.body.email
                }
            })
            if(!existe){
                throw new Error ('Este email no se encuentra registrado')
            } 
        }),
          

    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña')
       


]

module.exports = validations;