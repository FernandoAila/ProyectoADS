'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rols.init({
    rolsName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rols',
  });
  return rols;
  rols.associate = (models) => {
    rols.belongsToMany(models.users, {
      foreignKey: 'rolsId',
      through: 'users_rols',
      as: 'users'
    });
  };
};
