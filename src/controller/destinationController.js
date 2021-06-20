const db = require('../database/models');
const sequelize = db.sequelize;

const destinationController ={

create: (destination) => {
    return db.Destination.create({
        destination: destination.destination,
    })
},

}

module.exports = destinationController;