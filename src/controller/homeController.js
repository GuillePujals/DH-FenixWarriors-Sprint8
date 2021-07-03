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

        /*
        let destino = await Destination.findOne(
            {where: {
                id: req.body.destination
            }
            })
        let destinoId =  await destino.id
        */
        

        let casas = await Property.findAll({
            where: {
                destination_id: req.body.destination,
                activated: 1
            }, 
            include:['category', 'user', 'destination', 'image']
        });

        res.render ('products/listProducts', {casas});
    }
}



module.exports = homeController;