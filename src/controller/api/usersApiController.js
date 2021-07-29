const {Category, Destination, Image, Property, User} = require('../../database/models');


const userApiControler ={
    list: async (req, res) => {
        
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
             detail: "http://localhost:3000/api/users/"+users[i].id

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
    }
}



module.exports = userApiControler;