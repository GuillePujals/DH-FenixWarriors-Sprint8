const {Category, Destination, Image, Property, User} = require('../../database/models');

const propertyApiControler ={
    list: async (req, res) => {
        let properties = await Property.findAll(
            {include:['category', 'user', 'destination', 'image']}
            
        )
        let categories = await Category.findAll(
            {include: ['properties']}
        )
        let contByCategory = {
            estrellas1: categories[0].properties.length,
            estrellas2: categories[1].properties.length,
            estrellas3: categories[2].properties.length,
            estrellas4: categories[3].properties.length,
            estrellas5: categories[4].properties.length
    }
    
        let respuesta = {
                meta: {
                    status: 200,
                    count: properties.length,
                    countByCategory: contByCategory 
                },
                products: properties,
            }
            res.json(respuesta);
        },
    
    detail: (req, res) => {
        Property.findByPk(req.params.id,{
            include: ['category', 'destination', 'image']
        })
        .then(property => {
            let respuesta = {
                meta: {
                    status:200,
                    total: property.length,
                    url: '/api/propertie/:id'
                },
                data: property
            }

            res.json(respuesta);
        });
    }

}

module.exports = propertyApiControler;
