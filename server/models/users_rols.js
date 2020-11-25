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
      // define association here
    }
  };
  users_rols.init({
    userId: DataTypes.INTEGER,
    rolsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_rols',
  });
  return users_rols;
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
};
