const db = require('../../database/models');

const Properties = db.Property;

const propertyApiControler ={
    list: (req, res) => {
        Properties.findAll(
            {include:['category', 'user', 'destination', 'image']}
            
        )
        .then (properties => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: properties.length,
                    url: 'api/properties'
                },
                data: properties
            }
            res.json(respuesta);
        })

        

    }


}

module.exports = propertyApiControler;
