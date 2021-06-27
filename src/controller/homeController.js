let ofertas =  require('../data/datosOfertas')
let destinos = require('../data/datosDestinos')
const {Category, Destination, Image, Property, Users} = require('../database/models');

let homeController = {

    show: (req, res) => {
        res.render('index', {ofertas, destinos, Users, Destination})
    }
}



module.exports = homeController;