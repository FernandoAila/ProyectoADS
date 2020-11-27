'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.associate = (models) => {
        Users.belongsToMany(models.rols, {
          foreignKey: 'userId', 
          through: 'users_groups',
          as: 'rols' 
        });
      };
    }
  };
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nombre:DataTypes.STRING,
    apellido:DataTypes.STRING,
    telefono:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
