const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Category, Destination, Image, Property, Users} = require('../database/models');
const {	validationResult } = require('express-validator');

let productController = {
    list: (req, res) => {
        db.Property.findAll({
            include:['category', 'user']
        })
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
    create: async (req, res) => {
        let categories = await Category.findAll();
        let destination = await Destination.findAll();
        console.log(destination);
        return res.render('products/createProducts', {categories, destination}) 
    },
    store: async (req, res) => {
        const validations = validationResult(req);
        console.log(validations.mapped())
        if (validations.errors.length > 0) {
            let categories = await Category.findAll();
            let destination = await Destination.findAll();
            return res.render ('products/createProducts',{
                categories, 
                destination,
                errors: validations.mapped(),
                oldData: req.body,
            });
        }

        console.log(req.body);
        let newProperty = await Property.create({
            user_id: 1,
            destination_id: req.body.destination,
            category_id: req.body.categ,
            price: req.body.price,
            address: req.body.ubicacion
            });
        }
}


module.exports = productController;