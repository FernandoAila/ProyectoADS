'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requirements_Modules', {
      
      requirementId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      moduleId: {
        type: Sequelize.INTEGER,
        foreignKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Requirements_Modules');
  }
};