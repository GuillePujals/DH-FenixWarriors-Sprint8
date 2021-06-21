const { Op } = require("sequelize");
const {Category, Destination, Image, Property, User} = require('../database/models');


let usersController = {

register: (req, res) => {
    return res.render ('users/register')
},



processRegister: async (req, res) => {
    console.log(req.body);
    let newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mail: req.body.mail,
        telephone: req.body.telephone,
        avatar: req.body.avatar,
        password:req.body.password,
        admin: 1
    })
    return res.send(newUser)
}
}



module.exports = usersController;