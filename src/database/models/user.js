'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //hasMany
      User.hasMany(models.Property,{
        as:"properties",
        foreignKey:'user_id'
      });

      User.hasMany(models.Order,{
        as:"orders",
        foreignKey:'user_id'
      });
     
     User.hasMany(models.Interest,{
        as:"interests",
        foreignKey:'user_id'
      });
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    mail: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
    addres: DataTypes.STRING,
    owner: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};