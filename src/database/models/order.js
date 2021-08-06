'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Property, {
        as:"property",
        foreignKey:"property_id"
      });
      Order.belongsTo(models.User, {
        as:"user",
        foreignKey:"user_id"
      });
    }
  };
  Order.init({
    property_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    n_of_people: DataTypes.INTEGER,
    credit_card: DataTypes.STRING,
    expiry_date: DataTypes.DATE,
    comment: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};