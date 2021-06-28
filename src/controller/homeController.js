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

        let destino = await Destination.findOne(
            {where: {
                destination: req.body.donde
            }
            })

        
        let destinoId =  destino.id
        
        let propiedades = await Property.findAll({
            where: {
                destination_id: destinoId - 4
            }
        });

        //console.log(destino);
        //console.log(destinoId);
        //console.log(req.body.donde);
        res.json(propiedades)

    

        
    }
}



module.exports = homeController;