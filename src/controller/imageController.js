const db = require('../database/models');
const sequelize = db.sequelize;
const {Image} = require('../database/models');

let imageController = {

    bulkCreate: async (propertyId, images) => {
        
        images.forEach(image => image.property_id = propertyId);

        console.log(images);
        console.log('------------------------------');

        return await db.Image.bulkCreate(images);

    },
    detail: async (propertyId) => {
        let imagenes = await Image.findAll(
            {
                where: {property_id: propertyId}
            },
            {
                order: [['id', 'ASC']]
            }
            );

        return imagenes;
    },
    update: async (imageId, imageName) => {
        let image = await Image.update({
            image_name: imageName
            
        },{
            where: {id: imageId}
        });

        return image;
    },
    bulkEdit: async (propertyId, images) => {
        let imagesCh=[];
        let numImg = 0;
        let imagesOld = await imageController.detail(propertyId);

        images.forEach(image => {
            numImg = image.image_num - 1;
            // console.log("num:" + numImg + " id:" + imagesOld[numImg].id + " name:" + image.image_name);
            imagesCh.push(imageController.update(imagesOld[numImg].id, image.image_name));
        });

        return imagesCh;
    }

}


module.exports = imageController;