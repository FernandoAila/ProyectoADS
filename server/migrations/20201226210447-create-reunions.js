'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reunions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Date: {
        type: Sequelize.DATEONLY
      },
      Hour: {
        type: Sequelize.INTEGER
      },
      Minute: {
        type: Sequelize.INTEGER
      },
      IdJefe: {
        type: Sequelize.INTEGER,
        foreignKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reunions');
  }
};