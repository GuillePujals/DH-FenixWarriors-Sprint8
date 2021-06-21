const db = require('../database/models');
const sequelize = db.sequelize;

const categoriesController ={

create: (category) => {
    return db.Category.create({
        category: category.category,
    })
},

}

module.exports = categoriesController;