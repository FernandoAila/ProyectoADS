'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Modules.belongsTo(models.Projects, {
        foreignKey: 'projectId'
      });
    }
  };
  Modules.init({
    nameModule: DataTypes.STRING,
    descriptionModule: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modules',
  });
  return Modules;
};