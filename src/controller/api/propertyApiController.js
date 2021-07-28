const {Category, Destination, Image, Property, User} = require('../../database/models');

const propertyApiControler ={
    list: async (req, res) => {

        //Traigo la info de la base de datos
        let properties = await Property.findAll(
            {include:['category', 'user', 'destination', 'image']}
            )
        let categories = await Category.findAll(
            {include: ['properties']}
            )

        //Cuento las propiedades por cateoría
        let countByCategory = {
            estrellas1: categories[0].properties.length,
            estrellas2: categories[1].properties.length,
            estrellas3: categories[2].properties.length,
            estrellas4: categories[3].properties.length,
            estrellas5: categories[4].properties.length
        }

        //construyo el objeto literal con la url por propiedad
        let propertiesUrl = [];
        function AgregarUrl (id,user, description, images, category, url) {
            this.id= id,
            this.user = user,
            this.description = description,
            this.images = images,
            this.category = category,
            this.url = url
        }
        for (let i = 0; i < properties.length; i++) {
            let propertyUrl = new AgregarUrl(
                properties[i].id,
                properties[i].user,
                properties[i].description,
                properties[i].image,
                properties[i].category.category,
                "http://localhost:3000/api/properties/"+ properties[i].id)  

            propertiesUrl.push(propertyUrl);
            }
        
        //Genero la respuesta
        let respuesta = {
                meta: {
                    status: 200,
                    count: properties.length,
                    countByCategory: countByCategory 
                },
                properties: propertiesUrl,
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