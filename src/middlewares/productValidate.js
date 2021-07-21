const path = require('path');
const {body} = require ('express-validator');

const validations = [
    body('categ').notEmpty().withMessage('Definir la categoría de la propiedad'),
    body('description').isLength({min: 20}).withMessage('La descripción debe tener por lo menos 20 caracteres'),
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
    body('foto1').custom(async(value, {req}) =>{
        let file = req.files.foto1;
        let file2 = req.files.foto2;
        let file3 = req.files.foto3;
        
        if (req.params.id) {
            let oldImages = await Image.findOne ({
                where : {Property_id : req.params.id}
            })
     
        console.log("-------------------");
        
        if (!file && !file2 && !file3 && !oldImages){
            throw new Error ('Debe subir por lo menos una imagen');
        }} else if (!file && !file2 && !file3){
            throw new Error ('Debe subir por lo menos una imagen');
        }
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif'];
        if(file){
            let fileExtension = path.extname(file [0].originalname);
            console.log("Extensi");
            console.log(fileExtension);
            console.log("-------------------");
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
            }
            return true;
    }),
    body('foto2').custom((value, {req}) =>{
        let file = req.files.foto2;
        let oldFoto2 = req.body.oldFoto2;
        //console.log("foto");
        //console.log(file);
        //console.log(file.originalname);
        //console.log("-------------------");
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif'];
        //console.log(file.originalname);
        if(file){
            let fileExtension = path.extname(file[0].originalname);
            //console.log("Extensi");
            //console.log(fileExtension);
            //console.log("-------------------");
           if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }
        return true;
    }),
    body('foto3').custom((value, {req}) =>{
        let file = req.files.foto3;
        let oldFoto3 = req.body.oldFoto3;
        //console.log("foto");
        //console.log(file);
        //console.log(file.originalname);
        //console.log("-------------------");
        let acceptedExtensions = ['.JPG', '.jpg', '.png', '.gif'];
        //console.log(file.originalname);
        if(file){
            let fileExtension = path.extname(file[0].originalname);
            //console.log("Extensi");
            //console.log(fileExtension);
            //console.log("-------------------");
           if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }
        return true;
    }),
    body('destination').notEmpty().withMessage('Ingrese la ciudad'),
    
]

module.exports = validations;