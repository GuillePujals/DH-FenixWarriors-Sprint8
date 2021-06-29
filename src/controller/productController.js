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
        const validations = validationResult(req);
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

        let newProperty = await Property.create({
            user_id: req.session.userLogged.id,
            destination_id: req.body.destination,
            category_id: req.body.categ,
            price: req.body.price,
            address: req.body.address,
            n_of_people: req.body.n_people,
            wifi: req.body.wifi ? req.body.wifi : 0,
            pool: req.body.pool ? req.body.pool : 0,
            parking: req.body.parking ? req.body.parking : 0,
            barbecue: req.body.barbecue ? req.body.barbecue : 0
        });

        // // console.log(req.file);

        // let image = await Image.Create({
        //     property_id: newProperty.id,
        //     image_name: req.file ? req.file.filename :'logo-casa-alquiler.jpg'
        // });

        // console.log(req.files.foto);
        // console.log(req.files.foto[0].filename);
        // console.log('------------------------------');
        let imagesFiles = [];
        let nameImage = '';
        for (let i = 0; i < 3; i++) {
            if (i==0) nameImage = req.files.foto[0] ? req.files.foto[0].filename : 'logo-casa-alquiler.jpg';
            if (i==1) nameImage = req.files.foto2[0] ? req.files.foto2[0].filename : 'logo-casa-alquiler.jpg';
            if (i==2) nameImage = req.files.foto3[0] ? req.files.foto3[0].filename : 'logo-casa-alquiler.jpg';
            imagesFiles.push({
                property_id: newProperty.id,
                image_name: nameImage
            })
        }

        // imagesFiles.push(req.files.foto[0] ? req.files.foto[0].filename : 'logo-casa-alquiler.jpg');
        // imagesFiles.push(req.files.foto2[0] ? req.files.foto2[0].filename : 'logo-casa-alquiler.jpg');

        console.log(imagesFiles);
        console.log('------------------------------');
        let images = await Image.bulkCreate(imagesFiles);
        
        let user = req.session.userLogged;
        let casa = await Property.findByPk(newProperty.id, 
            {include:['image', 'destination']});
        res.render('products/detalleCrud', {casa, user});
   
    },     
    detalleCrud: async (req, res) => {
        let casa = await Property.findByPk(req.params.id, 
            {include:['image', 'destination', 'category']});

        let user = req.session.userLogged;
        
        if (casa) {
            res.render('products/detalleCrud', {casa, user});
        } else {
            res.render('error404');
        }
    },
    edit: async (req, res) => {
        let propertyId = req.params.id;
        let property = await Property.findByPk(propertyId, {include: ['image', 'destination']});
        let categories = await Category.findAll();
        let destination = await Destination.findAll();

        if ( property ) {
            res.render('products/editProperty', {property, categories, destination});
        }

    },
    update: async (req,res) => {
        let propertyId = req.params.id;

        console.log('--------------------------------------------');
        console.log(req.body);
        console.log('--------------------------------------------');

        let propertyUpdated = await Property.update({
            destination_id: req.body.destination,
            category_id: req.body.categ,
            price: req.body.price,
            address: req.body.address,
            n_of_people: req.body.n_people,
            wifi: req.body.wifi ? req.body.wifi : 0,
            pool: req.body.pool ? req.body.pool : 0,
            parking: req.body.parking ? req.body.parking : 0,
            barbecue: req.body.barbecue ? req.body.barbecue : 0
        },{
            where: {id: propertyId}
        });

        let user = req.session.userLogged;
        // console.log()
        let casa = await Property.findByPk(propertyId, 
            {include:['image', 'destination']});
        if (casa) {
          res.render('products/detalleCrud', {casa, user});  
        }
        
        
    }
    
}


module.exports = productController;