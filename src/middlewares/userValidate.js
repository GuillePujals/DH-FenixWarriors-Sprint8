const path = require('path');
const {body} = require ('express-validator');
const {User} = require('../database/models');

let regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;
                        

const validations = [
    body('first_name').notEmpty().withMessage('Debe ingresar su nombre')
          .isLength({min: 2}).withMessage('Ingresar un nombre de al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('Debe ingresar su apellido')
          .isLength({min: 2}).withMessage('Ingresar un apellido de al menos 2 caracteres'),
    body('mail').notEmpty().withMessage('Debe ingresar su E-mail')
        .isEmail().withMessage('Debe ingresar un E-mail válido')
        .custom(async (value, {req}) =>{
            let existe = await User.findOne ({
                where: {
                    mail : req.body.mail
                }
            })
            if(existe){
                throw new Error ('Este email ya está registrado')
            } else{
                return true;
            }
            //return true;
        }),
    body('telephone').notEmpty().withMessage('Incluir un número de celular')
        .isNumeric().withMessage('El teléfono debe ser numérico')
        .isLength({min: 10}).withMessage('El teléfono debe tener 10 caracteres')
        .isLength({max: 10}).withMessage('El teléfono debe tener 10 caracteres'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña')
         //.isLength({min:8}).withMessage('Elegir una pasword de 8 caracteres mínimo')
          .custom ( (value, {req}) => {
              console.log(regularExpression.test(req.body.password));
              if(!regularExpression.test(req.body.password)){
                  console.log('paso el if');
                throw new Error ('La contraseña debe contener caracteres especiales números y letras mayusculas y minúsculas')
              } else{
                return true;
            }
          }),
    body('avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif', '.jpeg'];
            if(file){
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                } else{
                    return true;
                }
            }
        return true;
    })
       
]
module.exports = validations;