let ofertas =  require('../data/datosOfertas')
let destinos = require('../data/datosDestinos')

let homeController = {

    show: (req, res) => {
        res.render('index', {ofertas, destinos})
    }
}



module.exports = homeController;