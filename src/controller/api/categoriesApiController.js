const {Category, Property} = require('../../database/models');
const db = require('../../database/models');
const sequelize = db.sequelize;

const categoriesApiController ={
    list: async (req, res) => {
        
        //Traigo la info de la base de datos
       Category.findAll({})
            .then(categories =>{

                let respuesta = {
                    meta: {
                        status: 200,
                        count: categories.length
                    },
                    categories: categories
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
    },
    count: (req, res) => {
        Category.findAll({
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
        .then(cantidad =>{
            res.json(cantidad);
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
module.exports = categoriesApiController;
