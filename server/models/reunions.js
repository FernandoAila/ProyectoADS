'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reunions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reunions.init({
    Date: DataTypes.DATE,
    IdJefe: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reunions',
  });
  return Reunions;
};