const path = require('path');
const {body} = require ('express-validator');

const validations = [
    body('categ').notEmpty().withMessage('Definir la categoría de la propiedad'),
    body('n_people').notEmpty().withMessage('Agregar cantidad de personas').bail()
    .custom ((value, {req}) =>{
        let n_people = req.body.n_people
        if (n_people <= 0){
            throw new Error ('Debe ingresar una cantidad de peronas mayor a 0');
        }
        return true;
    }),
    body('price')
        .notEmpty().withMessage('Informar el precio').bail()
        .isNumeric().withMessage('Ingresar un valor númerico'),
    body('address').notEmpty().withMessage('Informar la ubicación'),
    body('foto').custom((value, {req}) =>{
        let file = req.file;
        let oldFoto = req.body.oldFoto;
        console.log(file);
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif'];
        
        if (!file && oldFoto == ""){
            throw new Error ('Debe subir una imagen');
        } else{
            if(file){
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                } 
            }
        }
        return true;
    }),
    body('destination').notEmpty().withMessage('Ingrese la ciudad'),
    
]

module.exports = validations;