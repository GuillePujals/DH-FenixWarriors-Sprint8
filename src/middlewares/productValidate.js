const path = require('path');
const {body} = require ('express-validator');
const { localsName } = require('ejs');
const { log } = require('console');

const validations = [
    body('nombre').notEmpty().withMessage('Agregar nombre'),
    body('descrip').notEmpty().withMessage('Incluir descripción de la casa'),
    body('categ').notEmpty().withMessage('Definir la categoría de la casa'),
    body('habit')
        .notEmpty().withMessage('Agregar cantidad de habitaciones').bail()
        .custom ((value, {req}) =>{
            let habit = req.body.habit
            if (habit <= 0){
                throw new Error ('Debe ingresar una cantidad de habtaciones mayor a 0');
            }
            return true;
        }),
    body('price')
        .notEmpty().withMessage('Informar el precio').bail()
        .isNumeric().withMessage('Ingresar un valor númerico'),
    body('ubicacion').notEmpty().withMessage('Informar la ubicación'),
    body('ciudad').notEmpty().withMessage('Informar la ciudad'),
    body('condiciones').notEmpty().withMessage('Informar las condiciones'),
    body('servicios').notEmpty().withMessage('Informar los servicios que ofrece la casa'),
    (req, res, next) => {
        console.log('Req.body:');
        console.log(req.body);
        next();
    },
    body('image').custom((value, {req}) =>{
        let file = req.file;
        let oldImage = req.body.oldImage;
        
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif'];
        
        if (!file && oldImage == ""){

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
    
]
module.exports = validations;