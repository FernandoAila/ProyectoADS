'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requirements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameRequirement: {
        type: Sequelize.STRING
      },
      descriptionRequirement: {
        type: Sequelize.STRING
      },
      moduleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Modules', key: 'id' },
        foreignKey: true,
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Requirements');
  }
};