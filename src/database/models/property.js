'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // belongsTo
        Property.belongsTo(models.Destination, {
          as:"destination",
          foreignKey:"destination_id"
        });
        Property.belongsTo(models.User, {
          as:"user",
          foreignKey:"user_id"
        });
        Property.belongsTo(models.Category, {
          as:"category",
          foreignKey:"category_id"
        });
        // Property.belongsTo(models.Destination);
        // Property.belongsTo(models.User);
        // Property.belongsTo(models.Category);
       
       //hasMany
       Property.hasMany(models.Image, {
        as: "image",
        foreignKey: 'property_id'
        });
       Property.hasMany(models.Order, {
        as: "order",
        foreignKey: 'property_id'
        });
    }
  };
  Property.init({
    user_id: DataTypes.INTEGER,
    destination_id: DataTypes.INTEGER,
    wifi: DataTypes.TINYINT,
    pool: DataTypes.TINYINT,
    parking: DataTypes.TINYINT,
    barbecue: DataTypes.TINYINT,
    price: DataTypes.DECIMAL,
    category_id: DataTypes.INTEGER,
    n_of_people: DataTypes.INTEGER,
    address: DataTypes.STRING,
    activated: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};