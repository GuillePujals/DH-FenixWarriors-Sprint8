const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Category, Destination, Image, Property, Users} = require('../database/models');


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
    create: (req, res) => {
        res.render('createProducts') 
    },
    create: async (req, res) => {
        let categories = await Category.findAll();
        let destination = await Destination.findAll();
        console.log(destination);
        return res.render('products/createProducts', {categories, destination}) 
    },
    store: async (req, res) => {
        console.log(req.body);
        // let newProperty = await Property.create({
        //     user_id: 1,
        //     destination_id: req.body.destination,
        //     category_id: req.body.categ,
        //     price: req.body.price,
        //     address: req.body.ubicacion
        //     });
        }
}


module.exports = productController;