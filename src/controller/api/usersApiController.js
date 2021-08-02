const {Category, Destination, Image, Property, User} = require('../../database/models');
const db = require('../../database/models');
const sequelize = db.sequelize;


const userApiControler ={
    list: async (req, res) => {
        
      try{   
          //Busco los usuarios
        let users = await User.findAll()
        let usuarios = []

        //Creo el objeto usuario requerido
       for (let i = 0; i < users.length; i++) {
         //console.log(users[i]);
         let usuario = {
             id: users[i].id,
             name: users[i].first_name + " " + users[i].last_name,
             email: users[i].mail, 
             detail: "http://"+ req.headers.host + "/api/users/" + users[i].id
         }
         usuarios.push(usuario)
        }

        //Respuesta
        let respuesta = {
            meta: {
                status: 200,
                count: users.length
            },
            users: usuarios
        }
        res.json(respuesta)
    } catch (error) {res.status (500).json ({
        status:  500,
        message: error});
    }

    },
    detail: (req, res) => {
        User.findByPk(req.params.id,{
            attributes: [
                'first_name',
                'last_name',
                'mail',
                'telephone',
                [sequelize.fn('concat',req.headers.host , '/img/users/', sequelize.col('avatar')), "URL"],
                'admin',
                'casa',
                'departamento',
                'hotel',
                'hosteria',
                'aparts'
            ]
        })
        .then(user => {
            let respuesta = {
                meta: {
                    status:200,
                    url: '/api/user/' + req.params.id
                },
                data: user
            }
            res.json(respuesta);
        })
        .catch((error) => {
            res.json({
                meta:{
                    status: 500,
                    message: error
                }
            })
        });
        // .catch((error) => res.send(error));
    }
}



module.exports = userApiControler;