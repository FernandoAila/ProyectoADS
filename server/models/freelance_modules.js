'use strict';

// Modelo de postulacion de freelancers a los modulos

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Freelance_Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Freelance_Modules.belongsTo(models.Users, {
        foreignKey: 'developerId'
      });
      Freelance_Modules.belongsTo(models.Modules, {
        foreignKey: 'moduleId'
      });
    }
  };
  Freelance_Modules.init({
    developerId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Freelance_Modules',
  });
  return Freelance_Modules;
};