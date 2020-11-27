'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requirements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Requirements.belongsTo(models.Projects, {
        foreignKey: 'projectId'
      });
    }
  };
  Requirements.init({
    nameRequirement: DataTypes.STRING,
    descriptionRequirement: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Requirements',
  });
  return Requirements;
};