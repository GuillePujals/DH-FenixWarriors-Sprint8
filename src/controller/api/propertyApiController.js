const {Category, Destination, Image, Property, User} = require('../../database/models');
const db = require('../../database/models');
const sequelize = db.sequelize;


const propertyApiControler ={
    list: async (req, res) => {

        //Traigo la info de la base de datos
        try{ let properties = await Property.findAll(
                {include:['category', 'user', 'destination', 'image']}
                )
            let categories = await Category.findAll({
                    attributes: {
                        include: [
                            [
                                sequelize.literal(`(
                                    select count(*) 
                                    from properties as p 
                                    where p.category_id = category.id
                                )`), 'cnt'
                            ]
                        ],
                        exclude: [
                            'createdAt',
                            'updatedAt',
                            'id'
                        ]
                    }
                })


            //construyo el objeto literal con la url por propiedad
            let propertiesUrl = [];
            function AgregarUrl (id, user, description, images, category, destination, url) {
                this.id= id,
                this.user = user,
                this.description = description,
                this.images = images,
                this.category = category,
                this.destination = destination,
                this.url = url
            }
            for (let i = 0; i < properties.length; i++) {
                let propertyUrl = new AgregarUrl(
                    properties[i].id,
                    properties[i].user,
                    properties[i].description,
                    properties[i].image,
                    properties[i].category.category,
                    properties[i].destination.destination,
                    "http://" +req.headers.host + "/api/properties/"+ properties[i].id)  

                propertiesUrl.push(propertyUrl);
                }
            
            //Genero la respuesta
            let respuesta = {
                    meta: {
                        status: 200,
                        count: properties.length,
                        countByCategory: Object.assign({},categories)
                    },
                    properties: propertiesUrl,
                }
            
            res.json(respuesta);
        } catch (error) {res.status (500).json ({
            status:  500,
            message: error});
        }
        },
    detail: (req, res) => {
        Property.findByPk(req.params.id,{
            // attributes: ['id', 'address','description','n_of_people', 'price', 'wifi', 'pool', 'parking', 'barbecue'],
            attributes: { exclude: ['createdAt', 'updatedAt', 'category_id', 'user_id', 'destination_id'] },
            // include: ['category', 'destination', 'image', 'user']
            include: [
                { model: Category, as: 'category', attributes: ['category'] },
                { model: Destination, as: 'destination', attributes: ['destination'] },
                // { model: Image, as: 'image', attributes: [[sequelize.fn('concat',`https://${process.env.HOST}/img/products/`, sequelize.col('image_name')), "URL"] ]},
                { model: Image, as: 'image', attributes: [[sequelize.fn('concat','http://', req.headers.host , '/img/products/', sequelize.col('image_name')), "URL"] ]},
                { model: User, as: 'user', attributes: ['first_name', 'last_name', 'mail', 'telephone'] }
            ]
        })
        .then(property => { 
            let respuesta = {
                meta: {
                    status:200,
                    url: '/api/properties/' + req.params.id
                },
                data: property
            }
            res.json(respuesta);
        })
        .catch(error => {
            res.json({
                meta:{
                    status: 500,
                    message: error
                }
            })
        });
    }

}

module.exports = propertyApiControler;
