const db = require('../database/models');
const sequelize = db.sequelize;

const destinationController ={
    
    list: async (req, res) => {
        let destinos = await db.Destination.findAll()
        //res.send(destinos)
        return res.render ('destinations', {destinos})
    },
    
    new: (req, res) => {
        return res.render ('/destination')
    },


    create: (destination) => {
    return db.Destination.create({
        destination: destination.destination,
    })
},

}

module.exports = destinationController;