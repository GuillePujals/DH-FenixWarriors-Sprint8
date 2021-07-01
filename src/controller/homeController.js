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

        
        let destinoId =  await destino.id
        

        let casas = await Property.findAll({
            where: {
                destination_id: destinoId
            }
        });

    
    

        //console.log(destino);
        //console.log(destinoId);
        //console.log(req.body.donde);
        res.render ('products/listProducts', {casas, destino});
        
        //console.log(casas[0]);
        //console.log(casas[1]);
    }
}



module.exports = homeController;