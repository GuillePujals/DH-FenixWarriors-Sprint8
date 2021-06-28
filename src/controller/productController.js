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
        // console.log(destination);
        return res.render('products/createProducts', {categories, destination}) 
    },
    store: async (req, res) => {
        let estatacionamiento = 0;
        let wifi = 0;
        let pileta = 0;
        let parrilla = 0;

        const validations = validationResult(req);
        // console.log(validations.mapped())
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

        // console.log(req.body);
        // console.log('------------------------------');
        // console.log(req.session.userLogged);
        // console.log('------------------------------');
        if (req.body.servicios){
            req.body.servicios.forEach(servicio => {
                if (servicio == 'estacionamiento') estatacionamiento = 1;
                if (servicio == 'parrilla') parrilla = 1;
                if (servicio == 'pileta') pileta = 1;
                if (servicio == 'wifi') wifi = 1;

            }); 
        }

        let newProperty = await Property.create({
            user_id: req.session.userLogged.id,
            destination_id: req.body.destination,
            category_id: req.body.categ,
            price: req.body.price,
            address: req.body.address,
            n_of_people: req.body.n_people,
            wifi: wifi,
            pool: pileta,
            parking: estatacionamiento,
            barbecue: parrilla

        });

        console.log(req.file);

        let image = await Image.create({
            property_id: newProperty.id,
            image_name: req.file ? req.file.filename :'logo-casa-alquiler.jpg'
        });
   
    },     
    detalleCrud: async (req, res) => {
        let casa = await Property.findByPk(req.params.id, 
            {include:['image', 'destination']});

        let user = req.session.userLogged;
        
        if (casa) {
            res.render('products/detalleCrud', {casa, user});
        } else {
            res.render('error404');
        }
    }
    
}


module.exports = productController;