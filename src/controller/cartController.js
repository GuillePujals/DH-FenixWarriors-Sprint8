const db = require('../database/models');
const sequelize = db.sequelize;

let cartController = {

    detail: (req, res) => {
        db.Property.findByPk(req.params.id, 
            {
                include:['image', 'destination', 'category']
            })
            .then(property => {
                let user = req.session.userLogged;
                if (property) {
                    console.log(property);
                    console.log("-------------------------")
                    res.render('products/productCart', {property, user});
                } else {
                    res.render('error404');
                }
            });
    }
}

module.exports = cartController;