'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users_rols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_rols.associate = (models) => {
        users_rols.belongsTo(models.users, { 
          foreignKey: 'userId', 
          as: 'user' 
        });
        users_rols.belongsTo(models.rols, { 
          foreignKey: 'rolsId', 
          as: 'rols' 
        });
      };
    }
  };
  users_rols.init({
    userId: {type:DataTypes.INTEGER,primaryKey: true},
    rolsId: {type:DataTypes.INTEGER,primaryKey: true},
  }, {
    sequelize,
    modelName: 'users_rols',
  });
  return users_rols;
};