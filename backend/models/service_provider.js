'use strict';
const {
  Model
} = require('sequelize');
const jwt = require("jsonwebtoken")
module.exports = (sequelize, DataTypes) => {
  class Service_Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service_Provider.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    roll: DataTypes.STRING,
    status:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service_Provider',
  });

  Service_Provider.prototype.getJWTToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
  return Service_Provider;
};