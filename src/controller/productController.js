const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Category, Destination, Image, Property, Users} = require('../database/models');


let productController = {
create: async (req, res) => {
      let categories = await Category.findAll()
      //console.log(categories);
     return res.render('products/createProducts', {categories}) 
},

store: (req, res) => {
    res.send ("Estoy en Store");
}
}


module.exports = productController;