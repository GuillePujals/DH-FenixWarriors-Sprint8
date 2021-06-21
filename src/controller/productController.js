const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Category, Destination, Image, Property, Users} = require('../database/models');


let productController = {
    list: (req, res) => {
        db.Property.findAll()
        .then(propertys => {
            console.log(propertys);
            let respuesta = {
                meta: {
                    status:200,
                    total: propertys.length
                },
                data: propertys
            }

            res.json(respuesta);
        });
    },
    create: (req, res) => {
        
        res.render('createProducts') 
    },

}


module.exports = productController;