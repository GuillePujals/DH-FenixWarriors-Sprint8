const {Category, Destination, Image, Property, User} = require('../../database/models');
const db = require('../../database/models');
const sequelize = db.sequelize;

const categoriesApiController ={
    list: async (req, res) => {

        //Traigo la info de la base de datos
        try {
            let properties = await Property.findAll({include:['category']})
            let categories = await Category.findAll({include: ['properties']});

            //Genero la respuesta
            let countByCategory = [
                categories[0].properties.length,
                categories[1].properties.length,
                categories[2].properties.length,
                categories[3].properties.length,
                categories[4].properties.length
            ]

            let respuesta = {
                    meta: {
                        status: 200,
                        count: categories.length,
                        countPropr: properties.length
                    },
                    //countByCategory,
                    /*
                    estrellas1: countByCategory[0],
                    estrellas2: countByCategory[1],
                    estrellas3: countByCategory[2],
                    estrellas4: countByCategory[3],
                    estrellas5: countByCategory[4],
                    */
                    categories: categories,
                    
                    //properties: properties
                    
                }
            console.log(respuesta);
            res.json(respuesta);
        } catch (error) {res.json({
            status: 500,
            message: error
        })};
} 
}
module.exports = categoriesApiController;
