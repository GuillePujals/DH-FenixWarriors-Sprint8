const db = require('../database/models');
const sequelize = db.sequelize;
const moment = require('moment');
const {validationResult} = require('express-validator');


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
    totalCost: async (idPoperty, days) => {
        let property = await db.Property.findByPk(idPoperty);
        let total = property.price  * days;
        return (total);
    },
    daysReserve: (from, to) =>{
        let l_from = moment(from);
        let l_to = moment(to);

        let days = l_to.diff(l_from, 'days');

        return days;
    },
    expirationDay: (mes, anio)=>{
        let expDay = new Date( anio +'/' + mes +'/'+ '01' );
        return expDay;
    },
    payProcess: async (req, res) => {
        // console.log("-------------------------")
        // console.log(req.params.id)
        // console.log(req.body);
        let user = req.session.userLogged;

        let days = cartController.daysReserve(req.body.fechaingreso, req.body.fechaegreso);
        let totalPrice = await cartController.totalCost(req.params.id, days);
        console.log("Precio total:" + totalPrice);

        let expDay = cartController.expirationDay(req.body.mesExpiracion, req.body.anioExpiracion);
        // console.log(expDay);
        const resulValidation = validationResult (req);
        if (resulValidation.errors.length > 0 ){
           let property = await db.Property.findByPk(req.params.id, 
                {
                    include:['image', 'destination', 'category']
                })
            let user = req.session.userLogged;
            return res.render ('products/productCart',{
            errors: resulValidation.mapped(),
            oldData: req.body,
            property, user
        
    });
} else{
        db.Order.create({
            property_id: req.params.id,
            user_id: user.id,
            check_in: req.body.fechaingreso,
            check_out: req.body.fechaegreso,
            n_of_people: parseInt(req.body.cantadultos) + parseInt(req.body.cantninos),
            credit_card: req.body.titularTarjeta,
            expiry_date: expDay
        })
        .then(order => {
            res.render('products/detailCart', {user});
        });
    }
}}

module.exports = cartController;