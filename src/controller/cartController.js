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
                    // console.log(property);
                    // console.log("-------------------------")
                    res.render('products/productCart', {property, user});
                } else {
                    res.render('error404');
                }
            });
    },
    totalCost: (idPoperty, days) => {
        db.Property.findByPk(idPoperty)
        .then(property => {
            // console.log(property.price + " dias "+ days);
            return (property.price * days);
        });
    },
    payProcess: (req, res) => {
        console.log("-------------------------")
        console.log(req.params.id)
        console.log(req.body);

        let totalCost = cartController.totalCost(req.params.id, 2);
        console.log("Total" + totalCost);

        // db.Order.create        
    }
}

module.exports = cartController;