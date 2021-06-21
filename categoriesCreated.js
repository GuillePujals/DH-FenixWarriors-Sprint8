const db = require("./src/database/models");
const categoriesController = require('./src/controller/categorierController');

const run = async () => {
    for (let i = 1; i <= 5; i++){
    const cat = await categoriesController.create({
       
        category: i + " Estrellas",
       
    });
    console.log("Creo Category " + i);
}
};

// db.sequelize.sync();-sincroniza la conección
db.sequelize.sync({ force: false}).
then(() => {

    console.log('entre a run crear category');
    run();
});