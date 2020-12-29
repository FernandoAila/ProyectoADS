'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reunion_Assistant extends Model {
    static associate(models) {
      Reunion_Assistant.associate = (models) => {
        Reunion_Assistant.belongsTo(models.reunions, { 
          foreignKey: 'IdReu', 
          as: 'reunions' 
        });
        Reunion_Assistant.belongsTo(models.users, { 
          foreignKey: 'IdUser', 
          as: 'user' 
        });
      };
    }
  };
  Reunion_Assistant.init({
    IdReu: DataTypes.INTEGER,
    IdUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reunion_Assistant',
  });
  return Reunion_Assistant;
};