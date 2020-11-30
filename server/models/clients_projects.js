'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients_Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clients_Projects.belongsTo(models.Users, {
        foreignKey: 'clientId'
      });
      Clients_Projects.belongsTo(models.Projects, {
        foreignKey: 'projectId'
      });
    }
  };
  Clients_Projects.init({
    clientId: {type:DataTypes.INTEGER,primaryKey: true},
    projectId: {type:DataTypes.INTEGER,primaryKey: true}
  }, {
    sequelize,
    modelName: 'Clients_Projects',
    timestamps: false,
  });
  return Clients_Projects;
};