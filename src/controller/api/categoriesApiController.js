const {Category} = require('../../database/models');

const categoriesApiController ={
    list: async (req, res) => {

        //Traigo la info de la base de datos
        try {let categories = await Category.findAll();

            //Genero la respuesta
            let respuesta = {
                    meta: {
                        status: 200,
                        count: categories.length,
                    },
                    categories: categories
                }
            
            res.json(respuesta);
        } catch(error) {res.send(error)};
} 
}
module.exports = categoriesApiController;
