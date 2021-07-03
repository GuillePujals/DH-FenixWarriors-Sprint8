const path = require('path');
const {body} = require ('express-validator');
const {Destination} = require('../database/models');


const validations = [
    body('destination')
        .custom(async (value, {req}) =>{
            let existe = await Destination.findOne ({
                where: {
                    destination : req.body.destination
                }
            })
            if(existe){
                throw new Error ('Este destino ya existe')
            } else{
                return true;
            }
            return true;
        }),
    
]
module.exports = validations;