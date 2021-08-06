const { Order  } = require('../../database/models');

const ordersApiControler ={

    total:(req, res) => {

        // Order.count()
        Order.count()
        .then(count => {
            console.log('total de ventas:' +  count);
            res.json('Total: ' + count);
        })
        .catch(error => {
            res.json({
                meta:{
                    status: 500,
                    message: error
                }
            })
        });
    },
    list:(req, res) => {
        Order.findAll({
            //attributes: [`id`, `property_id`, `user_id`, `check_in`, `check_out`, `n_of_people`, `credit_card`, `expiry_date`, `comment` , `rating`],
            attributes: [`id`],
        })
        .then(orders => { 
            console.log(orders);
            let respuesta = {
                meta: {
                    status:200,
                    total: orders.length,
                    url: '/api/orders' 
                },
                data: orders
            }
            console.log(respuesta);
            res.json(respuesta);
        })        
        .catch(error => {
            res.json({
                meta:{
                    status: 500,
                    message: error
                }
            })
        });
    }
    
}


module.exports = ordersApiControler;

