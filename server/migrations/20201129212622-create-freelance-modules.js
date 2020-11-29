'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Freelance_Modules', {
      developerId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      moduleId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Freelance_Modules');
  }
};