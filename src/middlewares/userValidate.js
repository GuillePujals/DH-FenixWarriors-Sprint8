const path = require('path');
const {body} = require ('express-validator');


const validations = [
    body('email').isEmail().withMessage('Debe ingresar un E-mail'),
    body('telefono').notEmpty().withMessage('Incluir un número de celular'),
    body('perfil_usr').notEmpty().withMessage('Definir un perfil de usuario'),
    body('password').isLength({min:7}).withMessage('Elegir una pasword de 7 caracteres mínimo'),
    body('avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif'];
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