let ofertas =  require('../data/datosOfertas')
//let destinos = require('../data/datosDestinos')
const db = require('../database/models')
const {Category, Destination, Image, Property, User} = require('../database/models');


let homeController = {

    show: async (req, res) => {
        let destinos = await Destination.findAll();
        let usuarios = await User.findAll();

        res.render('index', {ofertas, destinos, usuarios })
        
    }, 
    buscar: async (req, res) => {
        console.log(req.boby);
        let propiedades = await Property.findAll();

        let propFilt = await propiedades.filter(function (propiedad) {
            return propiedad.destination_id == req.body.donde
        })

        res.json(propFilt)
        
    }
}



module.exports = homeController;