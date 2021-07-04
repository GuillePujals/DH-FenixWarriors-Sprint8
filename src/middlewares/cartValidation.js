const path = require('path');
const {body} = require ('express-validator');
const {Property} = require('../database/models');


const validations = [
    body('check_in').notEmpty().withMessage('Debe ingresar la fecha de ingreso'),
    body('check_out').notEmpty().withMessage('Debe ingresar la fecha de salida')
        .custom( (value, {req}) =>{
        
        if(req.body.fechaingreso > req.body.fechaegreso){
            throw new Error ('La fecha de Check_out no puede ser menor a la de Check_in')
        } else{
            return true;
        }
    }),
    body('n_of_people')
    .custom( async (value, {req}) =>{
               
        let property = await Property.findByPk (req.params.id);
        
        let n_of_people = await property.n_of_people
        if(req.body.cantadultos + req.body.cantninos > n_of_people){
            throw new Error ('La cantidad total de personas no puede ser mayor a: ' + n_of_people)
        } else{
            return true;
        }
    }),
    body('titularTarjeta').notEmpty().withMessage('Debe ingresar el nombre del titular de la tarjeta'),
]
module.exports = validations;