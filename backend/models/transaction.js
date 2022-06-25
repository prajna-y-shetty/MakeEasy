'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    service_provider_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    status:DataTypes.INTEGER,
    date: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    createdAt: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }

  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};