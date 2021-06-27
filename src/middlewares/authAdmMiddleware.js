const { Property} = require('../database/models');

let authAdmMiddleware = {
    auth: async (req, res, next) => {
    let property = await Property.findByPk (req.params.id)
        
        if (!req.session.userLogged  || req.session.userLogged.id != property.user_id) {
        return res.redirect('/login');
        
    }
    next();
    }}
    
    module.exports = authAdmMiddleware.auth;