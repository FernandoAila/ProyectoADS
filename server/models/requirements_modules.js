'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requirements_Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Requirements_Modules.belongsTo(models.Requirements, {
        foreignKey: 'requirementId'
      });
      Requirements_Modules.belongsTo(models.Modules, {
        foreignKey: 'moduleId'
      });
    }
  };
  Requirements_Modules.init({
    requirementId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Requirements_Modules',
  });
  return Requirements_Modules;
};