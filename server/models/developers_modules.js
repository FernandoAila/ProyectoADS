'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developers_Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Developers_Modules.belongsTo(models.Users, {
        foreignKey: 'developerId'
      });
      Developers_Modules.belongsTo(models.Modules, {
        foreignKey: 'moduleId'
      });
    }
  };
  Developers_Modules.init({
    developerId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Developers_Modules',
  });
  return Developers_Modules;
};