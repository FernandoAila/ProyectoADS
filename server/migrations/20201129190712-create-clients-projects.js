'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients_Projects', {
      clientId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      projectId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients_Projects');
  }
};