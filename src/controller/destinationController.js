const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult} = require('express-validator');
    

let destinationController = {

    list: async (req, res) => {
        let destinos = await db.Destination.findAll()
        //res.send(destinos)
        return res.render ('destinations/destinations', {destinos})
    },
    
    new: (req, res) => {
        res.render('destinations/newDestination')
    },


    create: async (req, res) => {
    const destinationValidate = validationResult (req);
    if (destinationValidate.errors.length > 0 ){
        return res.render ('destinations/newDestination',{
        errors: destinationValidate.mapped(),
        oldData: req.body,
    
});
}
     await db.Destination.create({
        destination: req.body.destination,
    })
    return res.redirect ('/destinations')
},

    delete: async(req, res) => {
        let exist = await db.Property.findOne({
            where: {destination_id:req.params.id}
        
        })
        if (exist){
            let destinos = await db.Destination.findAll()
            return res.render( "destinations/destinations", {destinos,
                errors: {
                    destination: {
                        msg: "El destino tiene Propiedades asignadas"
                    }
        }})} else {
        await  db.Destination.destroy({
            where: {id:req.params.id}
        })
        return res.redirect ('/destinations');
    }}
}

module.exports = destinationController;