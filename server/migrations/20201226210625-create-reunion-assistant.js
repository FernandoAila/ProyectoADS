'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reunion_Assistants', {
      IdReu: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      IdUser: {
        type: Sequelize.INTEGER,
        foreignKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reunion_Assistants');
  }
};