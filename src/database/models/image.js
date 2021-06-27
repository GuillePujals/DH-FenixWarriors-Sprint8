'use strict';
const {
  Model
} = require('sequelize');
console.log(Model.Image);

module.exports = (sequelize, DataTypes) => {
  
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Property,{
        as:"property",
        foreignKey:"property_id"
      });
    }
  };
  Image.init({
    property_id: DataTypes.INTEGER,
    image_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};