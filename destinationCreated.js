const db = require("./src/database/models");
const destinationController = require('./src/controller/destinationController');

const run = async () => {
    
    const dest1 = await destinationController.create({
       
        destination: "Mar del Plata",
       
    });
    const dest2 = await destinationController.create({
       
        destination: "Pinamar",
       
    });
    const dest3 = await destinationController.create({
       
        destination: "Villa Gesell",
       
    });
    const dest4 = await destinationController.create({
       
        destination: "Mar de Ajo",
       
    });

};

// db.sequelize.sync();-sincroniza la conección
db.sequelize.sync({ force: false}).
then(() => {

    console.log('entre a run crear detination');
    run();
});