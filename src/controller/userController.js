const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");
const {Category, Destination, Image, Property, User} = require('../database/models');
const {
	validationResult
} = require('express-validator');

let usersController = {

    profile: async (req, res) => {
        console.log(req.session.userLogged);
        let user = await User.findByPk(req.session.userLogged.id)
        console.log(user);
        res.render ('users/profile', {user})
      },

    register: (req, res) => {
        return res.render ('users/register')
    },



    processRegister: async (req, res) => {
        const resulValidation = validationResult (req);
        console.log(req.body);
        if (resulValidation.errors.length > 0 ){
            return res.render ('users/register',{
            errors: resulValidation.mapped(),
            oldData: req.body,
        
    });
    }
   
        let user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mail: req.body.mail,
            telephone: req.body.telephone,
            avatar: req.file ? req.file.filename :'avatar.jpg',
            password: bcryptjs.hashSync(req.body.password, 10),
            admin: 0,
            casa: req.body.casa,
            departamento: req.body.depastamento,
            hotel: req.body.hotel,
            hosteria: req.body.hosteria,
            aparts: req.body.aparts

        })
        req.session.userLogged = user
        res.redirect ('/profile')
       
},

login: (req, res) => {
    console.log('ingreso login');
    res.render('users/login')
}, 

loginProcess: async (req, res) => {
        
        let userToLogin = await User.findOne({
            where: {
                mail : req.body.email
            }
        })
        console.log(userToLogin);
        if (userToLogin) {

            let isPasswordOk = bcryptjs.compareSync(req.body.contraseña, userToLogin.password)
            if (isPasswordOk) {
                
                req.session.userLogged = userToLogin
                if(req.body.recordatorio){
                    res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60})
                    console.log('hay cookie');
                    console.log(req.cookies.userEmail);
                }
                
                return res.redirect('/profile')
            }
            return res.render( "users/login", {
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas"
                    }
                }
            })
        }


         return res.render( "users/login", {
            errors: {
                email: {
                    msg: "No esta registrado este mail"
                }
            }
        })
    },
    edit: async (req, res)=> {
        let user = await User.findByPk(req.session.userLogged.id);
        res.render('users/editUser', {user})
    },
    update: async (req, res)=> {
        console.log("body.casa: " + req.body.casa);
        //let casa = req.body.casa == 1 ? 1 : null
        let user = await User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mail: req.body.mail,
            telephone: req.body.telephone,
            casa: req.body.casa == 1 ? 1 : null,
            departamento: req.body.departamento == 1 ? 1 : null,
            hotel: req.body.hotel == 1 ? 1 : null,
            hosteria: req.body.hosteria == 1 ? 1 : null,
            aparts: req.body.aparts == 1 ? 1 : null,
            avatar: req.file ? req.file.filename :req.session.userLogged.avatar

        },
        {
            where: {id: req.session.userLogged.id}
        })
        res.redirect('/profile')
    },
    logout: (req, res) => {
        console.log("eNTRE EN LOGAOUT");
        req.session.destroy();
        return res.redirect('/login');
    }



}



module.exports = usersController;