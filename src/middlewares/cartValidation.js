const path = require('path');
const {body} = require ('express-validator');
const {Order} = require('../database/models');


const validations = [
    body('check_out')
        .custom( (value, {req}) =>{
        
        if(check_in > check_out){
            throw new Error ('La fecha de Check_out no puede ser menor a la de Check_in')
        } else{
            return true;
        }
        return true;
    })
       
]
module.exports = validations;