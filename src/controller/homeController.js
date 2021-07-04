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

        let casas = await Property.findAll({
            where: {
                destination_id: req.body.destination,
                activated: 1
            }, 
            include:['category', 'user', 'destination', 'image']
        });
        console.log(casas);
        return casas == "" ? res.render ('error404') : res.render ('products/listProductsFilter', {casas})
    },
    email: async (req, res) => {

        res.send("Gracias por tu contacto!")
    },
}



module.exports = homeController;