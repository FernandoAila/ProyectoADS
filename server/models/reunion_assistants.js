'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reunion_Assistants extends Model {
    static associate(models) {
      Reunion_Assistants.associate = (models) => {
        Reunion_Assistants.belongsTo(models.reunions, { 
          foreignKey: 'IdReu', 
          as: 'reunions' 
        });
        Reunion_Assistants.belongsTo(models.users, { 
          foreignKey: 'IdUser', 
          as: 'user' 
        });
      };
    }
  };
  Reunion_Assistants.init({
    IdReu: {type:DataTypes.INTEGER,primaryKey: true},
    IdUser: {type:DataTypes.INTEGER,primaryKey: true}
  }, {
    sequelize,
    modelName: 'Reunion_Assistants',
  });
  return Reunion_Assistants;
};